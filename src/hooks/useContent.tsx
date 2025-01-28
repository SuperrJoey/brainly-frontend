import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

 interface Content {
    _id: string;
    title: string; // Matches the enum: 'images' | 'video' | 'article' | 'audio'
    link: string;
    type: 'twitter' | 'youtube';
    tags: string[]; // Assuming tags are an array of ObjectIds represented as strings
    userId: string; // ObjectId as a string
  }

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    function refresh() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found in local storage");
            setContents([]);
            return;
        }
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                Authorization : token
            },
        })
            .then((response) => {
                const data = response.data?.content;
                console.log("API response:", data);
    
                if(Array.isArray(data)) {
                    setContents(data);
                } else {
                    console.warn("Response data is not an array:", data);
                    setContents([]);
                }
    
            })
            .catch((error) => {
                console.error("Failed to fetch contents", error.message);
                setContents([]);
            })

    }

    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh()
        }, 10*1000)
    
        return () => {
            clearInterval(interval);
        }
    }, [])

    return { contents, refresh };
}
