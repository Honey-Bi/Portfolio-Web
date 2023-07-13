import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
// import { useRef } from 'react';

import './css/index.css';
import './css/transition.css';

import Main from './component/Main';
import Test from './component/Test';
import Project from './component/Project';
import Profile from './component/Profile';

function App() {
    const location = useLocation();
    // const nodeRef = useRef();
    
    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition 
            // nodeRef={nodeRef} 
            key={location.key} timeout={800} classNames="move">
                <Routes location={location}>
                    <Route path="/" element={<Main/>} />
                    <Route path="/Project" element={<Project/>} />
                    <Route path="/Test" element={<Test/>} />
                    <Route path="/Concept" element={<Test/>} />
                    <Route path="/Making" element={<Test/>} />
                    <Route path="/Profile" element={<Profile/>} />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    )
}
export default App;