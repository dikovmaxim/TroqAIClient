const { BACKEND_URL } = require("./Constants");
import { getToken } from "./TokenManager";



async function PostRequest(url, data, authorized = true) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (authorized) {
        const token = getToken();
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BACKEND_URL}${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}

