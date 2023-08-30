import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "css/header.css";
import Draggable from "react-draggable";

export default function Header() {
  const isDark: String | null = localStorage.getItem("isDark");
  const [toggle, setToggle] = useState<boolean>(isDark === "on" ? true : false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  // 다크모드 변환
  useEffect(() => {
    if (toggle) {
      localStorage.setItem("isDark", "on");
      document.getElementsByClassName("mode-toggle")[0].classList.add("active");
      document.getElementById("root")?.classList.add("dark");
    } else {
      localStorage.setItem("isDark", "off");
      document.getElementsByClassName("mode-toggle")[0].classList.remove("active");
      document.getElementById("root")?.classList.remove("dark");
    }
  }, [toggle]);

  const items: { mushroom: number; potion: number } = {
    mushroom: Number(localStorage.getItem("mushroom")),
    potion: Number(localStorage.getItem("potion")),
  };
  const [moveItems, setItems] = useState(items);

  // 효과 추가 저장용 함수
  function addItems(item: iconType) {
    let i: number;
    switch (item) {
      case "mushroom":
      case "potion":
        i = Number(moveItems[item]);
        if (i < 2) {
          setItems((prevState) => {
            var prev = { ...prevState };
            prev[item] = ++i;
            localStorage.setItem(item, i + "");
            return prev;
          });
        }
        break;
      case "eraser":
        localStorage.setItem("mushroom", "0");
        localStorage.setItem("potion", "0");
        setItems({ mushroom: 0, potion: 0 });
        break;
    }
  }

  // 효과 추가시 클래스 추가
  useEffect(() => {
    const down: HTMLElement = document.getElementById("down") as HTMLElement;
    if (moveItems.mushroom === 2) {
      down.classList.add("mushroom");
      down.classList.replace("mushroom", "mushroom2");
    } else if (moveItems.mushroom === 1) {
      down.classList.add("mushroom");
    } else if (moveItems.mushroom === 0) {
      down.classList.remove("mushroom");
      down.classList.remove("mushroom2");
    }

    if (moveItems.potion === 2) {
      down.classList.add("potion");
      down.classList.replace("potion", "potion2");
    } else if (moveItems.potion === 1) {
      down.classList.add("potion");
    } else if (moveItems.potion === 0) {
      down.classList.remove("potion");
      down.classList.remove("potion2");
    }
  }, [moveItems]);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  type iconType = "mushroom" | "potion" | "eraser";

  const [icon, setIcon] = useState<iconType>("mushroom");
  const selectIcon = (set: iconType) => {
    setIcon(set);
  };

  // 효과 드래그 시작
  const dragOn = (e: any) => {
    const down: HTMLElement = document.getElementById("down") as HTMLElement;
    if (e.pageY >= 78 || (isMobile && e.changedTouches[0].pageY >= 78)) {
      down.classList.add("dropZone");
    } else {
      down.classList.remove("dropZone");
    }
  };
  // 효과 드래그 종료
  const dragStop = () => {
    const down: HTMLElement = document.getElementById("down") as HTMLElement;
    if (down.classList.contains("dropZone")) {
      addItems(icon);
    }
    down.classList.remove("dropZone");
  };

  // 홈버튼
  const location = useLocation();
  const Home = () => {
    if (location.pathname === "/") {
      return (
        <span className="reload" onClick={reload}>
          Home
        </span>
      );
    } else {
      return <Link to="/">Home</Link>;
    }
  };

  //새고로침
  const reload = () => {
    window.location.reload();
  };

  // 모바일 하단 조작바용 vh길이설정
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  return (
    <nav>
      <div className="nav-item nav-home">{Home()}</div>
      <div className="nav-item mode-toggle">
        <span onClick={clickedToggle}>
          <div className="sun-moon">
            <div className="half"></div>
          </div>
          Mode
        </span>
      </div>
      <div className="nav-item source">
        <Draggable
          onStart={(e) => selectIcon("mushroom")}
          onDrag={dragOn}
          onStop={dragStop}
          position={{ x: 0, y: 0 }}
        >
          <div className="source-item">
            <svg
              id="mushroom"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11.1c0 -4.474 -3.582 -8.1 -8 -8.1s-8 3.626 -8 8.1a0.9 .9 0 0 0 .9 .9h14.2a0.9 .9 0 0 0 .9 -.9z" />
              <path d="M10 12v7a2 2 0 1 0 4 0v-7" />
            </svg>
          </div>
        </Draggable>
        <Draggable
          onStart={(e) => selectIcon("potion")}
          onDrag={dragOn}
          onStop={dragStop}
          position={{ x: 0, y: 0 }}
        >
          <div className="source-item">
            <svg
              id="potion"
              viewBox="0 0 256 256"
              strokeWidth="18"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M104,32V93.8a8.4,8.4,0,0,1-1.1,4.1l-63.6,106A8,8,0,0,0,46.1,216H209.9a8,8,0,0,0,6.8-12.1l-63.6-106a8.4,8.4,0,0,1-1.1-4.1V32" />
              <line x1="88" y1="32" x2="168" y2="32" />
              <path d="M62.6,165c11.8-8.7,32.1-13.6,65.4,3,35.7,17.9,56.5,10.8,67.9,1.1" />
            </svg>
          </div>
        </Draggable>
        <Draggable
          onStart={(e) => selectIcon("eraser")}
          onDrag={dragOn}
          onStop={dragStop}
          position={{ x: 0, y: 0 }}
        >
          <div className="source-item">
            <svg
              id="eraser"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
            </svg>
          </div>
        </Draggable>
      </div>
    </nav>
  );
}
