import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import 'css/project3.css';
import posts from "json/post.json"

const golden_ratio = 1.618;
function Project3() {
    const baseRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    type size2 = {
        width: number,
        height: number
    }

    const [size, setSize] = useState<size2>({width:0, height:0});
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
                height: height
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
            const min = Math.min(size.width, size.height);
            let scale = 1;
            const rotate = -90 * depth
            let tmp_x = 0, tmp_y = 0;
            for (let i = 0; i < depth; i++) {
                scale *= golden_ratio
                if (i % 2 === 0) {
                    tmp_x -= (min/2)*(i+1)
                    // tmp_x -= (min/2)/((i+1) * (i+1/golden_ratio))
                } else {
                    console.log(i);
                    tmp_y -= (min/2)/(i+1)
                }
            }
            let style = `
                transform: scale(${scale}) rotate(${rotate}deg) translate(${tmp_x}px, ${tmp_y}px)
            `;
            view.setAttribute('style', style)
        }
    }, [depth, size.height, size.width]);


    function renderProejct(min: number, max: number, count: number): JSX.Element {
        if (count > posts.length - 1) {
            return(<></>);
        }
        const size_min = Math.min(size.width, size.height);
        const data = posts[count];
        let scale = 1 / golden_ratio;
        for (var i = 0; i < count; i++) scale = scale * (1 / golden_ratio)
        return (
            <>
                <div
                    className="project-item"
                    style={{width: min, height: min}}
                    onClick={e => setDepth(count+1)}
                >
                    <div className="project-content" 
                        style={{
                            width: size_min, height: size_min, 
                            transform: `scale(${scale})`
                        }}
                    >
                        <div className="project-title">{data.title}</div>
                    </div>
                </div>
                <div className="project-list"
                    style={{width: min, height: max-min, transformOrigin: `${min/2}px ${min/2}px`}}
                >
                    {renderProejct(max-min, min, count + 1)}
                </div>
            </>
        );
    }
    function renderProejctBase(): JSX.Element { 
        const min = Math.min(size.width, size.height);
        const max = Math.max(size.width, size.height);
        
        return(
            <div className="project-view" ref={viewRef}>
                <div className="project-item"
                    onClick={e => setDepth(0)}
                    style={{width: min, height: min}}
                >
                    <div className="project-content" style={{width: min, height: min}}>
                        <div className="project-title">project</div>
                    </div>
                </div>
                <div className="project-list"
                    style={{width: min, height: max-min, transformOrigin: `${min/2}px ${min/2}px`}}
                >
                    {renderProejct(max-min, min, 0)}
                </div>
            </div>
        )
    }

    function moveWheel(e: any): void { // 마우스 휠 핸들러
        if (e.deltaY > 0 && depth > 0) { 
            setDepth(prev => prev - 1);
        } else if (e.deltaY < 0 && depth < posts.length-1) {
            setDepth(prev => prev + 1);
        }
    }

    return (
        <div id="main">
            <Header />
            <div id="down" className='down-height base' 
                ref={baseRef}
                onWheel={moveWheel}
            >
                <div 
                    className="project-container"
                    style={{
                        width: size.width,
                        height: size.height
                    }}
                >
                    {renderProejctBase()}
                </div>
            </div>
            {/* <div className="project-title">
                project
            </div> */}
        </div>
    )
}
export default Project3;