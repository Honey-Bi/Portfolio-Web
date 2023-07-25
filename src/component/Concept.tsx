import Header from './Header';
import '../css/concept.css';
import { useCallback, useEffect, useRef, useState } from 'react';

class Ball {
    position: { x: number; y: number; }; // 위치
    vector: {x: number; y: number; }; // 속도
    speed: number; // 속력
    direction: number; // 방향
    radius: number; // 반지름
    color: string; // 색상
    constructor(
        x:number, y:number, 
        speed:number,
        direction:number,
        radius:number, 
        color:string,
    ){
        this.position = {x: x, y: y};
        this.vector = {
            x: Math.cos(direction) * speed,
            y: Math.sin(direction) * speed
        }
        this.speed = speed;
        this.direction = direction;
        this.radius = radius;
        this.color = color; 
    }
}
const opts = {
    particleAmount: window.screen.width/50 + window.screen.height/50, // 입자 개수
    defaultSpeed: 0.5, // 기본 속도
    variantSpeed: 1, // +- 속도
    defaultRadius: 4, // 기본 크기
    variantRadius: 2, // +- 크기
    linkRadius: 200, // 선 길이
    colors: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"] // 색상들
}

const balls:Array<Ball> = [];
const titles:Array<string> = [ // 타이핑 목록
    '123456789',
    'abcdefghi',
    'ABCDEFGHI',
];

export default function Concept() {    
    
    interface Size {width:number, height:number};
    const canvasRef =  useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [size, setSize] = useState<Size>({width:0, height:0});

    useEffect(() => { //context 처리
        if (canvasRef.current && canvasRef.current.width !== 0) {
            const canvas:HTMLCanvasElement = canvasRef.current;
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            const down = document.getElementById('down') as HTMLElement;
            handelResize()
            canvas.width = down.clientWidth;
            canvas.height = down.clientHeight;
            setCtx(context);
            while (balls.length < opts.particleAmount) {
                var x = Math.random() * down.clientWidth;
                var y = Math.random() * down.clientHeight;
                var s = opts.defaultSpeed + Math.random() * opts.variantSpeed;
                var d = Math.floor(Math.random() * 360);
                var r = opts.defaultRadius + Math.random() * opts.variantRadius;
                var c = opts.colors[Math.floor(Math.random() * opts.colors.length)];
                // var max = 255;
                // var min = 20;
                // var cr = 75 + Math.floor(Math.random() * (max - min) - min);
                // var cg = 75 + Math.floor(Math.random() * (max - min) - min);
                // var cb = 75 + Math.floor(Math.random() * (max - min) - min);
                // "rgb(" + cr + "," + cg + "," + cb + ")"
                balls.push(new Ball(x, y, s, d, r, c));
            }
        }
    }, [canvasRef, size.height, size.width]);

    
    const handelResize = () => { // 화면 resize 크기 저장
        const down = document.getElementById('down') as HTMLElement;
        setSize({
            width: down.clientWidth,
            height: down.clientHeight
        });
    }
    useEffect(() => { // 화면 resize 처리
        window.addEventListener('resize', handelResize);
        return () => {
            window.removeEventListener('resize', handelResize);
        }
    }, [size]);

    const collisionWall = useCallback((ball: Ball) => { // 벽 부딪힘 계산
        if (ball.position.x >= size.width || ball.position.x <= 0 ) {
            ball.vector.x *= -1;
        }
        if (ball.position.y >= size.height || ball.position.y <= 0) {
            ball.vector.y *= -1;
        }
        if (ball.position.x > size.width) ball.position.x = size.width;
        if (ball.position.y > size.height) ball.position.y = size.height;
        if (ball.position.x < 0) ball.position.x = 0;
        if (ball.position.y < 0) ball.position.y = 0;
    }, [size.height, size.width]);

    const animate = useCallback((ctx: CanvasRenderingContext2D) => { // 애니메이션 함수
        ctx.clearRect(0, 0, size.width, size.height); // 배경 삭제
        for(let i = 0; i < balls.length; i++){
            balls[i].position.x += balls[i].vector.x;
            balls[i].position.y += balls[i].vector.y;
            
            for(let j = 0; j < balls.length; j++) { //선 생성
                let distance = checkDistance(balls[i].position.x, balls[i].position.y, balls[j].position.x, balls[j].position.y);
                let opacity = 1 - distance / opts.linkRadius;
                if (opacity > 0) {
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(balls[i].position.x, balls[i].position.y);
                    ctx.lineTo(balls[j].position.x, balls[j].position.y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            // 입자 생성
            ctx.beginPath();
            ctx.arc(balls[i].position.x, balls[i].position.y, balls[i].radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = (localStorage.getItem('potion') === '0')? 'rgb(200, 200, 200)' : balls[i].color;
            ctx.fill();

            // 부딪힘 확인
            collisionWall(balls[i]);
        }
    },[collisionWall, size.height, size.width]);

    useEffect(() => { // 애니메이션 
		let requestId: number;
		const RequestAnimation = (ctx: CanvasRenderingContext2D | null) => () => {
			if (ctx) {
                animate(ctx);
            }
			// 애니메이션 콜백 반복
			requestId = window.requestAnimationFrame(RequestAnimation(ctx));
		};
        
		// 애니메이션 초기화
		requestId = window.requestAnimationFrame(RequestAnimation(ctx));
		return () => {
            window.cancelAnimationFrame(requestId);
		};
    }, [animate, ctx]);


    let checkDistance = function(x1:number, y1:number, x2:number, y2:number) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
    
    const [title, setTitle] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [add, setAdd] = useState<boolean>(true); 
    const [tIndex, setTIndex] = useState<number>(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [pp, setPP] = useState<boolean>(true);

    const typing = useCallback(() => {
        if (add) { // 타이핑 글자 생성
            setTitle(prev => prev ? prev + titles[tIndex][count] : titles[tIndex][0]);
            setCount(count + 1);
            if (count >= titles[tIndex].length - 1) {
                setAdd(false);
                setPP(false);
            }
        } else { // 타이핑 글자 삭제
            setTitle(prev => prev.slice(0, -1));
            setCount(count - 1);
            if (title.length === 0) {
                setTIndex(tIndex + 1);
                setCount(0);
                setAdd(true);
                setPP(false);
                if (tIndex >= titles.length - 1) {
                    setTIndex(0);
                }
            }
        }
    },[add, count, tIndex, title.length]);

    useEffect(() => {
        const blink = document.getElementsByClassName('blink')[0];
        if(pp) {
            blink.classList.remove('active');
            timerRef.current = setInterval(typing, 150);
        } else {
            clearInterval(timerRef.current as NodeJS.Timer)
            blink.classList.add('active');
            setTimeout(() => {
                setPP(true);
            }, 4000);
        }
        return () => clearInterval(timerRef.current as NodeJS.Timer);
    }, [pp, typing]);

    return (
        <div id='main'>
        <Header/>
        <div id="down">
            <div className="wrap">
                <div className="concept-title">{title}
                    <span className="blink">|</span>
                </div>
            </div>
            <canvas ref={canvasRef} className='concept'></canvas>
        </div>
    </div>
    )
}