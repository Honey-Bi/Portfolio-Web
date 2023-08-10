import Header from './Header';
import 'css/project.css';
import { BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import posts from'json/post.json';

function Project() {
    const [direction, setDirection] = useState<number>(0);
    const slideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => { // 슬라이드 선택
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        slide[direction].classList.add('active');
    }, [direction]);

    const next = useCallback(() => { // 슬라이드 다음
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        if(direction === null || slide.length === 0) return;
        if (direction < slide.length-1) {
            slide[direction].classList.remove('active');
            setDirection((next) => next as number + 1);
        }
    }, [direction]);

    const prev = () => { // 슬라이드 되돌리기
        if (direction && direction > 0) {
            const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
            slide[direction].classList.remove('active');
            setDirection((prev) => prev as number - 1);
        }
    }

    function moveWheel(e: any): void { // 마우스 휠 핸들러
        if (e.deltaY > 0) {
            next();
        } else if (e.deltaY < 0) {
            prev();
        }
    }

    const navigate = useNavigate ();
    const move = useCallback((e:any, pName:string, bgColor:string) => { // 페이지 이동 함수
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
            state: {
                color: bgColor, 
            },
            
        });
    }, [navigate])

    const render_album = ():JSX.Element => {
        let result = [];
        let count = 0;
        for (var i of Object.values(posts)) {
            const src = Object.keys(posts)[count];
            const color = i.color;

            result.push(
                <div className="slide-item" key={src}>
                    <div className="record">
                        <div className="innerRound"></div>
                    </div>
                    <div className="record-shadow"></div>
                    <div 
                        className="album" 
                        style={{backgroundColor: color}}
                        onClick={(e) => move(e, src, color)}
                    >
                        <span className="album-title" style={{color: i.tColor}}>{i.title}</span>
                        <span className="album-date" style={{color: i.tColor}}>{i.date}</span>
                        <span className="album-category" style={{color: i.tColor}}>{i.category}</span>
                    </div>
                </div>
            );
            count++;
        }
        return (<>{result}</>);
    }

    const [mouse, setMouse] = useState<boolean>(false);
    const [mouseX, setMouseX] = useState<number>(0);
    const [style, setStyle] = useState<string>('');
    const mouseDownHandler = (e:BaseSyntheticEvent) => { // 터치 | 클릭 시작
        let event;
        if (e.type === "touchstart") {
            event = e.nativeEvent as TouchEvent;
            setMouseX(event.changedTouches[0].pageX);
        } else if (e.type === "mousedown") {
            event = e.nativeEvent as MouseEvent;
            setMouseX(event.pageX);
        }
        
        setMouse(true);
        if (slideRef.current) {
            slideRef.current.classList.remove('ease-reverse');
        }
    };

    const mouseMoveHandler = (e:BaseSyntheticEvent) => { // 터치 | 클릭 이동
        let event, pageX;
        if (e.type === "touchmove") {
            event = e.nativeEvent as TouchEvent;
            pageX = event.changedTouches[0].pageX;
        } else if (e.type === "mousemove") {
            event = e.nativeEvent as MouseEvent;
            pageX = event.pageX;
        }
        if (mouse && slideRef.current && direction !== null && pageX) {
            if (direction > 0 && pageX > mouseX) { // 전으로 | 마우스 우로 이동
                setStyle(`translateX(${pageX - mouseX}px)`);
            } else if (direction < Object.keys(posts).length-1 && mouseX > pageX) { // 앞으로 | 마우스 좌로 이동
                setStyle(`translateX(${pageX - mouseX}px)`);
            }
        }
    };    

    const mouseUpHandler = (e:BaseSyntheticEvent) => { // 터치 | 클릭 종료
        let event, pageX = 0;
        if (e.type === "touchend") {
            event = e.nativeEvent as TouchEvent;
            pageX = event.changedTouches[0].pageX;
        } else if (e.type === "mouseup") {
            event = e.nativeEvent as MouseEvent;
            pageX = event.pageX;
        }
        let distance = Math.round(Math.abs(pageX - mouseX) / 490);
        for (var i=0; i < distance; i++) {
            if (pageX > mouseX) prev();
            else if (pageX < mouseX) next();
        }
        setMouse(false);
        setStyle('');
        if (slideRef.current) {
            slideRef.current.classList.add('ease-reverse');
        }
    }

    return (
        <div id='main' 
            tabIndex={0}
        >
            <Header />
            <div id="down" className="down-height">
                <div className="wrap move" 
                    onWheel={moveWheel}

                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    
                    onTouchStart={mouseDownHandler}
                    onTouchMove={mouseMoveHandler}
                    onTouchEnd={mouseUpHandler}
                >
                    <div className="slide-move ease-reverse" 
                        ref={slideRef}
                        style={{
                            transform: style,
                        }}
                    >
                        <div className="slide" 
                            style={{
                                marginLeft: `calc(12.5rem*${direction}*-2.45)`,
                                width: `calc(12.5rem * 2.45 * ${Object.keys(posts).length})`
                            }}
                        >
                            {render_album()}
                        </div>
                    </div>
                </div>
                <div className="controller">
                </div>
                <div className="project-title">
                    project
                </div>
            </div>
        </div>
    );
}
export default Project;