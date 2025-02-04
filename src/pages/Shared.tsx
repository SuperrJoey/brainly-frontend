import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";



interface SharedContent {
    title: string;
    link: string;
    type: string;
    userId: {
        _id: string;
        username: string;
    };
}


export function Shared() {
    const { shareId } = useParams();
    console.log("Share ID:", shareId);
    const [content, setContent] = useState<SharedContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null >(null);

    useEffect(() => {
        const fetchSharedContent = async() => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
                console.log("Shared content response: ", response.data);
                
                if(response.data.content && response.data.content.length > 0) {
                    setContent(response.data.content[0]);
                } else {
                    setError("No content found")
                }
            } catch (error) {
                setError("Failed to load shared content");
            } finally {
                setLoading(false);
            }
        };

        fetchSharedContent();
    }, [shareId]);


    if(loading) {
        return <div>
            Loading...
        </div>
    }

    if (error) {
        return <div>
            {error}
        </div>
    }

    const renderContent = () => {
        if(content?.type === "youtube") {
            let videoId = " ";
            try {
                 videoId = new URL(content.link).searchParams.get("v") ||
                                content.link.split("v=")[1]?.split("&")[0];

                if (!videoId && content.link.includes("youtu.be/")) {
                    videoId = content.link.split("youtu.be/")[1]?.split("?")[0];
                }

            } catch (error) {
                console.error("Invalid YouTube URL:", content.link)
            }

            return videoId ? (
                <div className="relative w-full mt-4 overflow-hidden rounded-lg">
                    <div className="aspect-auto">
                    <iframe 
                        src={`https://www.youtube.com/embed/${videoId}`} 
                        width="100%"
                        height="100%"    
                        allowFullScreen
                        className="rounded-lg"
                    />
                    </div>
                </div>
            ) : (
                <p className="text-red-500">Invalid YouTube link</p>
            );
        }

        return (
            <a 
            href={content?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
            >
                {content?.link}
            </a>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 flex justify-center">
                    {content?.title}
                </h1>

                <div className="mb-4 text-gray-600 flex justify-end">
                    <span className="">Shared by: {content?.userId?.username || "Unknown user"}</span>  
                </div>

                {renderContent()}

                <div className="mt-4">
                    <p className="text-gray-600">Type: {content?.type}</p>
                </div>
            </div>
        </div>
    )
}