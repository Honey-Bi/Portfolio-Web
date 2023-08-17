import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import 'css/project2.css';
import posts from "json/post.json"
import Github from "./github";

const golden_ratio = 1.61803398875; // 황금비

function Project4() {
    const baseRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    type Size = {
        width: number,
        height: number,
        min:number,
        max:number
    }
    const [size, setSize] = useState<Size>({width:0, height:0, min:0, max:0})
    const [depth, setDepth] = useState<number>(0);
    
    useEffect(() => {
        handleResize();
    }, [baseRef]);

    const handleResize = () => { // 화면 resize 크기 저장
        if (baseRef.current) {
            let height = baseRef.current.clientHeight;
            let width = height * golden_ratio;
            if (baseRef.current.clientWidth <= 768) {
                width = height / golden_ratio;
                if (width > baseRef.current.clientWidth) {
                    width = baseRef.current.clientWidth;
                    height = width * golden_ratio;
                }
            } else if (width > baseRef.current.clientWidth) {
                width = baseRef.current.clientWidth;
                height = width / golden_ratio;
            }
            setSize({
                width: width,
                height: height,
                min: Math.min(width, height),
                max: Math.max(width, height)
            });
        }
    }

    useEffect(() => { // 화면 resize 핸들러
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    
    useEffect(() => { // 이동 핸들러
        if (viewRef.current) {
            const view = viewRef.current;
            const rotate = -90 * depth
            let style = `
                transform: 
                    rotate(${rotate}deg) 
                `;
            view.setAttribute('style', style)
        }
    }, [depth, size.min]);

    function select(e:React.MouseEvent, deep:number) {
        if (deep === depth) return;
        setDepth(deep);
    }

    type flexDirection = "column" | "row-reverse" | "column-reverse" | "row";

    const move = useCallback((e:React.MouseEvent, pName:string, bgColor:string, index:number) => { // 페이지 이동 함수
        const main:Element = document.getElementById('main') as Element;
        const style = `
            top: -${document.body.clientHeight - e.pageY}px;
            left: -${document.body.clientWidth - e.pageX}px;
            background-color: ${bgColor}
        `;
        const add_element = document.createElement('div');
        add_element.classList.add('project-enter');
        add_element.setAttribute('style', style);
        main.after(add_element)
        navigate(`./post/${pName}`,{
            state: { color: bgColor, index: index},
        });
    }, [navigate])

    function renderProject(min:number, max:number, count:number): JSX.Element {
        if (count === posts.length+1) {
            return(<></>);
        }
        const index = count - 1;
        const data = posts[index];
        let width = max-min;
        let height = min;
        let direction: flexDirection[] = ["row-reverse", "column-reverse", "row", "column"]
        let active = ['active2', 'active3','active4','active1'];
        if (index % 2 === 0) {
            height = width;
            width = min;
        }
        width = Number(width.toFixed(0));
        height = Number(height.toFixed(0));
        
        let rotate = 90;
        let scale = 1/golden_ratio;
        for (let i = 0; i < index; i++) {
            scale /= golden_ratio;
            rotate += 90
        }

        let links = [];
        if(data.github !== null) {
            links.push(
                <a href={data.github} target="_blank" rel="noreferrer">
                    <Github color="#fff" size="24"/>
                    github
                </a>
            )
        }
        if (data.demo !== null) {
            links.push(
                <a href={data.demo} target="_blank" rel="noreferrer">
                    Demo
                </a>
            )
        }

        return(
            <>
            <div className={`project-item ${count < depth?'active':''}`}
            onClick={e => select(e, count)}
            style={{width:min, height:min}}>
                <div className="project-scale" 
                style={{width: size.min, height: size.min,
                        transform: `scale(${scale})`,
                    }}>
                    <div className="project-content"
                    style={{
                        backgroundColor: data.color,
                        transform: `rotate(${rotate}deg)`
                    }}>
                        <div className="project-title">{data.title}</div>
                        <span className="project-date">{data.date}</span>
                        <span className="project-author"> - {data.author}</span>
                        <div className="project-about" onClick={e => move(e, data.title, data.color, index)}>
                            <div className="back"></div>
                            <span>about</span>
                        </div>
                        <div className="project-link">
                            {links}
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className={`project-list ${count < depth?active[index%4]:''}`}
                style={{
                    width: width, height:height, 
                    flexDirection: direction[index % 4]}
                }>
                {renderProject(max-min, min, count + 1)}
            </div>
            </>
        )
    }
    function handleKeyDown(e:React.KeyboardEvent) {
        switch (e.key) {
            case "ArrowRight": case "ArrowDown":
                if (depth < posts.length) setDepth(prev => prev + 1);
                break;
            case "ArrowLeft": case "ArrowUp":
                if (depth > 0) setDepth(prev => prev - 1);
                break;
        }
    }
    function moveWheel(e: any) { // 마우스 휠 핸들러
        if (e.deltaY > 0 && depth < posts.length) { //휠 아래로
            setDepth(prev => prev + 1);
        } else if (e.deltaY < 0 && depth > 0) { // 휠 위로
            setDepth(prev => prev - 1);
        }
    }

    function goBack() {
        if (depth === 0 ) return
        setDepth(prev => prev - 1);
    }
    return(
    <div id="main"
        tabIndex={0}
        onKeyDown={e =>handleKeyDown(e)}>
        <Header />
        <div id="down" className='down-height project' 
            ref={baseRef} 
            onWheel={moveWheel}>
            <div className="back-button">
                <svg 
                    onClick={goBack}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 72.00 72.00" 
                    enableBackground="new 0 0 72 72" 
                    strokeWidth="0.00072" 
                    transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.584"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <g> 
                                <path d="M48.252,69.253c-2.271,0-4.405-0.884-6.011-2.489L17.736,42.258c-1.646-1.645-2.546-3.921-2.479-6.255 c-0.068-2.337,0.833-4.614,2.479-6.261L42.242,5.236c1.605-1.605,3.739-2.489,6.01-2.489c2.271,0,4.405,0.884,6.01,2.489 c3.314,3.314,3.314,8.707,0,12.021L35.519,36l18.743,18.742c3.314,3.314,3.314,8.707,0,12.021 C52.656,68.369,50.522,69.253,48.252,69.253z M48.252,6.747c-1.202,0-2.332,0.468-3.182,1.317L21.038,32.57 c-0.891,0.893-0.833,2.084-0.833,3.355c0,0.051,0,0.101,0,0.151c0,1.271-0.058,2.461,0.833,3.353l24.269,24.506 c0.85,0.85,1.862,1.317,3.063,1.317c1.203,0,2.273-0.468,3.123-1.317c1.755-1.755,1.725-4.61-0.03-6.365L31.292,37.414 c-0.781-0.781-0.788-2.047-0.007-2.828L51.438,14.43c1.754-1.755,1.753-4.61-0.001-6.365C50.587,7.215,49.454,6.747,48.252,6.747z"></path>
                            </g>
                        </g>
                    </svg>
            </div>
            <div className="project-container" style={{width: size.width,height:size.height}}>
                <div className="project-view" ref={viewRef}>
                    <div className={`project-item disabled ${0 < depth?'active':''}`} 
                        style={{width: size.min, height:size.min}}
                        onClick={e => select(e, 0)}>
                            <div className="project-scale"
                                style={{width: size.min, height: size.min}}>
                                <div className="project-content">
                                    <div className="project-title">Project</div>
                                    <div className="project-guide">
                                        <div className="mouse-guide">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"viewBox="0 0 16 16"> 
                                                <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0v6zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z"/> 
                                            </svg>
                                        </div>
                                        <span>or</span>
                                        <div className="key-guide">
                                            <div className="row">
                                                <div className="key">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="key">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                                </div>
                                                <div className="key">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                                </div>
                                                <div className="key">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className={`project-list 0 ${0 < depth?'active1':''}`}
                        style={{width: size.max-size.min, height:size.min, flexDirection: "column"}}>
                        {renderProject(size.max - size.min, size.min, 1)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Project4;