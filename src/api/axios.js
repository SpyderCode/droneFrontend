import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    //baseURL: "https://backend-ai24.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default instance;