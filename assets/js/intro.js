/* ============================================
   INTRO.JS — 开屏动画完整逻辑
   区块 J1
   ============================================ */

(function () {
    'use strict';

    const introScreen = document.getElementById('intro-screen');
    const mainScreen  = document.getElementById('main-screen');
    const gridCanvas  = document.getElementById('grid-canvas');
    const ghost       = document.getElementById('ghost');
    const ghostScene  = document.getElementById('ghost-scene');
    const dots        = document.querySelectorAll('.pac-dot');
    const glitch404   = document.getElementById('glitch-404');
    const bubble1     = document.getElementById('bubble-1');
    const bubble2     = document.getElementById('bubble-2');
    const ghostWelcome = document.getElementById('ghost-welcome');
    const skipBtn     = document.getElementById('skip-btn');

    let introTimeline = [];
    let isSkipped = false;

    /* -------- 8bit网格绘制 -------- */
    function drawGrid() {
        const ctx = gridCanvas.getContext('2d');
        const w = gridCanvas.width = window.innerWidth;
        const h = gridCanvas.height = window.innerHeight;
        const cellSize = 40;

        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(115, 12, 30, 0.12)';
        ctx.lineWidth = 0.5;

        for (let x = 0; x <= w; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y <= h; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }

    /* -------- 调度器 -------- */
    function schedule(delay, fn) {
        const id = setTimeout(() => {
            if (!isSkipped) fn();
        }, delay);
        introTimeline.push(id);
        return id;
    }

    /* -------- 阶段1: 黑屏→网格亮起 (0~3s) -------- */
    function phase1() {
        drawGrid();
        schedule(500, () => {
            gridCanvas.classList.add('visible');
        });
    }

    /* -------- 阶段2: 幽灵吃豆 (3~6s) -------- */
    function phase2() {
        schedule(3000, () => {
            ghost.classList.add('moving');

            // 计算每个豆豆被吃掉的时间
            const totalDuration = 4000; // 幽灵移动总时间
            const trackLeft = window.innerWidth * 0.1;
            const trackWidth = window.innerWidth * 0.8;

            /* ====== 区块 J1-2: intro.js 续 ====== */

            dots.forEach((dot, i) => {
                const dotPos = trackLeft + (trackWidth / (dots.length - 1)) * i;
                const fraction = (dotPos + 80) / (window.innerWidth + 160);
                const eatTime = fraction * totalDuration;

                schedule(3000 + eatTime, () => {
                    dot.classList.add('eaten');
                });
            });
        });
    }

    /* -------- 阶段3: 屏幕闪烁 + 404 (6~8s) -------- */
    function phase3() {
        schedule(6000, () => {
            // 隐藏幽灵场景
            ghostScene.style.opacity = '0';
            ghostScene.style.transition = 'opacity 0.3s';

            // 屏幕闪烁
            introScreen.style.animation = 'screenFlicker 1.5s ease';

            schedule(6800, () => {
                introScreen.style.animation = '';
            });

            // 显示404
            schedule(6500, () => {
                glitch404.classList.remove('hidden');
            });
        });
    }

    /* -------- 阶段4: 气泡框 "wait... really?" (8~10s) -------- */
    function phase4() {
        schedule(8000, () => {
            // 隐藏404
            glitch404.style.animation = 'pixelCollapse 0.5s ease forwards';

            schedule(8500, () => {
                glitch404.classList.add('hidden');
                glitch404.style.animation = '';

                // 弹出气泡1
                bubble1.classList.remove('hidden');
                bubble1.classList.add('pop-in');
            });

            // 颤抖
            schedule(9300, () => {
                bubble1.classList.add('shaking');
            });
        });
    }

    /* -------- 阶段5: 气泡碎裂 → 欢迎语 (10~13s) -------- */
    function phase5() {
        schedule(10000, () => {
            // 碎裂气泡1
            bubble1.classList.remove('shaking');
            bubble1.classList.add('shatter');

            schedule(10600, () => {
                bubble1.classList.add('hidden');
                bubble1.classList.remove('shatter', 'pop-in');

                // 弹出气泡2
                bubble2.classList.remove('hidden');
                bubble2.classList.add('pop-in');

                // 显示欢迎幽灵
                ghostWelcome.classList.remove('hidden');
                ghostWelcome.classList.add('visible');
            });
        });
    }

    /* -------- 阶段6: 过渡到主界面 (13~15s) -------- */
    function phase6() {
        schedule(13000, () => {
            // 全屏噪点闪烁过渡
            const transitionOverlay = document.createElement('div');
            transitionOverlay.style.cssText = `
                position: fixed;
                top: -50%; left: -50%;
                width: 200%; height: 200%;
                z-index: 10005;
                pointer-events: none;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                animation: noiseExplosion 1.5s ease forwards, grain 0.2s steps(1) infinite;
            `;
            document.body.appendChild(transitionOverlay);

            schedule(13800, () => {
                enterMainScreen();
                schedule(14500, () => {
                    transitionOverlay.remove();
                });
            });
        });
    }

    /* -------- 进入主界面 -------- */
    function enterMainScreen() {
        introScreen.style.transition = 'opacity 0.5s ease';
        introScreen.style.opacity = '0';

        setTimeout(() => {
            introScreen.style.display = 'none';
            mainScreen.classList.remove('hidden');

            // 触发纸张和打印机动画
            requestAnimationFrame(() => {
                mainScreen.classList.add('visible');
                // 启动打印机效果
                if (typeof startPrinter === 'function') {
                    setTimeout(startPrinter, 800);
                }
                // 启动聚光灯
                if (typeof initSpotlight === 'function') {
                    initSpotlight();
                }
                // 绘制乐谱背景线
                drawStaffLines();
            });
        }, 500);

        // 隐藏skip按钮
        skipBtn.style.display = 'none';
    }

    /* -------- 绘制乐谱线 -------- */
    function drawStaffLines() {
        const svg = document.getElementById('staff-lines');
        if (!svg) return;
        const h = window.innerHeight;
        const w = window.innerWidth;
        let lines = '';
        const groups = 4;
        const linesPerGroup = 5;
        const groupGap = h / (groups + 1);

        for (let g = 0; g < groups; g++) {
            const baseY = groupGap * (g + 1) - 30;
            for (let l = 0; l < linesPerGroup; l++) {
                const y = baseY + l * 12;
                lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="rgba(115,12,30,0.06)" stroke-width="0.5"/>`;
            }
        }
        svg.innerHTML = lines;
    }

    /* -------- Skip -------- */
    window.skipIntro = function () {
        isSkipped = true;
        introTimeline.forEach(clearTimeout);
        introTimeline = [];
        enterMainScreen();
    };

    /* -------- 启动 -------- */
    function startIntro() {
        phase1();
        phase2();
        phase3();
        phase4();
        phase5();
        phase6();
    }

    // 检查是否需要跳过（例如从其他页面返回）
    const shouldSkip = sessionStorage.getItem('ghost_intro_seen');
    if (shouldSkip) {
        skipIntro();
    } else {
        startIntro();
        sessionStorage.setItem('ghost_intro_seen', '1');
    }

    // 窗口大小变化时重绘
    window.addEventListener('resize', () => {
        if (gridCanvas && introScreen.style.display !== 'none') {
            drawGrid();
        }
        drawStaffLines();
    });

})();

/* ====== 区块 J1-2 结束 ====== */
