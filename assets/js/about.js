// ========== About Me 页面交互 ==========

// 导航栏滚动隐藏
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// 汉堡菜单
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// 点击侧边栏外部关闭
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
    }
});

// 代码矩阵背景生成
const codeMatrix = document.getElementById('codeMatrix');
const codeSnippets = [
    'no hello world', 'just kidding', 'thank you!!', 
    'vibe coding', 'shadow archives', 'ghost channel',
    'BL/BG content', 'tread carefully', 'keep distance',
    'or fall deep', 'carving aesthetics', 'into the abyss',
    'debris of logic', 'crafting dreams', 'from the void'
];

function generateCodeMatrix() {
    const columns = Math.floor(window.innerWidth / 55);
    const rows = Math.floor(window.innerHeight / 25);
    
    codeMatrix.innerHTML = '';
    
    for (let i = 0; i < columns * rows; i++) {
        const char = document.createElement('div');
        char.className = 'code-char';
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        char.textContent = snippet.substring(0, 4);
        
        // 15% 概率发光
        if (Math.random() < 0.15) {
            char.classList.add('glow');
            char.style.animationDelay = `${Math.random() * 4}s`;
        }
        
        codeMatrix.appendChild(char);
    }
}

generateCodeMatrix();
window.addEventListener('resize', generateCodeMatrix);

// 自定义光标
const cursorGlow = document.querySelector('.cursor-glow');
const cursorDot = document.querySelector('.cursor-dot');

if (cursorGlow && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
}

// ========== 核心交互：提问 -> 回复 ==========
const sendBtn = document.getElementById('sendBtn');
const promptSection = document.getElementById('promptSection');
const responseSection = document.getElementById('responseSection');
const typewriterOutput = document.getElementById('typewriterOutput');
const backBtn = document.getElementById('backBtn');
const skipBtn = document.getElementById('skipBtn');

let isTyping = false;
let typewriterTimeout = null;

// About Me 内容
const aboutContent = `
<p class="section-title">◈ 档案存放处 ◈</p>
<p><span class="highlight">Shadow Archives</span> — 保持距离，或是彻底沉沦。</p>

<p class="section-title">[ IDENTITY_DATA ]</p>
<p>玉元一，</p>
<p>活跃平台和社区是在 <span class="highlight">DC</span>，社区：<span class="highlight">不小心点心铺、锦鲤欧皇食堂、MOM、奇迹之夜</span>等社区</p>

<p class="section-title">[ CONTENT_WARNING ]</p>
<p><span class="warning">⚠ 角色卡多为BL/BG向的，请注意避雷！</span></p>
<p>Note: <span class="warning">BL/BG oriented content inside. Tread with your own preferences.</span></p>
<p>(注：内含 BL/BG 向内容，请根据个人偏好避雷。)</p>

<p class="section-title">[ WORKS_OVERVIEW ]</p>
<p>预设目前有 <span class="highlight">四个</span>，后续还会继续制作和迭代</p>
<p>美化除了图床死了的以外应该也有 <span class="highlight">30+</span>，之后会继续制作的</p>
<p>插件【<span class="highlight">骨与血</span>】也会继续更新</p>
<p>小剧场的指令以及状态栏这些也会发在这里方便大家复制</p>
<p>感谢老师们喜欢我的作品！欢迎反馈问题！</p>

<p class="section-title">[ PHILOSOPHY ]</p>
<p><span class="highlight">"Carving aesthetics into the abyss, crafting dreams from the debris of logic."</span></p>
<p>（在深渊中雕刻美学，在逻辑的碎片中编织梦境。）</p>

<p class="section-title">[ EXTERNAL_LINKS ]</p>
<p>其他网页以及有趣的测试请点击 <span class="highlight">LINKS</span> 页面跳转</p>
`;

// 点击发送按钮
sendBtn.addEventListener('click', startAnalysis);

// 支持回车键触发
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !promptSection.classList.contains('hidden')) {
        startAnalysis();
    }
});

function startAnalysis() {
    promptSection.classList.add('hidden');
    
    setTimeout(() => {
        promptSection.style.display = 'none';
        responseSection.style.display = 'block';
        startTypewriter();
        setTimeout(() => {
            responseSection.classList.add('visible');
            skipBtn.classList.add('visible');
        }, 50);
    }, 500);
}

// 打字机效果
function startTypewriter() {
    let charIndex = 0;
    let currentHtml = '';
    isTyping = true;
    
    typewriterOutput.innerHTML = '';
    
    const type = () => {
        if (charIndex < aboutContent.length && isTyping) {
            const char = aboutContent[charIndex];
            
            // 处理HTML标签
            if (char === '<') {
                const tagEndIndex = aboutContent.indexOf('>', charIndex);
                currentHtml += aboutContent.substring(charIndex, tagEndIndex + 1);
                charIndex = tagEndIndex;
            } else {
                currentHtml += char;
            }
            
            typewriterOutput.innerHTML = currentHtml + '<span class="typewriter-cursor"></span>';
            
            charIndex++;
            typewriterTimeout = setTimeout(type, 18); // 打字速度
        } else {
            // 打字完成
            isTyping = false;
            typewriterOutput.innerHTML = currentHtml;
            skipBtn.classList.remove('visible'); // 隐藏SKIP按钮
        }
    };
    
    type();
}

// SKIP按钮 - 立即显示全部内容
skipBtn.addEventListener('click', () => {
    if (isTyping) {
        isTyping = false;
        clearTimeout(typewriterTimeout);
        typewriterOutput.innerHTML = aboutContent;
        skipBtn.classList.remove('visible');
    }
});

// 返回按钮
backBtn.addEventListener('click', () => {
    // 停止打字机
    isTyping = false;
    clearTimeout(typewriterTimeout);
    
    responseSection.classList.remove('visible');
    skipBtn.classList.remove('visible');
    
    setTimeout(() => {
        responseSection.style.display = 'none';
        promptSection.style.display = 'block';
        promptSection.classList.remove('hidden');
        typewriterOutput.innerHTML = ''; // 清空内容
    }, 600);
});

