/* ============================================================
   GHOST CHANNEL — HOME PAGE LOGIC
   代码矩阵（铺满 + 暗色/呼吸光） · 车票撕裂 · 打印机
   ============================================================ */
(function () {

    /* ---------- DOM ---------- */
    const ticket       = document.getElementById('main-ticket');
    const matrixBg     = document.getElementById('matrix-bg');
    const scene        = document.getElementById('scene-container');
    const led          = document.getElementById('printer-led');
    const printContent = document.getElementById('printContent');
    const navBurger    = document.getElementById('navBurger');
    const mobileMenu   = document.getElementById('mobileMenu');

    /* ---------- 导航栏汉堡按钮 ---------- */
    navBurger.addEventListener('click', function () {
        navBurger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    /* ---------- 随机出发地 ---------- */
    const locations = [
        'REALITY', 'YESTERDAY', 'SANITY', 'COMFORT ZONE',
        'DAYLIGHT', 'SILENCE', 'ORDINARY', 'SAFETY',
        'CERTAINTY', 'CONSCIOUSNESS', 'THE SURFACE',
        'A DREAM', 'PAGE 1', 'SECTOR 7G', 'DIMENSION C-137'
    ];
    document.getElementById('randomFrom').textContent =
        locations[Math.floor(Math.random() * locations.length)];
    document.getElementById('currentDate').textContent =
        new Date().toLocaleDateString('zh-CN').replace(/\//g, '.');
    document.getElementById('ticketNum').textContent =
        String(Math.floor(Math.random() * 9000) + 1000);

    /* ==========================================================
       代码矩阵  —  铺满全屏
       大部分为暗色（class="dark"），
       随机 ~15% 带呼吸红光（class="breathe"）且 delay 随机错开
       ========================================================== */
    const snippets = [
        '// no hello world',
        'if(!welcome){',
        '  return void;',
        '}',
        'console.log("sorry");',
        '// no welcome...?',
        'throw "thank you!!";',
        '// just kidding!',
        'let ghost = null;',
        'const void_channel = 404;',
        'while(true){ dream(); }',
        'import { darkness }',
        'export default ghost;',
        'fn main() { loop {} }',
        '0xDEAD',
        '♫ ♪ ♩ ♬',
        'async fn haunt() {}',
        '// TODO: exist',
        'print("who r u?")',
        'rm -rf /reality',
        'SELECT * FROM void',
        'ping nowhere',
        '> CONNECTION LOST',
        'ERR_NOT_FOUND',
        'segfault at 0x0',
        '#include <ghost.h>',
        'mov eax, 0xGHOST',
        '// are you still here?',
        'System.exit(404);',
        'undefined is not a function',
        'NullPointerException',
        '// welcome to the void',
        'git commit -m "lost"',
        'sudo rm -rf /',
        'kill -9 reality',
        'chmod 000 sanity',
        '#!/bin/bash',
        'echo "nowhere"',
        'cat /dev/null',
        'dd if=/dev/zero',
        'curl nowhere.void',
        'ssh ghost@channel',
        'nc -l 404',
        'telnet void.net',
        '> SIGNAL LOST',
        'FATAL ERROR',
        'CORE DUMPED',
        'STACK OVERFLOW',
        'MEMORY LEAK',
        'RACE CONDITION',
        '// end of transmission'
    ];

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const columnWidth = 120; // 每列宽度
    const columnCount = Math.ceil(viewportWidth / columnWidth);

    for (let col = 0; col < columnCount; col++) {
        const column = document.createElement('div');
        column.className = 'code-col';
        column.style.left = `${col * columnWidth}px`;
        column.style.width = `${columnWidth}px`;

        // 每列随机行数（铺满屏幕）
        const linesCount = Math.floor(viewportHeight / 18) + Math.floor(Math.random() * 5);

        for (let row = 0; row < linesCount; row++) {
            const unit = document.createElement('div');
            unit.className = 'code-unit';
            unit.textContent = snippets[Math.floor(Math.random() * snippets.length)];

            // 随机决定：85% 暗色，15% 呼吸红光
            if (Math.random() < 0.85) {
                unit.classList.add('dark');
                // 扫描动画延迟（车票撕裂后触发）
                unit.style.animationDelay = `${col * 0.06}s`;
            } else {
                unit.classList.add('breathe');
                // 呼吸动画随机延迟，让它们不同步
                unit.style.animationDelay = `${Math.random() * 3}s`;
            }

            column.appendChild(unit);
        }

        matrixBg.appendChild(column);
    }

    /* ==========================================================
       音波动画 Canvas
       ========================================================== */
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    function drawWaveform() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerY = canvas.height / 2;
        const amplitude = 60;
        const frequency = 0.02;
        const speed = 0.05;

        // 绘制多层音波
        for (let layer = 0; layer < 3; layer++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 0, 60, ${0.4 - layer * 0.12})`;
            ctx.lineWidth = 2 - layer * 0.3;

            for (let x = 0; x < canvas.width; x++) {
                const y = centerY +
                    Math.sin((x + time + layer * 50) * frequency) * amplitude * (1 - layer * 0.3) +
                    Math.sin((x + time * 1.5 + layer * 30) * frequency * 2) * (amplitude / 2) * (1 - layer * 0.3);

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
        }

        // 随机音符装饰
        if (Math.random() > 0.97) {
            ctx.fillStyle = 'rgba(255, 0, 60, 0.5)';
            ctx.font = '18px Arial';
            const notes = ['♪', '♫', '♩', '♬'];
            ctx.fillText(
                notes[Math.floor(Math.random() * notes.length)],
                Math.random() * canvas.width,
                Math.random() * canvas.height
            );
        }

        time += speed;
        animationId = requestAnimationFrame(drawWaveform);
    }

    drawWaveform();

    /* ==========================================================
       打印内容
       ========================================================== */
    const printerText = `
╔════════════════════════════╗
║   GHOST CHANNEL v1.0       ║
║   SYSTEM INITIALIZED       ║
╚════════════════════════════╝

> Connecting...
> Operator: shadow玉元一
> Date: ${new Date().toLocaleDateString('zh-CN')}
> Status: ONLINE
> Mode: CREATIVE

━━━━━━━━━━━━━━━━━━━━━━━━━━━

WELCOME TO THE VOID

This is not a portfolio.
This is not a gallery.
This is a channel between
worlds that shouldn't exist.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT YOU'LL FIND HERE:

→ Characters from the dark
→ Visual experiments
→ Vibe coding artifacts
→ Preset collections
→ Plugin creations
→ Links to nowhere

━━━━━━━━━━━━━━━━━━━━━━━━━━━

WARNING:
No hello world here.
No welcome messages.
Just... thank you for coming.

(Just kidding. Or am I?)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

LATEST UPDATE:
Still creating something...?
The ghosts are restless.
The code is alive.

████████████████████ 100%

> READY TO EXPLORE
> [SCROLL DOWN TO CONTINUE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ghost_channel © 2024
"The middle of nowhere"
`;

    /* ==========================================================
       主交互逻辑 — 车票撕裂 → 代码扫描 → 打印机
       ========================================================== */
    let isActivated = false;

    ticket.addEventListener('click', function () {
        if (isActivated) return;
        isActivated = true;

        // 停止音波动画
        cancelAnimationFrame(animationId);

        // 步骤1: 撕裂车票
        ticket.classList.add('torn');
        ticket.style.pointerEvents = 'none';

        // 步骤2: 触发代码矩阵扫描动画（400ms后）
        setTimeout(() => {
            matrixBg.classList.add('scanning');
        }, 400);

        // 步骤3: 弹出打印机（1500ms后）
        setTimeout(() => {
            scene.classList.add('show-printer');

            // LED 指示灯激活
            setTimeout(() => {
                led.classList.add('active');
            }, 800);
        }, 1500);

        // 步骤4: 开始打印（3000ms后）
        setTimeout(() => {
            scene.classList.add('printing');
            typewriterEffect(printerText, printContent, 15);
        }, 3000);
    });

    /* ==========================================================
       打字机效果
       ========================================================== */
    function typewriterEffect(text, element, speed) {
        let index = 0;
        element.textContent = '';

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                
                // 滚动到底部（模拟纸张吐出）
                element.scrollTop = element.scrollHeight;
                
                setTimeout(type, speed);
            }
        }

        type();
    }

    /* ==========================================================
       导航栏滚动隐藏（可选）
       ========================================================== */
    let lastScroll = 0;
    const nav = document.getElementById('ghostNav');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 80) {
            // 向下滚动 - 隐藏导航栏
            nav.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动 - 显示导航栏
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

})();

