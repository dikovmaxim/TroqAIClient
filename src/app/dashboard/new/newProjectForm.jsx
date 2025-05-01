"use client";

import { useState } from "react";


export default function NewProjectForm() { 

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const [projectNameError, setProjectNameError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/projects/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: projectName,
                description: projectDescription,
            }),
        });
        if (res.ok) {
            const response = await res.json();
            console.log("Data: ", JSON.stringify(response));
            window.location.href = `/dashboard/${response.data.data.id}`;
        } else {
            const response = await res.json();
            if (response.error) {
            setProjectNameError(response.error);
            } else {
            setProjectNameError("");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <textarea
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Create Project
            </button>
            {projectNameError && (
                <p className="text-red-500">{projectNameError}</p>
            )}
        </form>
    );

}