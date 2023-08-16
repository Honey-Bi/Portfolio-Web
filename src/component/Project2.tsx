import Header from './Header';
import style from 'css/project2.module.css';
import posts from'json/post.json';

function Project2() {
    // const render_project_list = ():JSX.Element => {
    //     let result = [];
    //     let row = [];
    //     let count = 0;
    //     for (var i of Object.values(posts)) {
    //         const src = Object.keys(posts)[count];
    //         if (count % 2 === 0) row= [];
    //         row.push(
    //             <div key={src} className={style.project} style={{backgroundColor: i.color}}>
    //                 <div className={style.record}>
    //                     <div className={style.innerRound}></div>
    //                 </div>
    //                 <div className={style.record_shadow}></div>
    //                 <div style={{color: i.tColor}} className={style.project_date}>{i.date}</div>
    //                 <div style={{color: i.tColor}} className={style.project_title}>{i.title}</div>
    //                 <div style={{color: i.tColor}} className={style.project_category}>{i.category}</div>
    //             </div>
    //         );
    //         if (count % 2 === 0) {
    //             result.push(<div key={count} className={style.row}>{row}</div>)
    //         }
    //         count++;
    //     }
    //     return (
    //         <div className={`project-list ${style.project_list}`}>
    //             {result}
    //         </div>
    //     );
    // }

    return (
        <div id="main">
            <Header />
            <div id="down" className="down-height scroll">
                {/* {render_project_list()} */}
            </div>
            <div className="project-title">
                project
            </div>
        </div>
    )
}
export default Project2;