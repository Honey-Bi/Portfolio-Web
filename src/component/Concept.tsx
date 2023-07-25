import Header from './Header';
import '../css/concept.css';

export default function Concept() {
    return (
        <div id='main'>
        <Header/>
        <div id="down">
            <div className="wrap">
                <div className="concept">
                    나는
                    <span className="im">asd</span>
                    입니다.
                </div>
            </div>
        </div>
    </div>
    )
}