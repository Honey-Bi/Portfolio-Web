import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
// import { useRef } from 'react';

// import Timer from './component/Timer';

import './css/index.css';
import './css/transition.css';

import Main from './component/Main';
import Test from './component/Test';
import Project from './component/Project';

function App() {
    const location = useLocation();
    // const nodeRef = useRef(null);
    
    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition 
            // nodeRef={nodeRef} 
            key={location.key} timeout={800} classNames="move">
                <Routes location={location}>
                    <Route path="/" element={<Main/>} />
                    <Route path="/Project" element={<Project/>} />
                    <Route path="/Test" element={<Test/>} />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    )
}
export default App;