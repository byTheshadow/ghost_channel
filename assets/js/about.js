// ========== About Me 页面交互逻辑 (Reforged Ver.) ==========

// 全局变量和初始化
const cursor = document.querySelector('.custom-cursor');
const screen1 = document.getElementById('screen-1');
const screen2 = document.getElementById('screen-2');
const sendBtn = document.getElementById('send-btn');
const aiInput = document.getElementById('ai-input');
const skipBtn = document.getElementById('skip-btn');
const outputBox = document.getElementById('output-text');
const popupContainer = document.getElementById('popup-container');

// 鼠标光标跟随
window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ========== 1. 混沌弹窗系统 ==========
const glitchContent = [
    'SYSTEM_ERROR: 0xDEADBEEF',
    'DATA_CORRUPT: UNABLE TO READ SECTOR 7',
    'ACCESS DENIED. [REDACTED]',
    'MEMORY_LEAK_DETECTED...',
    'SHADOW_PROTOCOL_ACTIVE',
    '▒▓█▇▅▃▂',
    'NULL_POINTER_EXCEPTION'
];

function createPopup(index) {
    const popup = document.createElement('div');
    popup.className = 'popup-window';
    popup.style.left = `${Math.random() * (window.innerWidth - 320)}px`;
    popup.style.top = `${Math.random() * (window.innerHeight - 220)}px`;
    popup.style.zIndex = 10 + index;
    popup.style.animationDelay = `${index * 0.1}s`;

    const title = glitchContent[Math.floor(Math.random() * glitchContent.length)];
    const content = Array(20).fill(0).map(() => Math.random().toString(36).substring(2)).join(' ');

    popup.innerHTML = `
        <div class="title-bar">${title}</div>
        <div class="content">${content}</div>
    `;
    popupContainer.appendChild(popup);
    makeDraggable(popup);
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = element.querySelector(".title-bar");

    titleBar.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 初始化创建5个弹窗
for (let i = 0; i < 5; i++) {
    createPopup(i);
}

// ========== 2. 主流程控制 ==========
let hasStarted = false;

function startTransition() {
    if (hasStarted) return;
    hasStarted = true;

    // 1. 隐藏输入框
    screen1.classList.add('hidden');

    // 2. 清理混沌弹窗
    const popups = document.querySelectorAll('.popup-window');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    popups.forEach((popup, index) => {
        const rect = popup.getBoundingClientRect();
        popup.style.transformOrigin = `${centerX - rect.left}px ${centerY - rect.top}px`;
        popup.style.transitionDelay = `${index * 0.05}s`;
        popup.classList.add('cleanup');
    });

    // 3. 激活档案界面
    setTimeout(() => {
        screen2.classList.add('active');
        runTypewriter();
    }, 800);
}

sendBtn.addEventListener('click', startTransition);
aiInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') startTransition();
});

// ========== 3. 打字机效果 ==========
const contentChunks = [
    `<h1>◈ 档案存放处 ◈</h1><h2>Shadow Archives — 保持距离，或是彻底沉沦。</h2><hr>`,
    `<p><strong>玉元一</strong>，<br><br>活跃平台和社区是在DC，社区：<span class="highlight">不小心点心铺、锦鲤欧皇食堂，MOM，奇迹之夜</span>等社区。</p>`,
    `<p>角色卡多为BL/BG（1）向的，请注意避雷！<br>预设目前有四个，后续还会继续制作和迭代，美化除了图床死了的以外应该也有30+，之后会继续制作的，感谢老师们喜欢我的作品！插件【骨与血】也会继续更新，小剧场的指令以及状态栏这些也会发在这里方便大家复制，欢迎反馈问题！</p>`,
    `<span class="warning">Note: BL/BG oriented content inside. Tread with your own preferences.<br>(注：内含 BL/BG 向内容，请根据个人偏好避雷。)</span><hr>`,
    `<div class="gothic-quote">"Carving aesthetics into the abyss, crafting dreams from the debris of logic."</div>`,
    `<a href="../home.html" class="action-link">[ 返回主界面 ]</a>`
];

let typingTimer;
let isTyping = false;
const delay = ms => new Promise(res => setTimeout(res, ms));

async function showDecodingEffect(duration = 200) {
    let startTime = Date.now();
    const chars = 'ABCDE*&^%$#@!<>?';
    const decoderSpan = document.createElement('span');
    decoderSpan.className = 'decoder-effect';
    outputBox.appendChild(decoderSpan);
    
    while (Date.now() - startTime < duration) {
        let randomText = '';
        for (let i = 0; i < 20; i++) {
            randomText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        decoderSpan.textContent = `> DECRYPTING_... ${randomText}`;
        await delay(30);
    }
    decoderSpan.remove();
}

function typeString(htmlString) {
    return new Promise(resolve => {
        let charIndex = 0;
        let tagBuffer = '';
        let inTag = false;
        const tempContainer = document.createElement('div');
        outputBox.appendChild(tempContainer);
        
        function type() {
            if (!isTyping || charIndex >= htmlString.length) {
                resolve();
                return;
            }
            
            let char = htmlString.charAt(charIndex);
            
            if (char === '<') inTag = true;
            
            if (inTag) {
                tagBuffer += char;
                if (char === '>') {
                    inTag = false;
                    tempContainer.innerHTML += tagBuffer;
                    tagBuffer = '';
                }
            } else {
                tempContainer.innerHTML += char;
            }
            
            charIndex++;
            typingTimer = setTimeout(type, Math.random() * 25 + 10);
        }
        
        type();
    });
}

async function runTypewriter() {
    isTyping = true;
    skipBtn.style.opacity = '1';
    
    for (const chunk of contentChunks) {
        if (!isTyping) break;
        await showDecodingEffect();
        await typeString(chunk);
        await delay(200);
    }
    
    isTyping = false;
    skipBtn.style.opacity = '0';
    outputBox.innerHTML += '<span class="cursor"></span>';
}

skipBtn.addEventListener('click', () => {
    if (isTyping) {
        isTyping = false;
        clearTimeout(typingTimer);
        outputBox.innerHTML = contentChunks.join('') + '<span class="cursor"></span>';
        skipBtn.style.opacity = '0';
    }
});

// ========== 4. 粒子效果 ==========
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
        this.baseColor = 'rgba(139, 0, 0, 0.6)';
        this.activeColor = 'rgba(255, 42, 42, 0.9)';
        this.color = this.baseColor;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            this.size = this.baseSize + 2;
            this.color = this.activeColor;
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.size > this.baseSize) this.size -= 0.1;
            this.color = this.baseColor;
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 20;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 20;
        }
        
        this.draw();
    }
}

function initParticles() {
    particles = [];
    let numParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ========== 5. 导航栏交互 ==========
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
}



