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
    const chars = 'ABCDE


