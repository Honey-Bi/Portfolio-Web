import { Link } from 'react-router-dom';
import Header from './Header';
import '../css/main.css';
function Main() {
    return (
        <div id='main'>
            <Header/>
            <div id="down">
                <div className="container">
                    <div className="box">
                        <div className="comb">
                            <div className="tri">
                                <span></span>
                            </div>
                            <Link to={'/Project'} className='tri'>
                                <span>project</span>
                            </Link>
                            <Link to={'/Test'} className='tri'>
                                <span>test1</span>
                            </Link>
                            <div className="tri">
                                <span>concept</span>
                            </div>
                            <div className="tri">
                                <span>making</span>
                            </div>
                            <div className="tri">
                                <span>profile</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;