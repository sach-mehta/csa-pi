import React, { useEffect } from 'react';
import './pi.css';

let zzfx,zzfxV,zzfxX

// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.8 ~ 884 bytes minified
zzfxV=.3    // volume
zzfx=       // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let
M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0
,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+
r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1)
,-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:
-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/
2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)
+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.
getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination
);b.start();return b};zzfxX=new (window.AudioContext||webkitAudioContext) // audio context

const Pi = () => {
    let ctx;
    let dialog;
    let scoreSpan;
    let resetBtn;
    let startBtn;
    const getElements = () => {
        // Get elements
        dialog = document.getElementById('dialog');
        scoreSpan = document.getElementById('score');
        resetBtn = document.getElementById('reset');
        startBtn = document.getElementById('start');
    };

    // Hangman
    const canvas = () => {
        const piCanvas = document.querySelector('canvas');
        ctx = piCanvas.getContext('2d');
        piCanvas.width = piCanvas.height = 400;
    };

    const degreesToRad = ang => ang * (Math.PI / 180);

    // -----------------------------
    // 	SFX & Music
    // -----------------------------
    // sfx from: https://github.com/KilledByAPixel/ZzFX
    // music from: https://www.fesliyanstudios.com/
    const sfx = [, , 925, .04, .3, .6, 1, .3, , 6.27, -184, .09, .17];
    const audio = new Audio('https://assets.codepen.io/539557/2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3');

    // -----------------------------
    // 	Config
    // -----------------------------

    const keys = {};
    const r = 190;
    let score, highscore;
    let collision = false;
    const gameDur = 60000; // 1 min
    const pi_600_decimals =
        "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132";

    // -----------------------------
    //		Character
    // -----------------------------

    const piGuy = {
        x: 190, // initial x pos
        y: 100, // initial y pos
        w: 30, // width
        h: 30, // height
        velY: 0, // velocity X
        velX: 0, // velocity Y
        speed: 2, // Speed multiplier
        friction: 0.75
    };

    // -----------------------------
    // 	Detector
    // -----------------------------

    const detector = {
        ang: 90,
        arc: 30,
        s: degreesToRad(90 - 30 / 2),
        e: degreesToRad(90 + 30 / 2)
    };

    const update = dt => {
        // movement	
        if (keys.ArrowUp) {
            if (piGuy.velY > -piGuy.speed) {
                piGuy.velY--;
            }
        }
        if (keys.ArrowDown) {
            if (piGuy.velY < piGuy.speed) {
                piGuy.velY++;
            }
        }
        if (keys.ArrowRight) {
            if (piGuy.velX < piGuy.speed) {
                piGuy.velX++;
            }
        }
        if (keys.ArrowLeft) {
            if (piGuy.velX > -piGuy.speed) {
                piGuy.velX--;
            }
        }
        // piGuy Velocity
        piGuy.velY *= piGuy.friction;
        piGuy.velX *= piGuy.friction;
        // vectors of piGuy
        let v = [
            [piGuy.x, piGuy.y], // top left 
            [piGuy.x + piGuy.w, piGuy.y], // top right
            [piGuy.x + piGuy.w, piGuy.y + piGuy.h], // bottom right
            [piGuy.x, piGuy.y + piGuy.h] // bottom left
        ];
        // Move piGuy within bounds
        if (piGuy.velX < 0 && inCircle(...v[0]) && inCircle(...v[3])) {
            piGuy.x += piGuy.velX;
        } else if (piGuy.velX > 0 && inCircle(...v[1]) && inCircle(...v[2])) {
            piGuy.x += piGuy.velX;
        }
        if (piGuy.velY < 0 && inCircle(...v[0]) && inCircle(...v[1])) {
            piGuy.y += piGuy.velY;
        } else if (piGuy.velY > 0 && inCircle(...v[2]) && inCircle(...v[3])) {
            piGuy.y += piGuy.velY;
        }
        // Detector position
        detector.s = degreesToRad(detector.ang - detector.arc / 2);
        detector.e = degreesToRad(detector.ang + detector.arc / 2);
        // Detector Size 	
        detector.arc = 30 + (330 * dt);
        // direction & speed
        if (dt < 0.33) {
            detector.ang += 1;
        } else if (dt < 0.66) {
            detector.ang -= 1.2;
            piGuy.speed = 2.2;
        } else if (dt < 1) {
            detector.ang += 1.4;
            piGuy.speed = 2.4;
        }
        // draw 	
        draw();
        // collision detection
        let arcPoints = [
            [200, 200, Math.cos(detector.s) * r + 200, Math.sin(detector.s) * r + 200],
            [200, 200, Math.cos(detector.e) * r + 200, Math.sin(detector.e) * r + 200],
        ];
        collision = detectCollision(v, arcPoints);
        collision && GAME_OVER();
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Arena
        ctx.beginPath();
        ctx.arc(200, 200, 190, 0, 2 * Math.PI);
        ctx.strokeStyle = '#461877';
        ctx.lineWidth = 6;
        ctx.fillStyle = '#321155';
        ctx.fill();
        ctx.stroke();
        // Detector
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 187, detector.s, detector.e);
        ctx.lineTo(200, 200);
        ctx.fillStyle = '#EF476F';
        ctx.fill();
        // PI Guy
        ctx.beginPath();
        ctx.rect(piGuy.x, piGuy.y, 30, 10);
        ctx.rect(piGuy.x + 4, piGuy.y + 10, 8, 20);
        ctx.rect(piGuy.x + 18, piGuy.y + 10, 8, 16);
        ctx.rect(piGuy.x + 22, piGuy.y + 22, 8, 8);
        ctx.fillStyle = '#fcc74c';
        ctx.fill();
    };

    // -----------------------------
    // 	Play
    // -----------------------------
    const play = (duration) => {
        let start = performance.now();
        let secs = '-0';
        let i = 1;
        requestAnimationFrame(function play(time) {
            let ms = time - start;
            let progress = ms / duration;
            if (progress > 1) progress = 1;
            // keeping score
            if (secs !== (ms / 1000).toFixed(0)) {
                secs = (ms / 1000).toFixed(0);
                i += Number.parseInt(secs / 3);
                score = i;
            }
            // update
            update(progress);
            // step		
            if (progress < 1 && !collision) requestAnimationFrame(play);
        });
    }

    // -----------------------------
    // 	Reset
    // -----------------------------

    const resetScene = () => {
        score = 0;
        collision = false;
        piGuy.x = 190;
        piGuy.y = 100;
        piGuy.velX = 0;
        piGuy.velY = 0;
        piGuy.speed = 2;
        detector.ang = 90;
        detector.arc = 30;
        detector.s = degreesToRad(90 - 30 / 2);
        detector.e = degreesToRad(90 - 30 / 2);
        draw();
    }

    const GAME_OVER = () => {
        if (score > highscore || highscore === undefined) {
            dialog.classList.add('ishighscore');
            highscore = score;
        }
        !audio.muted && zzfx(...sfx);
        scoreSpan.textContent = `3.${pi_600_decimals.substr(0, score)}`;
        setTimeout(() => {
            dialog.showModal();
        }, 250);
        resetBtn.addEventListener('click', e => {
            dialog.close();
            resetScene();
            startBtn.classList.remove('hide');
            dialog.classList.remove('ishighscore');
        });
    }

    // -----------------------------
    // 	Events
    // -----------------------------

    // -----------------------------
    // 	Collision detection
    // -----------------------------

    const inCircle = (x1, y1, x0 = 200, y0 = 200, r = 190) => {
        // test coordinates (x1,y1), center of circle (x0,y0), radius (r)
        return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < r;
    }

    const detectCollision = (c, a) => {
        // check each character line against both arc lines
        for (let i = 0; i < c.length; i += 2) {
            for (let j = c.length - 1; j > 0; j -= 2) {
                if (intersect(...c[i], ...c[j], ...a[0]) ||
                    intersect(...c[i], ...c[j], ...a[1])) {
                    return true;
                }
            }
        }
        return false;
    }

    // Source: Paul Bourke
    // http://paulbourke.net/geometry/pointlineplane/
    const intersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
        // Check if none of the lines are of length 0
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            return false
        }
        const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        // Lines are parallel
        if (denominator === 0) {
            return false
        }
        let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
        let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false
        }
        // Return a object with the x and y coordinates of the intersection
        let x = x1 + ua * (x2 - x1)
        let y = y1 + ua * (y2 - y1)
        return { x, y }
    }

    const init = () => {
        document.addEventListener('keydown', function (e) {
            if (e.key.match(/(Arrow)/gi)) {
                e.preventDefault();
                keys[e.key] = true;
            }
        });
        document.addEventListener('keyup', function (e) {
            if (e.key.match(/(Arrow)/gi)) {
                e.preventDefault();
                keys[e.key] = false;
            }
        });
        document.getElementById('start').addEventListener('click', function (e) {
            e.target.classList.add('hide');
            play(gameDur);
        });
        document.getElementById('mute').addEventListener('change', function (e) {
            audio.muted = !audio.muted;
        });

        audio.volume = 0.1;
        audio.loop = true;
        audio.oncanplaythrough = audio.play();
    };

    useEffect(() => {
        getElements();
        canvas();
        resetScene();
        init();
    }, []);

    return (
        <div className="wrapper">
            <div className="game"><canvas></canvas><button id="start">START</button></div>
            <dialog id="dialog">
                <div className="inner">
                    <div>
                        <h2>Game Over</h2>
                        <p>Your score:</p><span className="score" id="score"></span><span className="highscore">New Highscore!</span>
                    </div><button id="reset">PLAY AGAIN</button>
                </div>
            </dialog><label className="mute"><input id="mute" type="checkbox" /><i className="fa-solid fa-volume-high"></i><i className="fa-solid fa-volume-xmark"></i></label>
        </div>
    );
};

export default Pi;
