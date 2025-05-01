import { getToken } from "./Token";

const { BACKEND_URL } = require("./Constants");


async function PostRequest(url, data = {}, authorized = true, files = null) {
    const headers = {};
    let body;

    if (files) {
        const formData = new FormData();
        
        // Add regular data fields
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        
        // Handle ALL file types consistently
        const filesArray = Array.isArray(files) ? files : [files];
        
        filesArray.forEach(file => {
            formData.append('file', file);
        });
        
        body = formData;
    } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(data);
    }

    // Rest of your code remains the same...
    if (authorized) {
        const token = await getToken();
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BACKEND_URL}${url}`, {
        method: "POST",
        headers: headers,
        body: body
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }

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
    try{
        let result = await PostRequest("/user/info");
        if (result.error) return false;
        return result.data ? true : false;
    }catch (error) {
        return false;
    }
}

export async function GetUserInfo() {
    let result = await PostRequest("/user/info");
    if (result.error) throw new Error(result.error);
    return result;
}

export async function AddProject(name, description) {
    const data = {
        name: name,
        description: description,
    };

    let result = await PostRequest("/projects/new", data);
    if (result.error) throw new Error(result.error);
    return result;
}

export async function DeleteProject(id) {
    const data = {
        id: id,
    };

    let result = await PostRequest("/projects/delete", data);
    if (result.error) throw new Error(result.error);
    return result;
}

export async function GetProjects() {
    let result = await PostRequest("/projects/list");
    if (result.error) throw new Error(result.error);
    return result;
}

export async function GetProject(id) {
    const data = {
        id: id,
    };

    let result = await PostRequest("/projects/get", data);
    if (result.error) throw new Error(result.error);
    return result;
}

export async function UploadFiles(id, files) {
    const data = {
        id: id,
    };

    let result = await PostRequest("/projects/addFile", data, true, files);
    //if (result.error) throw new Error(result.error);
    return result;
}

export async function RemoveFiles(id, fileId) {
    const data = {
        id: id,
        fileId: fileId,
    };

    let result = await PostRequest("/projects/removeFile", data);
    if (result.error) throw new Error(result.error);
    return result;
}