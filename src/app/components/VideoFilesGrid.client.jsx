'use client';

import { useState, useRef } from 'react';

export default function VideoFileGrid({ projectFiles = [], projectUid }) {
  const [files, setFiles] = useState(projectFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef();

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  // Function to validate files (only video files)
  const validateFiles = (fileList) => {
    const validFiles = [];
    const invalidFiles = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      validFiles.push(file);
    }
    
    if (invalidFiles.length > 0) {
      setErrorMessage(`Only video files are allowed. Invalid files: ${invalidFiles.join(', ')}`);
    }
    
    return validFiles;
  };

  // Handle file drop
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setErrorMessage('');
    
    const droppedFiles = e.dataTransfer.files;
    const validFiles = validateFiles(droppedFiles);
    
    if (validFiles.length > 0) {
      await uploadFiles(validFiles);
    }
  };

  // Handle file input change
  const handleFileInputChange = async (e) => {
    setErrorMessage('');
    const selectedFiles = e.target.files;
    const validFiles = validateFiles(selectedFiles);
    
    if (validFiles.length > 0) {
      await uploadFiles(validFiles);
    }
  };

  // Upload files to the server
  const uploadFiles = async (filesToUpload) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('uid', projectUid);
      
      for (let i = 0; i < filesToUpload.length; i++) {
        formData.append('files', filesToUpload[i]);
      }
      
      const response = await fetch('/api/projects/addfiles', {
        method: 'POST',
        body: formData,
      });

      console.log('Uploading files:', filesToUpload);
      
      const result = await response.json();
      
      if (response.ok) {

        //reload the page to show the new files
        window.location.reload();

      } else {
        setErrorMessage(`Error: ${result.error || 'Failed to upload files'}`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage('Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.value = ''; // Reset input to allow re-uploads
    fileInputRef.current.click();
  };

  function removeFile(fileId) {
    //make a post request to remove the file to /api/projects/removefile with id and fileid

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
        }else {
          //reload the page to show the new files
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
      <h3 className="text-lg font-bold mb-4">Project Video Files</h3>
      
      {/* Error message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      
      {/* Drag and drop area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg 
            className="w-12 h-12 text-gray-400 mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-500 mb-2">
            Drag and drop video files here
          </p>
          <span className="text-sm text-gray-400">- or -</span>
          <button
            type="button"
            onClick={handleButtonClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Browse Files'}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="border rounded-lg p-3 flex flex-col items-center bg-gray-50"
          >
            <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
              {/* Video thumbnail placeholder */}
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="w-full text-center truncate text-sm font-medium">
              {file.fileName}
            </div>
            <button
              type="button"
              onClick={() => removeFile(file.id)}
              className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}