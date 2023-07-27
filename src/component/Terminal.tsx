import Header from './Header';
import '../css/terminal.css';
import { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const input_list:Array<string> = [];
export default function Terminal() {

    const navigate = useNavigate ();
    const [selector, setSelector] = useState<number>(input_list.length);

    const move = (url:string):void => {
        if (url === '../main') navigate('../')
        else if (url !== './') navigate(url);
    }

    const ls:Array<string> = [
        'main',
        'profile',
        'project',
        'terminal',
        'concept',
    ];

    const handleOnSubmit = (command:string) => {
        const add_div = document.createElement('div');
        const log = document.createElement('div');
        const terminal = document.getElementsByClassName('terminal-log')[0];
        log.classList.add('input-command');
        log.textContent = '>' + command;
        terminal.appendChild(log);
        if (command.split(' ')[0] === 'cd' && ls.includes(command.split(' ')[1])) {
            move(`../${command.split(' ')[1]}`);
            return;
        }
        switch (command) {
            case 'whoami': 
                add_div.textContent = 'HyeonBi Yu / Developer';
                break;
            case 'pwd':
                add_div.textContent = document.location.href;
                break;
            case 'exit':
                move('../');
                break;
            case 'ls':
                add_div.classList.add('equal');
                for (var i of ls) {
                    const span:HTMLElement = document.createElement('span');
                    const move_url = `../${i}`;
                    span.onclick = () => move(move_url);
                    span.textContent = i;
                    span.classList.add('shift');
                    add_div.appendChild(span);
                }
                break;
            case 'cd':
                break;
            case 'contact':
                add_div.classList.add('equal');
                const a:HTMLElement = document.createElement('a');
                a.setAttribute('href', 'https://github.com/Honey-Bi');
                a.setAttribute('target', '_blank');
                a.textContent = 'github';
                const mail:HTMLElement = document.createElement('a');
                mail.setAttribute('href', 'mailto:biten10@naver.com');
                mail.textContent = 'Email'
                add_div.appendChild(a);
                add_div.appendChild(mail);
                break;
            default:
                add_div.textContent = `'${command}'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.`;
                break;
            }
        terminal.appendChild(add_div);
        if(command === 'cls') terminal.innerHTML = '';
    };

    const handleOnKeyPress = (e:BaseSyntheticEvent) => {
        const e1:KeyboardEvent = e.nativeEvent as KeyboardEvent;
        if (e1.key === 'Enter') {
            handleOnSubmit(e.target.value);
            input_list.push(e.target.value);
            setSelector(input_list.length);
            e.target.value = '';
        }
        if (e1.key === 'ArrowUp' && input_list[selector-1] !== undefined) {
            setSelector(selector - 1);
            e.target.value = input_list[selector-1]
        }
        if (e1.key === 'ArrowDown' && input_list[selector] !== undefined) {
            setSelector(selector + 1);
            e.target.value = input_list[selector]
        }
    };
    const focusCommand = () => {
        const command = document.getElementById('command') as HTMLElement;
        command.focus();
    }
    return (
        <div id="main">
            <Header/>
            <div id="down" className='terminal-flex'>
                <div className="terminal scroll" onClick={focusCommand}>
                    <div className="terminal-accent">- - - - - - - - - - - - - - - - - - - - - - - - - -</div>
                    <div className="terminal-accent">Command</div>
                    <div className="terminal-tab">whoami</div>
                    <div className="terminal-tab">pwd</div>
                    <div className="terminal-tab">exit</div>
                    <div className="terminal-tab">ls</div>
                    <div className="terminal-tab">cd</div>
                    <div className="terminal-tab">contact</div>
                    <div className="terminal-tab">cls</div>
                    <div className="terminal-accent">- - - - - - - - - - - - - - - - - - - - - - - - - -</div>
                    <div className="terminal-log">

                    </div>
                    <div className="terminal-command">
                        <span>&gt;</span>
                        <input type="text" id='command' autoComplete='off' onKeyDown={e => handleOnKeyPress(e)}/>
                    </div>
                </div>
                <div className="whoami">
                    <span>who am i</span>
                </div>
            </div>
        </div>
    )
}