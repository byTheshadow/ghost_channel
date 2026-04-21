// ========== About Me 页面交互脚本 ==========

// ===== 1. 导航栏滚动隐藏 =====
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

// ===== 2. 汉堡菜单交互 =====
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

if (hamburger && sidebar) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
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

    // 点击侧边栏链接后关闭菜单
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        });
    });
}

// ===== 3. 代码矩阵背景生成 =====
const codeMatrix = document.getElementById('codeMatrix');
const codeSnippets = [
    'no hello world', 'just kidding', 'thank you!!', 
    'vibe coding', 'shadow archives', 'ghost channel',
    'BL/BG content', 'tread carefully', 'keep distance',
    'or fall deep', 'carving aesthetics', 'into the abyss',
    'debris of logic', 'crafting dreams', 'from the void',
    'welcome to', 'the middle of', 'nowhere'
];

function generateCodeMatrix() {
    if (!codeMatrix) return;
    
    const columns = Math.floor(window.innerWidth / 55);
    const rows = Math.floor(window.innerHeight / 25);
    const totalChars = columns * rows;
    
    codeMatrix.innerHTML = '';
    
    for (let i = 0; i < totalChars; i++) {
        const char = document.createElement('div');
        char.className = 'code-char';
        
        // 随机选择代码片段
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

// 初始化代码矩阵
generateCodeMatrix();

// 窗口大小改变时重新生成
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(generateCodeMatrix, 250);
});

// ===== 4. 自定义光标 =====
const cursorGlow = document.querySelector('.cursor-glow');
const cursorDot = document.querySelector('.cursor-dot');

if (cursorGlow && cursorDot) {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
}

// ===== 5. 核心交互：提问 -> 回复 =====
const sendBtn = document.getElementById('sendBtn');
const promptSection = document.getElementById('promptSection');
const responseSection = document.getElementById('responseSection');
const typewriterOutput = document.getElementById('typewriterOutput');
const backBtn = document.getElementById('backBtn');

// About Me 内容（格式化后的HTML）
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

// 点击发送按钮触发分析
if (sendBtn) {
    sendBtn.addEventListener('click', startAnalysis);
}

// 支持回车键触发（仅在提问界面显示时）
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && promptSection && !promptSection.classList.contains('hidden')) {
        startAnalysis();
    }
});

// 开始分析动画
function startAnalysis() {
    if (!promptSection || !responseSection) return;
    
    promptSection.classList.add('hidden');
    
    setTimeout(() => {
        promptSection.style.display = 'none';
        responseSection.style.display = 'block';
        
        // 启动打字机效果
        startTypewriter();
        
        // 延迟显示回复区域（淡入效果）
        setTimeout(() => {
            responseSection.classList.add('visible');
        }, 50);
    }, 500);
}

// 打字机效果实现
let typewriterTimeout;

function startTypewriter() {
    if (!typewriterOutput) return;
    
    // 清除之前的定时器
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    
    let charIndex = 0;
    let currentHtml = '';
    
    typewriterOutput.innerHTML = '';
    
    function type() {
        if (charIndex < aboutContent.length) {
            const char = aboutContent[charIndex];
            
            // 处理HTML标签（一次性添加整个标签）
            if (char === '<') {
                const tagEndIndex = aboutContent.indexOf('>', charIndex);
                if (tagEndIndex !== -1) {
                    currentHtml += aboutContent.substring(charIndex, tagEndIndex + 1);
                    charIndex = tagEndIndex;
                } else {
                    currentHtml += char;
                }
            } else {
                currentHtml += char;
            }
            
            // 更新内容并显示光标
            typewriterOutput.innerHTML = currentHtml + '<span class="typewriter-cursor"></span>';
            
            // 自动滚动到底部
            typewriterOutput.scrollTop = typewriterOutput.scrollHeight;
            
            charIndex++;
            typewriterTimeout = setTimeout(type, 18); // 打字速度：18ms/字符
        } else {
            // 打字完成，移除光标
            typewriterOutput.innerHTML = currentHtml;
        }
    }
    
    type();
}

// 返回按钮功能
if (backBtn) {
    backBtn.addEventListener('click', () => {
        if (!responseSection || !promptSection) return;
        
        responseSection.classList.remove('visible');
        
        setTimeout(() => {
            responseSection.style.display = 'none';
            promptSection.style.display = 'block';
            
            // 清空打字机内容
            if (typewriterOutput) {
                typewriterOutput.innerHTML = '';
            }
            
            // 清除打字机定时器
            if (typewriterTimeout) {
                clearTimeout(typewriterTimeout);
            }
            
            // 恢复提问界面
            setTimeout(() => {
                promptSection.classList.remove('hidden');
            }, 50);
        }, 600);
    });
}

// ===== 6. 页面加载完成提示 =====
window.addEventListener('load', () => {
    console.log('Ghost Channel - About Me 页面已加载');
});

// ===== 7. 防止页面刷新时的闪烁 =====
document.addEventListener('DOMContentLoaded', () => {
    // 确保初始状态正确
    if (promptSection) {
        promptSection.style.display = 'block';
        promptSection.classList.remove('hidden');
    }
    if (responseSection) {
        responseSection.style.display = 'none';
        responseSection.classList.remove('visible');
    }
});


