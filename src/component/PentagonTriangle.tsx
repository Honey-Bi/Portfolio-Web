interface size {
    size: string;
}

export default function Triangle(prop:size) {
    const PENTAGON_SIZE = parseInt(prop.size);
    const pentagonDots = {
        top: ` ${PENTAGON_SIZE/2}, 0`,
        left: ` 0, ${PENTAGON_SIZE/2.757575}`,
        right: ` ${PENTAGON_SIZE}, ${PENTAGON_SIZE/2.757575}`,
        center: ` ${PENTAGON_SIZE/2}, ${PENTAGON_SIZE/1.905759}`,
        bottomRight: ` ${PENTAGON_SIZE/1.2402044}, ${PENTAGON_SIZE/1.0550724637}`,
        bottomLeft: ` ${PENTAGON_SIZE/5.2374100719}, ${PENTAGON_SIZE/1.0550724637}`
    };

    const trianglesDots = [
        pentagonDots.center + pentagonDots.top + pentagonDots.right,
    ]
    const triangleElements = Array.from(
        document.getElementsByClassName("triangle")
    );
    
    triangleElements.forEach((triangleElement, i) => {
        triangleElement.setAttribute("points", trianglesDots[i])
    });
    return (
        <polygon className="triangle"/>
    );
}