import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../css/main.css';
import '../css/transition.css'
function Main() {

    const navigate = useNavigate();

    function Move(path:String):void {
        const element = document.getElementById('main');
        element?.classList.remove('enter');
        element?.classList.add('exit');
        setTimeout(() => {
            navigate(path.toString());
        }, 800);
    }

    return (
        <div className='enter' id='main'>
            <Header/>
            <div className="container">
                <div className="box">
                    <div className="comb">
                        <div className="tri" onClick={() => Move('./Timer')}>
                            <span>test1</span>
                        </div>
                        <div className="tri">
                            <span>test2</span>
                        </div>
                        <div className="tri">
                            <span>test3</span>
                        </div>
                        <div className="tri">
                            <span>test4</span>
                        </div>
                        <div className="tri">
                            <span>test5</span>
                        </div>
                        <div className="tri">
                            <span>test6</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;