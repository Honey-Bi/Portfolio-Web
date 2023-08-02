
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState, useCallback } from 'react';
import 'css/post.css'
import ToTop from "./ToTop";
import posts from'post.json';

export default function Post() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pname } = useParams();
    const bodyRef = useRef<HTMLDivElement>(null);
    type ImgData = {
        src: string;
        type: string;
        alt: string;
        class: Array<string>;
    }
    type TextData = {
        type: string;
        bold: boolean;
        link: boolean;
        href: string;
        content: string;
        class: Array<string>;
    }
    type RowData = {
        type: string;
        class: Array<string>;
        body: Array<ImgData|TextData>;
    }
    type PostData = {
        title: string;
        category: string;
        author: string;
        date: string;
        color: string;
        tColor: string;
        body: Array<TextData|ImgData|RowData>;
    }

    const add_img = useCallback((data:ImgData, body:HTMLDivElement) => {
        const img = document.createElement('img');
        img.setAttribute('src',  require(`img/${data.src}`));
        img.setAttribute('alt', data.alt);
        for (let c of data.class) img.classList.add(c);
        body.appendChild(img);
    }, []);
    const add_text = useCallback((data:TextData, body:HTMLDivElement) => {
        let text:Element;
        if (data.link) { //하이퍼 링크 생성
            text = document.createElement('a');
            text.setAttribute('href', data.href);
            text.setAttribute('target', '_blank');
        } else if (data.bold) {
            text = document.createElement('b');
        } else {
            text = document.createElement('p');
        }
        for (let c of data.class) {text.classList.add(c)};
        
        text.textContent = data.content;
        body.appendChild(text);
    }, []);

    const add_item = useCallback((data:ImgData|TextData|RowData, body:HTMLDivElement) => {
        switch (data.type) {
            case "img":
                add_img(data as ImgData, body);
                break;
            case "text":
                add_text(data as TextData, body);
                break;
            case "row":
                const rowData = data as RowData;
                const row = document.createElement('div');
                row.classList.add('row');
                for (let c of data.class) {row.classList.add(c)};
                body.appendChild(row);
                for(let i of rowData.body) {
                    add_item(i, row);
                }
                break;
        }
    }, [add_img, add_text])

    const [data, setData] = useState<PostData|null>(null);
    const color:string = (location.state) ? location.state.color : data?.color;
    useEffect(() => {
        if (pname === undefined || !Object.keys(posts).includes(pname)) return navigate('/404');
        setData(Object.values(posts)[Object.keys(posts).indexOf(pname)]);
        if (bodyRef.current && data) {
            const body = bodyRef.current;
            body.textContent = '';
            for (var i of data.body) {
                add_item(i, body);
            }
        }
    }, [add_item, bodyRef, data, navigate, pname]);

    const getTitle = ():string => {
        if (data) return data.title;
        return '';
    };
    const getCategory = ():string => {
        if (data) return data.category;
        return '';
    };
    const getAuthor = ():string => {
        if (data) return data.author;
        return '';
    };
    const getPostDate = ():string  => {
        if (data) return data.date;
        return '';
    }

    const project_enter:Element|null = document.getElementsByClassName('project-enter')[0];
    if (project_enter) project_enter.remove();
    
    const isDark:String|null = localStorage.getItem('isDark');
    const root = document.getElementById('root');
    if (root !== null && isDark === 'on') root.classList.add('dark');

    return(
        <div 
            id="main" className="not-dark scroll"
            style={{
                backgroundColor: color
            }}
        >
            <div id="top"></div>
            <div className="project-nav"
            style={{
                backgroundColor: color
            }}>
                <Link to={"/"} className="project-home" />
                <span className="project-exit" onClick={e => navigate(-1)}></span>
                {/* <Link to={"/project"} className="project-exit" /> */}
            </div>
            <div className="container post-transition"> 
                <div className="post">
                    <div className="post-title">
                        { getTitle() }
                    </div>
                    <div className="post-sub">
                        <div className="post-category">
                            { getCategory() } / { getAuthor() }
                        </div>
                        <div className="post-date">
                            { getPostDate() }
                        </div>
                    </div>
                    <div className="post-body" ref={bodyRef}>
                    </div>
                </div>
                <ToTop color='#fff'/>
            </div>
        </div>
    )
}