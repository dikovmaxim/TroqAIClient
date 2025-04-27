import { getToken } from "./Token";

const { BACKEND_URL } = require("./Constants");




async function PostRequest(url, data={}, authorized = true) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (authorized) {
        const token = await getToken();
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${BACKEND_URL}${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function Login(email, password) {
    const data = {
        email: email,
        password: password,
    };

    let result = await PostRequest("/auth/login", data, false);
    return result;
}


export async function LoggedIn() {
    let result = await PostRequest("/user/info");
    if (result.error) return false;
    //if data is there, return true, else return false;
    return result.data ? true : false;
}

export async function GetUserInfo() {
    let result = await PostRequest("/user/info");
    if (result.error) throw new Error(result.error);
    return result;
}