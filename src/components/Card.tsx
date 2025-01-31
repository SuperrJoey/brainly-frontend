import DeleteIcon from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CardYTicon } from "../icons/cardYTicon";
import CardTwitterIcon from "../icons/cardTwitterIcon";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube"
    contentId: string;
}

export function Card({title, link, type, contentId} : CardProps) {
    const [showPopup, setShowPopup] = useState(false);

    const getYouTubeEmbedLink = (url: string) => {
        if (url.includes("watch?v=")) {
            return url.replace("watch?v=", "embed/");
        } else if (url.includes("youtu.be")) {
            return url.replace("youtu.be/", "www.youtube.com/embed/");
        }
        return url;
    };

    useEffect(() => {
        if(type === "twitter" && window.twttr) {
            window.twttr.widgets.load();
        }
    }, [type])

    const handleShareClick = async () => {
        try {
            console.log("sharing content with ID:", contentId);
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                contentId: contentId,
                share: true
            }, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }    
            });

            if(response.data.shareLink) {
                console.log("the link before copying: ", response.data.shareLink);
                const shareUrl = `http://localhost:5173${response.data.shareLink}`;
                navigator.clipboard.writeText(shareUrl);
                console.log("Share Link copied to clipboard:", shareUrl);
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 2000);
            }

        } catch (error) {
            console.error("Failed to share content:", error);
        }
    };

    return <div>
        <div className="p-4 bg-white rounded-md shadow-md
    outline-slate-200 max-w-72 border">

        <div className="flex justify-between">
            <div className="flex items-center text-sm">
                <div className="pr-2 text-gray-500">
                {type === "youtube" ? <CardYTicon/> : <CardTwitterIcon />}
                </div>
                {title}
            </div>
            <div className="flex items-center">
                <div 
                onClick={handleShareClick} 
                className="pr-1  text-gray-500 cursor-pointer">
                    <ShareIcon/>
                </div>
                <div className="text-gray-500">
                    <DeleteIcon/>
                </div>
            </div>
        </div>

        <div className="pt-2">
        {type ==="youtube" && (
        <iframe 
        className="w-full" 
        width="560" 
        height="315" 
        src={getYouTubeEmbedLink(link)}
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen>
        </iframe>
    )}

          {type === "twitter" && <blockquote className="twitter-tweet">
            <a href={link}></a>
            </blockquote>}
        </div>
        </div>

        {showPopup && (
            <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
                Link copied successfully!
            </div>
        )}
    </div>
}
//