import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import '../css/main.css';
import { useEffect } from 'react';
function Main() {
    const PENTAGON_SIZE = 300;
    const lists:Array<string> = ["project", "concept", "making", '',"profile"];
    const navigate = useNavigate ();
    useEffect( () => {
        const triangles = document.getElementsByClassName('triangle');
        if (triangles.length >= 5) {
            return;
        }
        const pentagonDots = {
            center: ` ${PENTAGON_SIZE/2}, ${PENTAGON_SIZE/1.905759}`,
            bottomRight: ` ${PENTAGON_SIZE/1.2402044}, ${PENTAGON_SIZE/1.0550724637}`,
            bottomLeft: ` ${PENTAGON_SIZE/5.2374100719}, ${PENTAGON_SIZE/1.0550724637}`
        }
    
        const trianglesDots = pentagonDots.center + pentagonDots.bottomRight + pentagonDots.bottomLeft
    
        const xmlns = "http://www.w3.org/2000/svg";
        const pentagon:SVGElement = document.getElementsByTagNameNS(xmlns, "svg")[0];
    
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
        if (url !== './') {
            navigate(url);
        }
    }

    return (
        <div id='main'>
            <Header/>
            <div id="down">
                <div className="container">
                    <div className="box">
                        <svg
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
                    <span>select</span>
                </div>
            </div>
        </div>
    );
}

export default Main;