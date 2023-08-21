
export default function ToTop(props:{color:string}) {
    const toTop = () => {
        const top = document.getElementById('top') as Element;
        top.scrollIntoView(true);
    }
    const color = props.color;
    return (
        <div className="toTop" onClick={toTop}>
            <span
                style={{color: color}}
            >to the top</span>
        </div>
    )
}