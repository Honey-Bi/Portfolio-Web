import Header from "components/Header";
import { BaseSyntheticEvent, useEffect, useState } from "react";

import "css/profile.css";
import ToTop from "components/ToTop";
import { Link } from "react-router-dom";

import skills from "json/skills.json";
import Github from "components/github";

import posts from "json/post.json";

export default function Profile() {
  const [selector, setSelector] = useState<Element | null>(null);
  const [beforeSame, setBeaforeSave] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  // 구역이동 하이퍼링크
  const select = (e: BaseSyntheticEvent, id: string): void => {
    let select_element: Element = e.target;
    if (select_element.classList.contains("color")) {
      select_element = e.target.parentNode;
    }

    selector!.classList.remove("active");
    select_element.classList.add("active");

    // 전과 같은 이동인지 확인
    if (selector === select_element && beforeSame) {
      selector.classList.remove("active");
      setBeaforeSave(false);
    } else {
      setBeaforeSave(true);
    }
    setSelector(select_element);

    const move = document.getElementById(id) as Element;
    move.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const removeSelect = () => {
    if (selector) selector.classList.remove("active");
  };

  // 이름 변환 트랜지션
  useEffect(() => {
    const names: HTMLCollection = document.getElementsByClassName("name");
    const interval: NodeJS.Timer = setInterval(() => {
      if (count === names.length - 1) {
        setCount(0);
      } else {
        countUp();
      }
    }, 1000 * 10);

    names[count].classList.remove("exit");
    names[count].classList.add("active");
    if (count === 0) {
      names[names.length - 1].classList.remove("active");
      names[names.length - 1].classList.add("exit");
    } else {
      names[count - 1].classList.remove("active");
      names[count - 1].classList.add("exit");
    }
    return () => clearInterval(interval);
  }, [count]);

  const countUp = () => {
    setCount((prev) => prev + 1);
  };

  // 기술 스택 명시 랜더링
  const render_skills = (): JSX.Element => {
    let result = [];
    for (let i in skills) {
      const skill = skills[i];
      result.push(
        <div className="skill-item" key={i}>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-progress">
            <div
              className="skill-bar"
              style={{
                width: `${skill.progress}%`,
                backgroundColor: skill.color,
              }}
            >
              <div className="skill-round" style={{ backgroundColor: skill.color }}></div>
              <span className="skill-percent" style={{ color: skill.color }}>
                {skill.progress}%
              </span>
            </div>
          </div>
          <div className="skill-content">{skill.content}</div>
        </div>
      );
    }
    return <div className="skill">{result}</div>;
  };

  // 자격증, 학력 열고 닫기
  const openList = (e: BaseSyntheticEvent) => {
    let target: HTMLElement = e.target;
    if (e.target.className === "close") target = target.parentElement!;
    if (target.classList.contains("active")) target.classList.remove("active");
    else target.classList.add("active");
  };

  // 프로젝트 리스트 랜더링
  function renderProjectList(): JSX.Element {
    let result = [];
    let count = 0;
    for (let i of posts) {
      let urls = [];
      if (i.github) {
        urls.push(
          <a href={i.github} target="_blink" className="url" key={i.github}>
            <Github color="#068FFF" size="24" />
            github
          </a>
        );
      }
      if (i.demo) {
        urls.push(
          <a href={i.demo} target="_blink" className="url" key={i.demo}>
            DEMO
          </a>
        );
      }
      result.push(
        <div className="profile-project" key={i.title}>
          <p>
            <Link className="profile-project-title" to={`/project/post/${count++}`}>
              {i.title}
            </Link>
            <span className="date">{i.date}</span>
            {urls}
          </p>
          <span>{i.brief}</span>
        </div>
      );
    }
    return <>{result}</>;
  }

  return (
    <div id="main" className="scroll">
      <Header />
      <div id="top"></div>
      <div id="down" onWheel={removeSelect} onTouchMove={removeSelect}>
        <div className="container" id="profile">
          <div className="time-line">
            <div className="line"></div>
            <div className="square"></div>
            <div className="square selector about" onClick={(e) => select(e, "about")}>
              <div className="color"></div>
            </div>
            <div className="square selector summary" onClick={(e) => select(e, "skills")}>
              <div className="color"></div>
            </div>
            <div
              className="square selector project"
              onClick={(e) => select(e, "project")}
            >
              <div className="color"></div>
            </div>
            <div className="square selector skills" onClick={(e) => select(e, "summary")}>
              <div className="color"></div>
            </div>
            <div
              className="square selector contact"
              onClick={(e) => select(e, "contact")}
            >
              <div className="color"></div>
            </div>
            <div className="square"></div>
          </div>

          <div className="profile">
            {/* 자기소개 */}
            <div className="profile-section">
              <div className="profile-sub" id="about">
                about me
              </div>
              <div className="profile-name">
                <div className="name-hidden">&nbsp;</div>
                <div className="names">
                  <div className="name">류현비</div>
                  <div className="name">HyueonBi Yu</div>
                  <div className="name">柳賢飛</div>
                  <div className="name">HB</div>
                </div>
              </div>
              <p>재미있는 아이디어를 상상하고 구현하는것을 즐기는 주니어 개발자입니다.</p>
              <p>
                언제나 시도를 두려워하지 않으며, 문제에 직면하면 적극적으로 해결책을
                찾아내고자 합니다. 이러한 자세로 다양한 프로젝트를 진행하고, 기술적인
                도전과 성장을 지속적으로 추구합니다.
              </p>
              <ul className="thinking">
                <li>기본은 항상 중요하다고 생각하고 있습니다.</li>
                <li>우물안 개구리가 되지않기 위해 끊임없이 고뇌하고 있습니다.</li>
                <li>항상 참신한 시도를 해보려고 노력하고있습니다.</li>
              </ul>
              <div className="about-bundle">
                <span>
                  EMAIL : <a href="mailto:biten10@naver.com">biten10@naver.com</a>
                </span>
                <a href="https://github.com/Honey-Bi" target="_blink">
                  <Github color="#068FFF" size="24" />
                  github
                </a>
              </div>
            </div>
            {/* 기술 스택 */}
            <div className="profile-section">
              <div className="profile-sub" id="skills">
                skills
              </div>
              {render_skills()} {/* div.skill */}
              {/* {
                                "name": "MySQL",
                                "progress": 20,
                                "color" : "#ffa81f",
                                "content": ""
                            },
                            {
                                "name": "MongoDB",
                                "progress": 20,
                                "color" : "#54b245",
                                "content": ""
                            }, */}
              <div className="skill-border"></div>
            </div>
            {/* 프로젝트 */}
            <div className="profile-section">
              <div className="profile-sub" id="project">
                <Link to={"/project"}>
                  project
                  <div className="underline"></div>
                </Link>
              </div>
              {renderProjectList()}
            </div>
            {/* 요약 */}
            <div className="profile-section">
              <div className="profile-sub" id="summary">
                summary
              </div>
              <ul className="summary-list">
                <li>
                  <span className="summary-title" onClick={openList}>
                    <div className="close"></div>Certificate
                  </span>
                  <ul>
                    <li>
                      Doc
                      <ul className="summary-sub-list">
                        <li>ITQ - 아래한글 엑셀</li>
                        <li>GTQ 1급</li>
                        <li>GTQ 인디자인 1급</li>
                      </ul>
                    </li>
                    <li>
                      Develop
                      <ul className="summary-sub-list">
                        <li>정보처리기능사 &#40;2016&#41;</li>
                        <li>웹디자인기능사 &#40;2018&#41;</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="summary-title" onClick={openList}>
                    <div className="close"></div>Education
                  </span>
                  <ul className="summary-sub-list">
                    <li>
                      세명컴퓨터고등학교 졸업
                      <ul className="normal">
                        <li>스마트 콘텐츠과</li>
                        <li>2016.03 ~ 2018.02</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="profile-section">
              {/* contact */}
              <div className="profile-sub" id="contact">
                contact
              </div>
              <div className="contact-bundle">
                <span>
                  EMAIL : <a href="mailto:biten10@naver.com">biten10@naver.com</a>
                </span>
                <a href="https://github.com/Honey-Bi" target="_blink">
                  <Github color="#068FFF" size="24" />
                  github
                </a>
              </div>
            </div>
          </div>
          <ToTop color="#fff" />
        </div>
        <div className="profile-title">profile</div>
      </div>
    </div>
  );
}
