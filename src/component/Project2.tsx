import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import 'css/project2.css';
import posts from "json/post.json"

const golden_ratio = 1.61803398875; // 황금비

function Project4() {
    const baseRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
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
        return(
            <>
            <div className={`project-item ${count < depth?'active':''}`}
            onClick={e => select(e, count)}
            style={{width:min, height:min}}>
                <div className="project-scale" 
                style={{width: size.min, height: size.min,
                        transform: `scale(${scale})`,
                        // transformOrigin: `${min/2} ${min/2} `
                    }}>
                    <div className="project-content"
                    style={{
                        backgroundColor: data.color,
                        transform: `rotate(${rotate}deg)`
                    }}>
                        <div className="project-title" style={{color: data.tColor}}>
                            {data.title}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`project-list ${count} ${count < depth?active[index%4]:''}`}
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
        <div id="down" className='down-height base' 
            ref={baseRef} 
            onWheel={moveWheel}>
            <div className="back-button" onClick={goBack}></div>
            <div className="project-container" style={{width: size.width,height:size.height}}>
                <div className="project-view" ref={viewRef}>
                    <div className={`project-item ${0 < depth?'active':''}`} 
                        style={{width: size.min, height:size.min}}
                        onClick={e => select(e, 0)}>
                            <div className="project-scale"
                                style={{width: size.min, height: size.min}}>
                                <div className="project-content">
                                    <div className="project-title">Project</div>
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