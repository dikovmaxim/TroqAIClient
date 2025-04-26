"use client";

import { BACKEND_URL } from "@/utils/Constants";
import { useState, useEffect } from "react";

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const URL = BACKEND_URL + "/auth/login";

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                setError(error || "Login failed");
            } else {
                const { token } = await response.json();
                console.log("Token:", token);
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Login
            </button>
        </form>
    );
}