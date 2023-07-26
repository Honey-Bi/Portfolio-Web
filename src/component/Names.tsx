import { useEffect, useState } from "react";
export default function Names() {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const names:HTMLCollection = document.getElementsByClassName('name');
        const interval:NodeJS.Timer  = setInterval(() => {
            if(count === names.length - 1) {
                setCount(0);
            } else {
                countUp()
            }
        }, 1000*10);
        
        names[count].classList.remove('exit');
        names[count].classList.add('active');
        if(count === 0) {
            names[names.length-1].classList.remove('active');
            names[names.length-1].classList.add('exit');
        } else {
            names[count - 1].classList.remove('active');
            names[count - 1].classList.add('exit');
        }
        return () => clearInterval(interval);
    }, [count]);

    const countUp = () => {
        setCount((prev) => prev + 1);
    }
    
    return (
        <div className="names">
            <div className="name">유현비</div>
            <div className="name">HyueonBi Yu</div>
            <div className="name">柳賢飛</div>
            <div className="name">HB</div>
        </div>
    )
}