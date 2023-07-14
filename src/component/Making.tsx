import Header from "./Header";

import '../css/making.css'
import { useEffect } from "react";

export default function Making() {
    const size:string[][] = [
        ['5rem', '6px'],
        ['4rem', '6px'],
        ['3rem', '5px'],
        ['2rem', '5px']
    ];

    useEffect(() => {
        const interval:NodeJS.Timer  = setInterval(() => {
            // createBubble();
        }, 5000*3);

        return () => clearInterval(interval);
    });

    const createBubble = () => {
        let randomAmount = Math.floor(Math.random() * (3 - 1 + 1) + 1);

        for(var i=0; i < randomAmount; i++) {
            let randomSize = Math.floor(Math.random() * (3 - 0 + 1) + 0);
            let randomX = Math.floor(Math.random() * (100 - 0 + 1) + 0);
            let randomY = Math.floor(Math.random() * (100 - 0 + 1) + 0);
        }
    };
    return(
        <div id="main">
            <Header/>
            <div id="down">
                <div className="container">
                    <div className="tank">
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}