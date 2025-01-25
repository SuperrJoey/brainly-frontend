import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found in local storage");
            setContents([]);
            return;
        }
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization" : token
            }
        })
            .then((response) => {
                console.log("API response:", response.data);
                setContents(response.data);

            })
            .catch((error) => {
                console.error("Failed to fetch contents", error.message);
                setContents([]);
            })
    }, [])

    return contents;
}
