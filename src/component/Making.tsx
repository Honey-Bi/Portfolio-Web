import Header from "./Header";

import '../css/making.css'

export default function Making() {

    const toTop = () => {
        const top = document.getElementById('top') as Element;
        top.scrollIntoView(true);
    }

    return(
        <div id="main" className="scroll">
            <div id="top"></div>
            <Header/>
            <div id="down">
                <div className="container making-flex">
                    
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
                        <div className="info-concept">
                            <div className="info-title">concept</div>
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