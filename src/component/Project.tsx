import Header from './Header';
import 'css/project.css';
import { BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import posts from'post.json';

function Project() {
    const [play, setPlay] = useState<boolean>(true);
    const [direction, setDirection] = useState<number|null>(null);
    const [count, setCount] = useState<number>(20);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if(direction === null) return;
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
    }, [direction]);

    const next = useCallback(() => {
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        if(direction === null || slide.length === 0) return;
        if (direction < slide.length-1) {
            slide[direction].classList.remove('active');
            setDirection((next) => next as number + 1);
        }
    }, [direction]);

    useEffect(() => {
        if(count === 0 ) {
            setCount(20)
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
        if (direction && direction > 0) {
            const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
            slide[direction].classList.remove('active');
            setDirection((prev) => prev as number - 1);
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
    const move = useCallback((e:MouseEvent, pName:string) => {
        const main:Element = document.getElementById('main') as Element;
        // const event = e.nativeEvent as PointerEvent;
        const target = e.target as Element;
        const target_style:CSSStyleDeclaration = window.getComputedStyle(target);

        const style = `
            top: -${document.body.clientHeight - e.pageY}px;
            left: -${document.body.clientWidth - e.pageX}px;
            background-color: ${target_style.backgroundColor}
        `;

        const add_element = document.createElement('div');
        add_element.classList.add('project-enter');
        add_element.setAttribute('style', style);
        main.after(add_element)

        navigate(`./post/${pName}`,{
            state: {
                color:target_style.backgroundColor, 
            },
            
        });
    }, [navigate])

    const handelKeyDown =(e:BaseSyntheticEvent) => {
        const event = e.nativeEvent as KeyboardEvent;
        if (event.key === ' ') {
            PP();
        }
    };

    useEffect(() => {
        const slide = document.getElementsByClassName('slide')[0];
        if (slide && slide.childNodes.length < Object.values(posts).length) {
            for (var i of Object.values(posts)) {
                const s_item = document.createElement('div');
                s_item.classList.add('slide-item');
                const album = document.createElement('div');
                album.classList.add('album');
                album.setAttribute('style', `background-color: ${i.color}`);
                
                const album_title = document.createElement('span');
                album_title.classList.add('album-title');
                const title = i.title;
                album_title.textContent = title;
                album_title.setAttribute('style', `color: ${i.tColor}`);
                album.onclick = e => move(e, title);
                album.appendChild(album_title);
                
                const album_date = document.createElement('span');
                album_date.classList.add('album-date');
                album_date.textContent = i.date;
                album_date.setAttribute('style', `color: ${i.tColor}`);
                album.appendChild(album_date);

                const album_category = document.createElement('span');
                album_category.classList.add('album-category');
                album_category.textContent = i.category;
                album_category.setAttribute('style', `color: ${i.tColor}`);
                album.appendChild(album_category);

                const record = document.createElement('div');
                record.classList.add('record');
                const round = document.createElement('div');
                round.classList.add('innerRound');
                const shadow = document.createElement('div');
                shadow.classList.add('record-shadow');

                record.appendChild(round);
                s_item.appendChild(record);
                s_item.appendChild(shadow);
                s_item.appendChild(album);
                s_item.appendChild(album);
                slide.appendChild(s_item);
            }
            setDirection(0);
        }
    }, [move]);

    return (
        <div id='main' 
            tabIndex={0}
            onKeyDown={handelKeyDown}
        >
            <Header />
            <div id="down">
                <div className="wrap" 
                    onWheel={e => moveWheel(e)}
                >
                    <div className="slide" style={{
                        transform: `translateX(calc(12.5rem*${direction}*-2.45))`,
                        width: `calc(12.5rem * 2.45 * ${Object.keys(posts).length})`
                    }}>
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
                <div className="project-title">
                    project
                </div>
            </div>
        </div>
    );
}
export default Project;