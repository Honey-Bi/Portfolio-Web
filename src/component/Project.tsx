import Header from './Header';
import '../css/project.css';
import { useEffect, useState } from 'react';

function Project() {
    const [play, setPlay] = useState<boolean>(true);
    const [direction, setDirection] = useState<number>(0);
    useEffect(() => {
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        slide[direction].classList.add('active');

    },[direction]);

    useEffect(() => {   
        const slideId = setInterval(() => {
            next();
        }, 1000*10);
        return () => clearInterval(slideId);
    });

    const PP = () => {
        setPlay((prev) => !prev);
    }
    const next = () => {
        const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
        if (direction < slide.length-1) {
            slide[direction].classList.remove('active');
            setDirection((next) => next + 1);
        }
    }
    const prev = () => {
        if (direction > 0) {
            const slide:HTMLCollectionOf<Element> = document.getElementsByClassName('slide-item');
            slide[direction].classList.remove('active');
            setDirection((prev) => prev - 1);
        }
    }

    return (
        <div id='main'>
            <Header/>
            <div id="down">
                <div className="wrap">
                    <div className="slide" style={{
                        transform: `translateX(${-15*direction}rem)`
                    }}>
                        <div className="slide-item">&nbsp;</div>
                        <div className="slide-item">&nbsp;</div>
                        <div className="slide-item">&nbsp;</div>
                        <div className="slide-item">&nbsp;</div>
                        <div className="slide-item">&nbsp;</div>
                    </div>
                </div>
                <div className="controller">
                    <div className="btn-group">
                        <button onClick={prev}>
                            <i className="fa-solid fa-backward"></i>
                        </button>
                        <button className={play?'active':''} onClick={PP}>
                            <i className="fa-solid fa-pause"></i>
                            <i className="fa-solid fa-play"></i>
                        </button>
                        <button onClick={next}>
                            <i className="fa-solid fa-forward"></i>
                        </button>
                    </div>
                    <div className={play?'timer':'timer active'}>
                        <div id='round' className="round"></div>
                        <div id='fill' className="fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Project;