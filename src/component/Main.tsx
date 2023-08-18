import { useNavigate } from 'react-router-dom';
import Header from './Header';
import 'css/main.css';
import { useEffect, useRef, useState } from 'react';
function Main() {
    const PENTAGON_SIZE = 300;
    const xmlns = "http://www.w3.org/2000/svg";
    const lists:Array<string> = ["project", "concept", "terminal", "","profile"];
    const pentagonDots = {
        center: ` ${PENTAGON_SIZE/2}, ${PENTAGON_SIZE/1.905759}`,
        bottomRight: ` ${PENTAGON_SIZE/1.2402044}, ${PENTAGON_SIZE/1.0550724637}`,
        bottomLeft: ` ${PENTAGON_SIZE/5.2374100719}, ${PENTAGON_SIZE/1.0550724637}`
    }

    const navigate = useNavigate ();
    const pentagonRef = useRef<SVGSVGElement>(null);
    useEffect( () => {
        const triangles = document.getElementsByClassName('triangle');
        if (triangles.length >= 5) { //추가생성 방지
            return;
        }
    
        const trianglesDots = pentagonDots.center + pentagonDots.bottomRight + pentagonDots.bottomLeft
        const pentagon = pentagonRef.current;
    
        if (pentagon === null) {
            return;
        }
        for(var title of lists) {
            const triangle:SVGElement = document.createElementNS(xmlns ,'polygon');
            triangle.setAttribute("points", trianglesDots);
            triangle.setAttribute("class", 'triangle');
            const move_url = `./${title}`;
            triangle.onclick = () => move(move_url);
            pentagon.appendChild(triangle);

            const text:SVGElement = document.createElementNS(xmlns ,'text');
            text.setAttribute("class", 'list-title');
            text.textContent = title;
            pentagon.appendChild(text);
        }
    });

    const move = (url:string) => {
        if (url !== './') navigate(url);
    }

    const [wheel, setWheel] = useState<number>(0);
    function rotateWheel(e: React.WheelEvent): void {
        if (e.deltaY > 0) { //down
            setWheel(wheel + 20);
        } else if (e.deltaY < 0) { //up
            setWheel(wheel - 20);
        }
    }

    return (
        <div id='main'>
            <Header/>
            <div id="down" className="down-height" onWheel={e => rotateWheel(e)}>
                <div 
                    className="container smooth main" 
                    style={{
                        transform: `rotate(${wheel}deg)`
                    }}
                >
                    <div className="box">
                        <svg
                            ref={pentagonRef}
                            className="pentagon"
                            style={{
                                'width' : `${PENTAGON_SIZE}px`,
                                'height' : `${PENTAGON_SIZE}px`
                            }}
                        >  
                        </svg>
                    </div>
                </div>
                <div className="select">
                    select
                </div>
            </div>
        </div>
    );
}

export default Main;