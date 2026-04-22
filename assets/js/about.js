// ========== About Me 页面交互逻辑 (Enhanced Ver.) ==========

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

// ========== 1. 点线网络背景系统 ==========
const networkCanvas = document.getElementById('network-canvas');
const networkCtx = networkCanvas.getContext('2d');
let networkNodes = [];
let mouse = { x: null, y: null, radius: 150 };

function resizeNetworkCanvas() {
    networkCanvas.width = window.innerWidth;
    networkCanvas.height = window.innerHeight;
    initNetworkNodes();
}

window.addEventListener('resize', resizeNetworkCanvas);
resizeNetworkCanvas();

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class NetworkNode {
    constructor() {
        this.x = Math.random() * networkCanvas.width;
        this.y = Math.random() * networkCanvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = 'rgba(139, 0, 0, 0.6)';
        this.activeColor = 'rgba(255, 42, 42, 0.9)';
    }

    draw() {
        networkCtx.beginPath();
        networkCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        networkCtx.fillStyle = this.color;
        networkCtx.fill();
    }

    update() {
        // 鼠标吸引效果
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                this.color = this.activeColor;
                let force = (mouse.radius - distance) / mouse.radius;
                let directionX = dx / distance;
                let directionY = dy / distance;
                this.x += directionX * force * 3;
                this.y += directionY * force * 3;
            } else {
                this.color = 'rgba(139, 0, 0, 0.6)';
            }
        }

        // 回归原位
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;

        // 自然漂移
        this.baseX += this.vx;
        this.baseY += this.vy;

        // 边界反弹
        if (this.baseX < 0 || this.baseX > networkCanvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > networkCanvas.height) this.vy *= -1;

        this.draw();
    }
}

function initNetworkNodes() {
    networkNodes = [];
    let numNodes = Math.floor((networkCanvas.width * networkCanvas.height) / 15000);
    for (let i = 0; i < numNodes; i++) {
        networkNodes.push(new NetworkNode());
    }
}

function connectNodes() {
    for (let i = 0; i < networkNodes.length; i++) {
        for (let j = i + 1; j < networkNodes.length; j++) {
            let dx = networkNodes[i].x - networkNodes[j].x;
            let dy = networkNodes[i].y - networkNodes[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                networkCtx.beginPath();
                networkCtx.strokeStyle = `rgba(139, 0, 0, ${0.2 * (1 - distance / 120)})`;
                networkCtx.lineWidth = 0.5;
                networkCtx.moveTo(networkNodes[i].x, networkNodes[i].y);
                networkCtx.lineTo(networkNodes[j].x, networkNodes[j].y);
                networkCtx.stroke();
            }
        }
    }
}

function animateNetwork() {
    networkCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
    networkNodes.forEach(node => node.update());
    connectNodes();
    requestAnimationFrame(animateNetwork);
}

animateNetwork();

// ========== 2. 混沌弹窗系统（增强版：15个弹窗） ==========
const glitchContent = [
    'SYSTEM_ERROR: 0xDEADBEEF',
    'DATA_CORRUPT: UNABLE TO READ SECTOR 7',
    'ACCESS DENIED. [REDACTED]',
    'MEMORY_LEAK_DETECTED...',
    'SHADOW_PROTOCOL_ACTIVE',
    '▒▓█▇▅▃▂',
    'NULL_POINTER_EXCEPTION',
    'SEGMENTATION FAULT (core dumped)',
    'WARNING: REALITY BREACH',
    'GHOST_IN_THE_MACHINE',
    'VOID* ptr = NULL;',
    'STACK OVERFLOW',
    'KERNEL PANIC',
    'FORBIDDEN KNOWLEDGE',
    'CONNECTION LOST'
];

function createPopup(index) {
    const popup = document.createElement('div');
    popup.className = 'popup-window';
    popup.style.left = `${Math.random() * (window.innerWidth - 320)}px`;
    popup.style.top = `${Math.random() * (window.innerHeight - 220)}px`;
    popup.style.zIndex = 10 + index;
    popup.style.animationDelay = `${index * 0.08}s`;

    const title = glitchContent[index % glitchContent.length];
    const content = Array(20).fill(0).map(() => Math.random().toString(36).substring(2)).join(' ');

    popup.innerHTML = `
        <div class="title-bar">${title}</div>
        <div class="content">${content}</div>
    `;
    popupContainer.appendChild(popup);
    makeDraggable(popup);
    return popup;
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

// 初始化创建15个弹窗
const popupElements = [];
for (let i = 0; i < 15; i++) {
    popupElements.push(createPopup(i));
}

// ========== 3. 粒子消散系统 ==========
const particleCanvas = document.getElementById('particle-canvas');
const particleCtx = particleCanvas.getContext('2d');
let explosionParticles = [];

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

class ExplosionParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.color = color;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        
        // 向中心汇聚的力
        this.targetX = window.innerWidth / 2;
        this.targetY = window.innerHeight / 2;
    }

    update() {
        // 向中心汇聚
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 50) {
            this.speedX += (dx / distance) * 0.3;
            this.speedY += (dy / distance) * 0.3;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        this.life -= this.decay;
    }

    draw() {
        particleCtx.save();
        particleCtx.globalAlpha = this.life;
        particleCtx.fillStyle = this.color;
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
        particleCtx.restore();
    }
}

function explodePopup(popup) {
    const rect = popup.getBoundingClientRect();
    const colors = ['#ff003c', '#8b0000', '#ff2a2a', '#666'];
    
    // 从弹窗的每个角落和边缘生成粒子
    for (let i = 0; i < 50; i++) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        explosionParticles.push(new ExplosionParticle(x, y, color));
    }
}

function animateExplosionParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
        explosionParticles[i].update();
        explosionParticles[i].draw();
        
        if (explosionParticles[i].life <= 0) {
            explosionParticles.splice(i, 1);
        }
    }
    
    if (explosionParticles.length > 0) {
        requestAnimationFrame(animateExplosionParticles);
    }
}

// ========== 4. 主流程控制 ==========
let hasStarted = false;

function startTransition() {
    if (hasStarted) return;
    hasStarted = true;

    // 1. 隐藏输入框
    screen1.classList.add('hidden');

    // 2. 弹窗粒子消散效果
    popupElements.forEach((popup, index) => {
        setTimeout(() => {
            popup.classList.add('exploding');
            explodePopup(popup);
            
            // 淡出弹窗
            popup.style.transition = 'opacity 0.5s ease';
            popup.style.opacity = '0';
            
            setTimeout(() => {
                popup.remove();
            }, 500);
        }, index * 50);
    });

    // 开始粒子动画
    setTimeout(() => {
        animateExplosionParticles();
    }, 100);

    // 3. 激活档案界面
    setTimeout(() => {
        screen2.classList.add('active');
        runTypewriter();
    }, 1200);
}

sendBtn.addEventListener('click', startTransition);
aiInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') startTransition();
});

// ========== 5. 打字机效果 ==========
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

// ========== 6. 导航栏交互（统一 home.html 风格） ==========
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const ghostNav = document.getElementById('ghostNav');

if (navBurger) {
    navBurger.addEventListener('click', () => {
        navBurger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// 滚动隐藏导航栏（可选）
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        ghostNav.style.transform = 'translateY(-100%)';
    } else {
        ghostNav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});



