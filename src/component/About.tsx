import Header from './Header';
import '../css/about.css';
import Names from './Names';

export default function About() {
    
    return (
        <div id="main">
            <Header/>
            <div id="down" className='about-flex'>
                <div className="about">
                    <div className="about-name">
                        <Names/>
                    </div>
                    <div className="about-accent">- - - - - - - - - - - - - - - - - - - - - - - - - -</div>
                    <div className="about-accent">Command</div>
                    <div className="about-tab">whoami</div>
                    <div className="about-tab">pwd</div>
                    <div className="about-tab">exit</div>
                    <div className="about-tab">ls</div>
                    <div className="about-tab">cd</div>
                    <div className="about-tab">contact</div>
                    <div className="about-accent">- - - - - - - - - - - - - - - - - - - - - - - - - -</div>
                    <input type="text" className='command' />
                </div>
                <div className="whoami">
                    <span>who am i</span>
                </div>
            </div>
        </div>
    )
}