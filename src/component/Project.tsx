import Header from './Header';
import '../css/project.css';
import { BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Project() {
    const [play, setPlay] = useState<boolean>(true);
    const [direction, setDirection] = useState<number>(0);
    const [count, setCount] = useState<number>(20);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        slide[direction].classList.add('active');
        const round:HTMLElement = document.getElementById('round') as HTMLElement;
        const fill:HTMLElement = document.getElementById('fill') as HTMLElement;
        round.classList.remove('round');
        fill.classList.remove('fill');
        void round.offsetWidth; 
        void fill.offsetWidth; 
        round.classList.add('round');
        fill.classList.add('fill');
        setCount(20)
    },[direction]);

    const next = useCallback(() => {
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        if (direction < slide.length-1) {
            slide[direction].classList.remove('active');
            setDirection((next) => next + 1);
        }
    },[direction]);

    useEffect(() => {
        if(count <= 0 ) {
            next()
        }
    }, [count, next]);

    useEffect(() => {
        if(play) {
            timerRef.current = setInterval(elapsed, 500);
        } else {
            clearInterval(timerRef.current as NodeJS.Timer)
        }
        return () => clearInterval(timerRef.current as NodeJS.Timer);
    }, [play]);

    const elapsed = () => {
        setCount((prev) => prev-1);
    }
    const PP = () => {
        setPlay((prev) => !prev);
    }
    
    const prev = () => {
        if (direction > 0) {
            const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
            slide[direction].classList.remove('active');
            setDirection((prev) => prev - 1);
        }
    }

    function moveWheel(e: any): void {
        if (e.deltaY > 0) {
            next();
        } else if (e.deltaY < 0) {
            prev();
        }
    }

    const navigate = useNavigate ();
    // const [move, setPosition] = useState<object>();
    const main:Element = document.getElementById('main') as Element;
    function move(e:BaseSyntheticEvent, pName:string):void {
        const event = e.nativeEvent as PointerEvent;
        const target:Element = e.target;
        const target_style:CSSStyleDeclaration = window.getComputedStyle(target);

        const style = `
            top: -${document.body.clientHeight - event.pageY}px;
            left: -${document.body.clientWidth - event.pageX}px;
            background-color: ${target_style.backgroundColor}
        `;

        const add_element:Element = document.createElement('div');
        add_element.setAttribute('class', 'project-enter');
        add_element.setAttribute('style', style);
        main.after(add_element)

        navigate(`./post`, {
            state: {
                color:target_style.backgroundColor, 
                page: pName
            }
        });
    }
    return (
        <div id='main'>
            <Header />
            <div id="down">
                <div className="wrap" onWheel={e => moveWheel(e)}>
                    <div className="slide" style={{
                        transform: `translateX(calc(12.5rem*${direction}*-2.45))`
                    }}>
                        <div className="slide-item">
                            <div className="album" onClick={e => move(e, '')}>
                                <span className="album-title">test1</span>
                            </div>
                            <div className="record">
                                <div className="innerRound"></div>
                            </div>
                            <div className="record-shadow"></div>
                        </div>
                        <div className="slide-item">
                            <div className="album" onClick={e => move(e, '')}></div>
                            <div className="record">
                                <div className="innerRound"></div>
                            </div>
                            <div className="record-shadow"></div>
                        </div>
                        <div className="slide-item">
                            <div className="album" onClick={e => move(e, '')}></div>
                            <div className="record">
                                <div className="innerRound"></div>
                            </div>
                            <div className="record-shadow"></div>
                        </div>
                        <div className="slide-item">
                            <div className="album" onClick={e => move(e, '')}></div>
                            <div className="record">
                                <div className="innerRound"></div>
                            </div>
                            <div className="record-shadow"></div>
                        </div>
                    </div>
                </div>
                <div className="controller">
                    <div className="btn-group">
                        <button onClick={prev}>
                            <i className="fa-solid fa-backward"></i>
                        </button>
                        <button className={play ? 'active' : ''} onClick={PP}>
                            <i className="fa-solid fa-pause"></i>
                            <i className="fa-solid fa-play"></i>
                        </button>
                        <button onClick={next}>
                            <i className="fa-solid fa-forward"></i>
                        </button>
                    </div>
                    <div className={play ? 'timer' : 'timer active'}>
                        <div id='round' className="round"></div>
                        <div id='fill' className="fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Project;