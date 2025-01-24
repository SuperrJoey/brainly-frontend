import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube"
}

export function Card({title, link, type} : CardProps) {
    return <div>
        <div className="p-4 bg-white rounded-md shadow-md
    outline-slate-200 max-w-72 border">

        <div className="flex justify-between">
            <div className="flex items-center text-sm">
                <div className="pr-2 text-gray-500">
                <ShareIcon/>
                </div>
                {title}
            </div>
            <div className="flex items-center">
                <div className="pr-1  text-gray-500">
                    <a href={link} target="_blank"></a>
                <ShareIcon/>
                </div>
                <div className="text-gray-500">
                <ShareIcon/>
                </div>
            </div>
        </div>

        <div className="pt-2">
        {type ==="youtube" && <iframe className="w-full" width="560" height="315" src={link.replace("watch?v=", "embed/")}
          title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {type === "twitter" && <blockquote className="twitter-tweet">
            <a href="https://twitter.com/superrjoey/status/1875173793624416360"></a>
            </blockquote>}
        </div>
        </div>
    </div>
}
//