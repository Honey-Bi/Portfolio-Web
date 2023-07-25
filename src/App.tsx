import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './css/index.css';
import './css/transition.css';

import Main from './component/Main';
import Test from './component/Test';
import Project from './component/Project';
import Profile from './component/Profile';
import Concept from './component/Concept';
import Making from './component/Making';

function App() {
    const location = useLocation();
    // const nodeRef = useRef();
    let className:string; 
        
    switch (true) {
        case /^\/project\/[a-zA-Z]/.test(location.pathname): // /project/
            className = "project-move";
            break;
        default:
            className = "move";
            break;
    }
    
    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                // nodeRef={nodeRef} 
                key={location.key} timeout={800} classNames={className}>
                <Routes location={location}>
                    <Route path="/" element={<Main />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/project/Test" element={<Test />} />
                    <Route path="/concept" element={<Concept />} />
                    <Route path="/making" element={<Making />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    )
}
export default App;