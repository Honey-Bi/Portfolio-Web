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
                            <Link to={'./Project'} className='tri'>
                                <span>project</span>
                            </Link>
                            <Link to={'./Test'} className='tri'>
                                <span>test1</span>
                            </Link>
                            <Link to={'./Concept'} className='tri'>
                                <span>concept</span>
                            </Link>
                            <Link to={'./Making'} className='tri'>
                                <span>making</span>
                            </Link>
                            <Link to={'./Profile'} className='tri'>
                                <span>profile</span>
                            </Link>
                        </div>
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