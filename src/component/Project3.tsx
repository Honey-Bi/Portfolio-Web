import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import 'css/project3.css';
import posts from "json/post.json"

function Project3() {
    const baseRef = useRef<HTMLDivElement>(null);
    type size = {
        width: number,
        height: number
    }
    const [size, setSize] = useState<size>({width:0, height:0});

    useEffect(() => {
        handleResize();
    }, [baseRef]);
    
    
    const handleResize = () => { // 화면 resize 크기 저장
        if (baseRef.current) {
            let height = baseRef.current.clientHeight;
            let width = height * 1.618;

            if (width > baseRef.current.clientWidth) {
                width = baseRef.current.clientWidth;
                height = width / 1.618;
            }
            setSize({
                width: width,
                height: height
            });
            baseRef.current.style.setProperty('--w', `${width}px`);
            baseRef.current.style.setProperty('--h', `${height}px`);
        }
    }

    useEffect(() => { // 화면 resize 처리
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    const renderProejct = ():JSX.Element => {
        let result = [];
        let width = size.width;
        let height = size.height;
        let count = 1;
        for (var i of Object.values(posts)) {
            result.push(
                <div 
                    className="project-item"
                >
                    {i.title}
                </div>
            );
            count++;
        }
        return (
            <div 
                className="project-container"
            >
                {result}
            </div>
        );
    }

    return (
        <div id="main">
            <Header />
            <div id="down" className='down-height base' ref={baseRef}>
                {renderProejct()}
            </div>
            <div className="project-title">
                project
            </div>
        </div>
    )
}
export default Project3;