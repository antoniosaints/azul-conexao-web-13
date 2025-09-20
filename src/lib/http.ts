import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://sistemas.cas.net.br/censo/public/site/api/home/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default http;