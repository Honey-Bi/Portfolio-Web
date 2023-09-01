import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import "css/main.css";
import { useCallback, useEffect, useRef, useState } from "react";
function Main() {
  const PENTAGON_SIZE = 300;
  const xmlns = "http://www.w3.org/2000/svg";
  // 6각형 비율 저장

  const navigate = useNavigate();
  const pentagonRef = useRef<SVGSVGElement>(null);

  // 이동용 함수
  const move = useCallback(
    (url: string) => {
      if (url !== "./") navigate(url);
    },
    [navigate]
  );

  // 6각형 생성 함수
  const drawPentagon = useCallback(
    (svg: SVGSVGElement) => {
      const lists = ["project", "concept", "terminal", "", "profile"];
      const pentagonDots = {
        center: ` ${PENTAGON_SIZE / 2}, ${PENTAGON_SIZE / 1.905759}`,
        bottomRight: ` ${PENTAGON_SIZE / 1.2402044}, ${PENTAGON_SIZE / 1.0550724637}`,
        bottomLeft: ` ${PENTAGON_SIZE / 5.2374100719}, ${PENTAGON_SIZE / 1.0550724637}`,
      };
      const trianglesDots =
        pentagonDots.center + pentagonDots.bottomRight + pentagonDots.bottomLeft;

      for (const title of lists) {
        const triangle: SVGElement = document.createElementNS(xmlns, "polygon");
        triangle.setAttribute("points", trianglesDots);
        triangle.setAttribute("class", "triangle");
        const moveUrl = `./${title}`;
        triangle.onclick = () => move(moveUrl);
        svg.appendChild(triangle);

        const text: SVGElement = document.createElementNS(xmlns, "text");
        text.setAttribute("class", "list-title");
        text.textContent = title;
        svg.appendChild(text);
      }
    },
    [move]
  );

  useEffect(() => {
    const triangles = document.getElementsByClassName("triangle");
    // 추가생성 방지
    if (triangles.length >= 5) return;

    // 생성 영역 확인
    if (pentagonRef.current) drawPentagon(pentagonRef.current);
  }, [drawPentagon]);

  const [wheel, setWheel] = useState<number>(0);
  // 스크롤 함수
  function rotateWheel(e: React.WheelEvent): void {
    if (e.deltaY > 0) {
      //down
      setWheel(wheel + 20);
    } else if (e.deltaY < 0) {
      //up
      setWheel(wheel - 20);
    }
  }

  return (
    <div id="main">
      <Header />
      <div id="down" className="down-height" onWheel={(e) => rotateWheel(e)}>
        <div
          className="container smooth main"
          style={{
            transform: `rotate(${wheel}deg)`,
          }}
        >
          <div className="box">
            <svg
              ref={pentagonRef}
              className="pentagon"
              style={{
                width: `${PENTAGON_SIZE}px`,
                height: `${PENTAGON_SIZE}px`,
              }}
            ></svg>
          </div>
        </div>
        <div className="select">select</div>
      </div>
    </div>
  );
}

export default Main;
