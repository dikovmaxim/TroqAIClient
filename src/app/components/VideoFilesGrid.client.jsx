'use client';

import { useState, useRef } from 'react';

export default function FileGrid({ projectFiles, projectUid }) {
  // YOUR ORIGINAL STATE
  const [files, setFiles] = useState(projectFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef();
  const dragCounter = useRef(0);

  // NEW STATE ADDITION (progress tracking)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  // YOUR ORIGINAL DRAG HANDLERS (UNCHANGED)
  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    if (e.dataTransfer.items?.length > 0) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) await uploadFiles(files);
  };

  // YOUR ORIGINAL FILE INPUT HANDLER (UNCHANGED)
  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) await uploadFiles(files);
  };

  // MODIFIED UPLOAD LOGIC (progress added)
  const uploadFiles = async (filesToUpload) => {
    setIsUploading(true);
    setUploadProgress({ current: 0, total: filesToUpload.length }); // NEW
    
    try {
      const formData = new FormData();
      formData.append('uid', projectUid);
      
      for (let i = 0; i < filesToUpload.length; i++) {
        formData.append('files', filesToUpload[i]);
        // Update progress for each file
        setUploadProgress(prev => ({ ...prev, current: i + 1 }));
      }

      const response = await fetch('/api/projects/addfiles', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (response.ok) {
        // YOUR ORIGINAL RELOAD LOGIC
        window.location.reload();
      } else {
        setErrorMessage(`Error: ${result.error || 'Failed to upload files'}`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage('Failed to upload files');
    } finally {
      setIsUploading(false);
      setUploadProgress({ current: 0, total: 0 }); // Reset progress
    }
  };

  // YOUR ORIGINAL REMOVE FILE LOGIC (UNCHANGED)
  function removeFile(fileId) {
    fetch('/api/projects/removefile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: projectUid,
        fileId: fileId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error || 'Failed to remove file');
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error removing file:', error);
        setErrorMessage('Failed to remove file');
      });
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
      </div>

      <div
        className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* NEW PROGRESS OVERLAY */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="mb-2 text-sm font-medium">
                Uploading {uploadProgress.current} of {uploadProgress.total} files
              </div>
              <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* YOUR ORIGINAL BUTTON (UNCHANGED) */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center 
                   hover:border-blue-500 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          disabled={isUploading}
        >
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* YOUR ORIGINAL FILE RENDERING (UNCHANGED) */}
        {files.map((file) => (
          <div
            key={file.id}
            className="relative group border rounded-lg aspect-square bg-gray-50 hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-2">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-center break-words line-clamp-2">
                {file.fileName}
              </span>
            </div>

            <button
              onClick={() => removeFile(file.id)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 
                       transition-opacity hover:bg-red-600 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}

        {/* YOUR ORIGINAL DRAG OVERLAY (UNCHANGED) */}
        {isDragging && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-dashed border-blue-500 
                        flex items-center justify-center flex-col">
            <svg className="w-12 h-12 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-blue-500 font-medium">Drop files to upload</p>
          </div>
        )}

        {/* YOUR ORIGINAL FILE INPUT (UNCHANGED) */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  );
}