
export default function ToTop() {
    const toTop = () => {
        const top = document.getElementById('top') as Element;
        top.scrollIntoView(true);
    }
    return (
        <div className="toTop" onClick={toTop}>
            <span>to the top</span>
        </div>
    )
}