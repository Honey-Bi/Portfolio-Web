import { useCallback, useEffect, useRef } from "react";
import style from 'css/notFound.module.css';
import { Link } from "react-router-dom";

export default function NotFound() {
    const isDark = localStorage.getItem('isDark')==="on";

    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    });

    const bubblesRef = useRef<HTMLDivElement>(null)

    const bubble = useCallback(():Element => {
        const bubble = document.createElement('div');
        bubble.classList.add(style.bubble);
        bubble.style.setProperty('--size', `${2+Math.random()*4}rem`);
        bubble.style.setProperty('--distance', `${6+Math.random()*4}rem`);
        bubble.style.setProperty('--position', `${-5+Math.random()*110}%`);
        bubble.style.setProperty('--delay', `${-1*(2+Math.random()*2)}s`);
        bubble.style.setProperty('--time', `${Math.floor((2+Math.random()*2)*1000)}ms`);
        return bubble;
    },[]);

    useEffect(() => {
        if (bubblesRef.current) {
            const width = Math.floor(document.body.clientWidth/30);
            for (var i = 0; i < width; i++) {
                const b = bubble();                
                bubblesRef.current.appendChild(b);
            }
        }
    }, [bubble, bubblesRef]);

    return(
        <div id={style.notFound} className={isDark?style.dark:""}>
            <div className={style.center}>
                <div className={style.title}>404</div>
                <div className={style.content}>
                    The page you are looking for might be removed or is temporally unavailable
                </div>
                <Link to={'/'} className={style.button}>
                    go back home
                </Link>
            </div>
            <div className={style.footer}>
                <div className={style.bubbles} ref={bubblesRef}></div>
            </div>
            <svg className={style.svg}>
                <defs>
                    <filter id="blob">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob"></feColorMatrix>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}