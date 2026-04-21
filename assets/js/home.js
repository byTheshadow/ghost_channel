// Ghost Channel - 主界面交互逻辑
(function() {
    // ==================== 初始化 ====================
    const ticket = document.getElementById('main-ticket');
    const matrixBg = document.getElementById('matrix-bg');
    const scene = document.getElementById('scene-container');
    const printer = document.getElementById('printer');
    const led = document.getElementById('printer-led');
    const paper = document.getElementById('paper');
    const printContent = document.getElementById('printContent');
    
    // 随机出发地列表
    const randomLocations = [
        'REALITY', 'YESTERDAY', 'SANITY', 'COMFORT ZONE',
        'DAYLIGHT', 'SILENCE', 'ORDINARY', 'SAFETY',
        'CERTAINTY', 'CONSCIOUSNESS', 'THE SURFACE'
    ];
    
    // 打印内容
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

    // ==================== 音波动画 ====================
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
            ctx.strokeStyle = `rgba(255, 0, 60, ${0.3 - layer * 0.1})`;
            ctx.lineWidth = 2;
            
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
        
        // 绘制音符装饰
        if (Math.random() > 0.95) {
            ctx.fillStyle = 'rgba(255, 0, 60, 0.6)';
            ctx.font = '20px Arial';
            ctx.fillText('♪', Math.random() * canvas.width, Math.random() * canvas.height);
        }
        
        time += speed;
        animationId = requestAnimationFrame(drawWaveform);
    }
    
    drawWaveform();
    
    // ==================== 初始化车票信息 ====================
    document.getElementById('randomFrom').textContent = 
        randomLocations[Math.floor(Math.random() * randomLocations.length)];
    document.getElementById('currentDate').textContent = 
        new Date().toLocaleDateString('zh-CN').replace(/\//g, '.');
    
    // ==================== 代码矩阵生成 ====================
    const codeSnippets = [
        'no hello world', 'VOID', '0x404', 'ERROR', 'GHOST',
        '♫', '♪', 'SYNC', 'CORE', 'SCAN', 'TECH', 'NULL',
        'no welcome', 'sorry', 'thank you', 'just kidding',
        'const ghost', 'let void', 'return null', '// ???'
    ];
    
    for (let col = 0; col < 25; col++) {
        const column = document.createElement('div');
        column.className = 'code-col';
        
        const linesCount = Math.floor(Math.random() * 15) + 10;
        for (let row = 0; row < linesCount; row++) {
            const unit = document.createElement('div');
            unit.className = 'code-unit';
            unit.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            unit.style.animationDelay = `${col * 0.08}s`;
            column.appendChild(unit);
        }
        
        matrixBg.appendChild(column);
    }
    
    // ==================== 主交互逻辑 ====================
    let isActivated = false;
    
    ticket.addEventListener('click', function() {
        if (isActivated) return;
        isActivated = true;
        
        // 停止音波动画
        cancelAnimationFrame(animationId);
        
        // 步骤1: 撕裂车票
        ticket.classList.add('torn');
        ticket.style.pointerEvents = 'none';
        
        // 步骤2: 唤醒代码矩阵 (400ms后)
        setTimeout(() => {
            matrixBg.style.opacity = '1';
            matrixBg.classList.add('scanning');
        }, 400);
        
        // 步骤3: 弹出打印机 (1500ms后)
        setTimeout(() => {
            scene.classList.add('show-printer');
            
            // LED 指示灯激活
            setTimeout(() => {
                led.classList.add('active');
            }, 800);
        }, 1500);
        
        // 步骤4: 开始打印 (3000ms后)
        setTimeout(() => {
            scene.classList.add('printing');
            typewriterEffect(printerText, printContent, 20);
        }, 3000);
    });
    
    // ==================== 打字机效果 ====================
    function typewriterEffect(text, element, speed) {
        let index = 0;
        element.textContent = '';
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
})();
