// ========== Home 页面交互 ==========

// ========== 车票阶段 ==========
const ticketStage = document.getElementById('ticketStage');
const ticket = document.getElementById('ticket');
const ticketRight = document.getElementById('ticketRight');
const waveCanvas = document.getElementById('waveCanvas');
const ctx = waveCanvas.getContext('2d');

// 设置 Canvas 尺寸
function resizeCanvas() {
    waveCanvas.width = waveCanvas.offsetWidth;
    waveCanvas.height = waveCanvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 音波动画
let time = 0;
const musicNotes = ['♪', '♫', '♬', '♩'];
const notes = [];

function drawWave() {
    ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    
    const centerY = waveCanvas.height / 2;
    const amplitude = 30;
    const frequency = 0.02;
    
    // 绘制多层波浪
    for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 0, 60, ${0.3 - layer * 0.1})`;
        ctx.lineWidth = 2;
        
        for (let x = 0; x < waveCanvas.width; x++) {
            const y = centerY + Math.sin(x * frequency + time + layer) * (amplitude - layer * 10);
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    // 随机生成音符
    if (Math.random() < 0.02) {
        notes.push({
            x: 0,
            y: centerY + (Math.random() - 0.5) * 60,
            note: musicNotes[Math.floor(Math.random() * musicNotes.length)],
            opacity: 1
        });
    }
    
    // 绘制音符
    notes.forEach((note, index) => {
        note.x += 2;
        note.opacity -= 0.01;
        
        ctx.font = '20px Arial';
        ctx.fillStyle = `rgba(255, 0, 60, ${note.opacity})`;
        ctx.fillText(note.note, note.x, note.y);
        
        if (note.opacity <= 0) {
            notes.splice(index, 1);
        }
    });
    
    time += 0.05;
    requestAnimationFrame(drawWave);
}
drawWave();

// 随机出发地
const locations = [
    'REALITY', 'DREAMLAND', 'VOID', 'ABYSS', 
    'NOWHERE', 'EVERYWHERE', 'LIMBO', 'CHAOS'
];
document.getElementById('ticketFrom').textContent = locations[Math.floor(Math.random() * locations.length)];

// 当前日期
const today = new Date();
document.getElementById('ticketDate').textContent = today.toISOString().split('T')[0];

// 点击车票
ticket.addEventListener('click', () => {
    // 车票撕裂飞出
    ticket.style.animation = 'ticket-tear 1s ease-out forwards';
    
    setTimeout(() => {
        ticketStage.style.opacity = '0';
        setTimeout(() => {
            ticketStage.style.display = 'none';
            activateCodeMatrix();
        }, 500);
    }, 1000);
});

// ========== 代码矩阵阶段 ==========
const codeMatrix = document.getElementById('codeMatrix');
const codeSnippets = [
    'no hello world', 'just kidding', 'thank you!!', 
    'vibe coding', 'shadow玉元一', 'ghost_channel',
    'keep coding', 'stay creative', 'break limits',
    'push boundaries', 'embrace chaos', 'find beauty'
];

function activateCodeMatrix() {
    codeMatrix.style.display = 'grid';
    
    const columns = Math.floor(window.innerWidth / 120);
    const rows = Math.floor(window.innerHeight / 40);
    
    codeMatrix.innerHTML = '';
    
    for (let i = 0; i < columns * rows; i++) {
        const codeBlock = document.createElement('div');
        codeBlock.className = 'code-block';
        codeBlock.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // 85% 暗色，15% 呼吸光
        if (Math.random() < 0.15) {
            codeBlock.classList.add('glow');
            codeBlock.style.animationDelay = `${Math.random() * 3}s`;
        }
        
        codeMatrix.appendChild(codeBlock);
    }
    
    // 从左到右扫描唤醒
    const blocks = document.querySelectorAll('.code-block');
    blocks.forEach((block, index) => {
        const col = index % columns;
        setTimeout(() => {
            block.classList.add('active');
        }, col * 50);
    });
    
    // 2秒后显示打印机
    setTimeout(() => {
        showPrinter();
    }, 2000);
}

// ========== 打印机阶段 ==========
const printerStage = document.getElementById('printerStage');
const printer = document.getElementById('printer');
const paper = document.getElementById('paper');
const paperContent = document.getElementById('paperContent');

function showPrinter() {
    printerStage.style.display = 'flex';
    
    setTimeout(() => {
        printer.classList.add('rise');
        
        // LED 闪烁
        const led = document.querySelector('.printer-led');
        setInterval(() => {
            led.style.opacity = led.style.opacity === '0.3' ? '1' : '0.3';
        }, 500);
        
        // 1秒后吐纸
        setTimeout(() => {
            paper.classList.add('print');
            
            // 0.5秒后开始打字
            setTimeout(() => {
                typeWriter();
            }, 500);
        }, 1000);
    }, 100);
}

// 打字机效果
const welcomeText = `
> SYSTEM INITIALIZED...
> LOADING GHOST_CHANNEL...
> 
> Welcome to the void.
> 
> This is where aesthetics meet chaos,
> where logic crumbles into dreams.
> 
> I'm shadow玉元一,
> carving beauty from the abyss.
> 
> Explore my works:
> - Characters (角色卡)
> - Presets (预设)
> - Gallery (美化)
> - Plugins (插件)
> 
> Thank you for visiting.
> Enjoy your stay in the darkness.
> 
> [ PRESS ANY KEY TO CONTINUE ]
`;

let charIndex = 0;

function typeWriter() {
    if (charIndex < welcomeText.length) {
        paperContent.textContent += welcomeText[charIndex];
        
        // 自动滚动到底部
        paper.scrollTop = paper.scrollHeight;
        
        charIndex++;
        setTimeout(typeWriter, 30);
    } else {
        // 打字完成，添加闪烁光标
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        cursor.textContent = '█';
        paperContent.appendChild(cursor);
    }
}

// 响应式调整
window.addEventListener('resize', () => {
    if (codeMatrix.style.display === 'grid') {
        activateCodeMatrix();
    }
});


