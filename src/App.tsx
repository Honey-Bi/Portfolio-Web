import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './css/index.css';
import './css/transition.css';

import Main from './component/Main';
import Post from './component/Post';
// import Project from 'component/Project';
import Profile from 'component/Profile';
import Concept from 'component/Concept';
import Terminal from 'component/Terminal';
import NotFound from 'component/NotFound';
import Project4 from 'component/Project2';

function App() {
    const location = useLocation();
    let className:string; 
        
    switch (true) {
        case /^\/project\/[a-zA-Z]/.test(location.pathname): // /project/
            className = "project-move";
            break;
        case /^\/test\/[a-zA-Z]/.test(location.pathname): // /test/
            className = "move-none";
            break;
        default:
            className = "move";
            break;
    }
    
    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                key={location.key} timeout={800} classNames={className}>
                <Routes location={location}>
                    <Route path="/" element={<Main />} />
                    <Route path="/project" element={<Project4 />} />
                    <Route path="/Project4" element={<Project4 />} />
                    <Route path="/project/post/:pname" element={<Post />} />
                    <Route path="/concept" element={<Concept />} />
                    <Route path="/terminal" element={<Terminal />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/*" element={<NotFound />}  />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    )
}
export default App;