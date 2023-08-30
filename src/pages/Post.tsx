import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState, useCallback } from "react";
import "css/post.css";
import ToTop from "components/ToTop";
import posts from "json/post.json";

export default function Post() {
  const navigate = useNavigate();
  const { pname } = useParams();
  const bodyRef = useRef<HTMLDivElement>(null);
  type ImgData = {
    src: string;
    type: string;
    alt: string;
    class: Array<string>;
  };
  type TextData = {
    type: string;
    content: string;
    class: Array<string>;
  };
  type LinkData = {
    type: string;
    blank: boolean;
    href: string;
    content: string;
    class: Array<string>;
  };
  type RowData = {
    type: string;
    class: Array<string>;
    body: Array<ImgData | TextData | LinkData>;
  };
  type PostData = {
    title: string;
    category: string;
    author: string;
    date: string;
    color: string;
    github: string | null;
    demo: string | null;
    body: Array<TextData | ImgData | RowData | LinkData>;
  };

  // 이미지 생성 콜백
  const add_img = useCallback((data: ImgData, body: HTMLDivElement) => {
    const img = document.createElement("img");
    img.setAttribute("src", require(`img/${data.src}`));
    img.setAttribute("alt", data.alt);
    for (let c of data.class) img.classList.add(c);
    body.appendChild(img);
  }, []);

  // 문자열 생성 콜백
  const add_text = useCallback((data: TextData, body: HTMLDivElement) => {
    const text = document.createElement("p");
    for (let c of data.class) {
      text.classList.add(c);
    }

    text.textContent = data.content;
    body.appendChild(text);
  }, []);

  // 하이퍼 링크 생성 콜백
  const add_link = useCallback((data: LinkData, body: HTMLDivElement) => {
    const a = document.createElement("a");
    for (let c of data.class) {
      a.classList.add(c);
    }
    a.setAttribute("target", data.blank ? "_blank" : "_self");
    a.setAttribute("href", data.href);
    a.textContent = data.content;
    body.appendChild(a);
  }, []);

  // 게시글 내용 생성 콜백
  const add_item = useCallback(
    (data: ImgData | TextData | RowData, body: HTMLDivElement) => {
      switch (data.type) {
        case "img":
          add_img(data as ImgData, body);
          break;
        case "text":
          add_text(data as TextData, body);
          break;
        case "row":
          const rowData = data as RowData;
          const row = document.createElement("div");
          row.classList.add("row");
          for (let c of data.class) {
            row.classList.add(c);
          }
          body.appendChild(row);
          for (let i of rowData.body) {
            add_item(i, row);
          }
          break;
        case "link":
          add_link(data as LinkData, body);
      }
    },
    [add_img, add_link, add_text]
  );

  // 게시글 내용 데이터
  const [data, setData] = useState<PostData | null>(null);

  useEffect(() => {
    if (pname === undefined) return navigate("/404");
    setData(posts[Number(pname)]);
    if (bodyRef.current && data) {
      const body = bodyRef.current;
      body.textContent = "";
      for (var i of data.body) {
        add_item(i, body);
      }
    }
  }, [add_item, bodyRef, data, navigate, pname]);

  const project_enter: Element | null =
    document.getElementsByClassName("project-enter")[0];
  if (project_enter) project_enter.remove();

  const isDark: String | null = localStorage.getItem("isDark");
  const root = document.getElementById("root");
  if (root !== null && isDark === "on") root.classList.add("dark");

  // 푸터 렌더링 함수
  function renderFoot(): JSX.Element {
    let result = [];
    if (data === null) return <></>;
    if (data.demo) {
      result.push(
        <a href={data.demo} key={data.demo} target="_blank" rel="noopener noreferrer">
          DEMO - {data.demo}
        </a>
      );
    }
    if (data.github) {
      result.push(
        <a href={data.github} key={data.github} target="_blank" rel="noopener noreferrer">
          Github - {data.github}
        </a>
      );
    }
    return <div className="post-foot">{result}</div>;
  }

  return (
    <div
      id="main"
      className="not-dark scroll"
      style={{
        backgroundColor: data ? data.color : "#fff",
      }}
    >
      <div id="top"></div>
      <div
        className="project-nav"
        style={{
          backgroundColor: data ? data.color : "#fff",
        }}
      >
        <Link to={"/"} className="project-home" />
        <span className="project-exit" onClick={(e) => navigate(-1)}></span>
      </div>
      <div className="container post-transition">
        <div className="post">
          <div className="post-head">
            <div className="post-title">{data ? data.title : ""}</div>
            <div className="post-sub">
              <div className="post-category">
                {data ? data.category : ""} / {data ? data.author : ""}
              </div>
              <div className="post-date">{data ? data.date : ""}</div>
            </div>
          </div>
          <div className="post-body" ref={bodyRef}></div>
          {renderFoot()}
        </div>
        <ToTop color="#fff" />
      </div>
    </div>
  );
}
