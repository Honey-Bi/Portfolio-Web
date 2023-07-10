import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Timer from './component/Timer';
import Main from './component/Main';
import './css/index.css';
import './css/transition.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/Timer" element={<Timer s={10}/>} />
            </Routes>
        </BrowserRouter>
    )
}