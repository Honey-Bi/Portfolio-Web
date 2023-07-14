import Header from "./Header";
import { useEffect, useState } from "react";

export default function Concept() {
    let txt = "";

    const [text, setText] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [typing, setTyping] = useState<boolean>(true);
    useEffect(() => {
        const interval:NodeJS.Timer  = setInterval(() => {
            if(typing) {
                if(count === txt.length-1) {
                    setTyping(false);
                }
                setText(text + txt[count]);
                setCount(count+1);
            } else {
                if(count === 1) {
                    setTyping(true);
                }
                setText(text.slice(0, -1)); 
                setCount(count - 1);
            }
        }, 150);
        return () => clearInterval(interval);
        // const r_interval:NodeJS.Timer  = setInterval(() => {
        //     setText(text.slice(0, count));
        //     setCount(count-1);
        // }, 100);
        // if (count === 0) {
        //     clearInterval(r_interval)
        // }
    });

    return (
        <div id="main">
            <Header/>
            <div id="down">
                <div className="container">
                    <h2>{text}</h2>
                </div>
            </div>
        </div>
    )
}