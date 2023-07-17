import Header from "./Header";
import { useState } from "react";

import '../css/making.css'

export default function Making() {
    const [selector, setSelector] = useState<Element|null>(null);
    const [beforeSame, setBeaforeSave] = useState<boolean>(true);
    const select = (e:any):void => {
        let select_element:Element = e.target;
        if (select_element.classList.contains('color')) {
            select_element = e.target.parentNode;
        }

        selector?.classList.remove('active');
        select_element.classList.add('active');

        if (selector === select_element && beforeSame) {
            selector?.classList.remove('active');
            setBeaforeSave(false);
        } else {
            setBeaforeSave(true);
        }
        setSelector(select_element);

    }
    const toTop = () => {
        const top:Element = document.getElementById('top') as Element;
        top.scrollIntoView(true);
    }

    return(
        <div id="main" className="scroll">
            <div id="top"></div>
            <Header/>
            <div id="down">
                <div className="container making-flex">
                    <div className="time-line">
                        <div className="line"></div>
                        <div className="square"></div>
                        <div className="line-item">
                            <div className="square selector project" onClick={(e) => select(e)}>
                                <div className="color"></div>
                            </div>
                            <div className="item-title">
                                
                            </div>
                        </div>
                        <div className="square selector test1" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector concept" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector making" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector profile" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square"></div>
                        <div className="time-line-text">
                            text
                        </div>
                    </div>
                    <div className="info">
                        <div className="info-project">
                            <div className="info-title">project</div>
                            <div className="info-head">
                                <div className="info-album">
                                    <div className="case">
                                        <div className="disk">test</div>
                                    </div>
                                </div>
                            </div>
                            <div className="info-sub">
                            </div>
                        </div>
                        <div className="info-test1">
                            <div className="info-title">test1</div>
                        </div>
                        <div className="info-concept">
                            <div className="info-title">concept</div>
                        </div>
                        <div className="info-making">
                            <div className="info-title">making</div>
                        </div>
                        <div className="info-profile">
                            <div className="info-title">profile</div>
                        </div>
                    </div>
                </div>
                <div className="container making-flex" >
                    <div className="toTop" onClick={toTop}>
                        <span>to the top</span>
                    </div>
                </div>
            </div>
        </div>
    )
}