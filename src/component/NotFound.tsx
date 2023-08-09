import { useEffect } from "react";
import style from 'css/notFound.module.css';
import { Link } from "react-router-dom";

export default function NotFound() {
    const isDark:String|null = localStorage.getItem('isDark');
    
    useEffect(() => {
        if (isDark==='on') {
            document.getElementById('root')?.classList.add('dark');
        } else {
            document.getElementById('root')?.classList.remove('dark');
        }
    }, [isDark]);


    return(
        <div id={style.notFound}>
            <div className={style.center}>
                <div className={style.title}>404</div>
                <div className={style.content}>
                    The page you are looking for might be removed or is temporally unavailable
                </div>
                <Link to={'/'} className={`${style.button} ${isDark==="on"?style.dark:''}`}>
                    go back home
                </Link>
            </div>
        </div>
    )
}