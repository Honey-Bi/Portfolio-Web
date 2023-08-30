import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import "./css/index.css";
import "./css/transition.css";

import Main from "pages/Main";
import Post from "pages/Post";
import Profile from "pages/Profile";
import Concept from "pages/Concept";
import Terminal from "pages/Terminal";
import NotFound from "pages/NotFound";
import Project from "pages/Project";

function App() {
  const location = useLocation();
  let className: string;

  // 현재 위치에 따라서 페이지 트랜지션 바꾸기
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
      <CSSTransition key={location.key} timeout={800} classNames={className}>
        <Routes location={location}>
          <Route path="/" element={<Main />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/post/:pname" element={<Post />} />
          <Route path="/concept" element={<Concept />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
}
export default App;
