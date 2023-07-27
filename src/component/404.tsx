import { useLocation } from "react-router-dom";

export default function NotFound404() {    
    const location = useLocation();
    if (location.pathname !== '/404') window.location.replace('/404');
    return (
        <div className="404">404 not found</div>
    )
}