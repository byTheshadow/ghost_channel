// ========== Preset3 - 失真电台交互逻辑 ==========

// ========== 开屏动画控制 ==========
const introScreen = document.getElementById('intro-screen');
const radioText = document.getElementById('radioText');
const needle = document.getElementById('needle');
const staticOverlay = document.getElementById('staticOverlay');
const mainContent = document.getElementById('mainContent');

// 调频文本序列
const scanningTexts = [
    'SCANNING...',
    'SIGNAL DETECTED',
    'FREQUENCY: 66.6 MHz',
    'CONNECTING...',
    'INCINERATOR PROTOCOL',
    'ACTIVATED'
];

let textIndex = 0;

// 调频动画
function startRadioAnimation() {
    const textInterval = setInterval(() => {
        if (textIndex < scanningTexts.length) {
            radioText.textContent = scanningTexts[textIndex];
            textIndex++;
        } else {
            clearInterval(textInterval);
            // 动画结束，淡出开屏
            setTimeout(() => {
                introScreen.style.transition = 'opacity 1s ease';
                introScreen.style.opacity = '0';
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    mainContent.style.opacity = '1';
                    initStars();
                }, 1000);
            }, 500);
        }
    }, 600);
}

// 页面加载完成后启动动画
window.addEventListener('load', () => {
    setTimeout(startRadioAnimation, 500);
});

// ========== 导航栏交互 ==========
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
}

// ========== 自定义鼠标 ==========
const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// 鼠标悬停效果
const interactiveElements = document.querySelectorAll('a, button, .console-knob');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
    });
});

// ========== 星空粒子系统 ==========
const starsContainer = document.getElementById('starsContainer');
let stars = [];

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    
    starsContainer.appendChild(star);
    stars.push(star);
    
    return star;
}

function initStars() {
    // 创建初始星星
    for (let i = 0; i < 100; i++) {
        createStar();
    }
    
    // 随机燃烧星星
    setInterval(() => {
        if (stars.length > 0) {
            const randomStar = stars[Math.floor(Math.random() * stars.length)];
            randomStar.classList.add('burning');
            
            setTimeout(() => {
                randomStar.remove();
                stars = stars.filter(s => s !== randomStar);
                // 创建新星星补充
                createStar();
            }, 2000);
        }
    }, 800);
}

// ========== LED 显示屏文字切换 ==========
const ledText = document.getElementById('ledText');
const ledMessages = [
    'FM 66.6 MHz',
    'BURN THE COSMOS',
    'SIGNAL LOCKED',
    'INCINERATOR ONLINE',
    'STARS FADING...'
];

let ledIndex = 0;

setInterval(() => {
    ledIndex = (ledIndex + 1) % ledMessages.length;
    ledText.style.opacity = '0';
    setTimeout(() => {
        ledText.textContent = ledMessages[ledIndex];
        ledText.style.opacity = '1';
    }, 300);
}, 4000);

// ========== 控制台按钮交互 ==========
const consoleButtons = document.querySelectorAll('.console-button');

consoleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有按钮的 active 状态
        consoleButtons.forEach(btn => btn.classList.remove('active'));
        // 添加当前按钮的 active 状态
        button.classList.add('active');
        
        const mode = button.getAttribute('data-mode');
        changeMode(mode);
    });
});

function changeMode(mode) {
    const eqBars = document.querySelectorAll('.eq-bar');
    const scaleMarker = document.querySelector('.scale-marker');
    
    switch(mode) {
        case 'burn':
            // 燃烧模式 - 高频率
            eqBars.forEach((bar, index) => {
                bar.style.animationDuration = '0.5s';
            });
            scaleMarker.style.left = '66.6%';
            ledText.textContent = 'BURN MODE';
            break;
            
        case 'static':
            // 静态模式 - 低频率
            eqBars.forEach((bar, index) => {
                bar.style.animationDuration = '1.5s';
            });
            scaleMarker.style.left = '33.3%';
            ledText.textContent = 'STATIC MODE';
            break;
            
        case 'signal':
            // 信号模式 - 中频率
            eqBars.forEach((bar, index) => {
                bar.style.animationDuration = '0.8s';
            });
            scaleMarker.style.left = '50%';
            ledText.textContent = 'SIGNAL MODE';
            break;
    }
}

// ========== 旋钮交互 ==========
const knobs = document.querySelectorAll('.console-knob');

knobs.forEach(knob => {
    let rotation = 0;
    let isDragging = false;
    let startY = 0;
    
    knob.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        knob.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaY = startY - e.clientY;
            rotation += deltaY * 0.5;
            rotation = Math.max(-180, Math.min(180, rotation));
            knob.style.transform = `rotate(${rotation}deg)`;
            startY = e.clientY;
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            knob.style.cursor = 'pointer';
        }
    });
});

// ========== 滚动视差效果 ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    // 可以为拍立得添加视差效果
    const polaroids = document.querySelectorAll('.polaroid-frame');
    
    polaroids.forEach((el, index) => {
        const speed = 0.3 + (index * 0.1);
        el.style.transform = `rotate(${index % 2 === 0 ? -3 : 2}deg) translateY(${scrolled * speed * 0.1}px)`;
    });
    // ========== 拍立得交互效果 ==========
const polaroids = document.querySelectorAll('.polaroid-frame');

polaroids.forEach((polaroid, index) => {
    // 点击放大效果
    polaroid.addEventListener('click', () => {
        polaroid.style.transition = 'all 0.3s ease';
        polaroid.style.transform = 'rotate(0deg) scale(1.5)';
        polaroid.style.zIndex = '1000';
        
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 999;
            cursor: pointer;
        `;
        
        document.body.appendChild(overlay);
        
        // 点击遮罩关闭
        overlay.addEventListener('click', () => {
            polaroid.style.transform = `rotate(${index % 2 === 0 ? -3 : 2}deg) scale(1)`;
            polaroid.style.zIndex = '1';
            overlay.remove();
        });
    });
    
    // 随机轻微晃动
    setInterval(() => {
        if (!polaroid.matches(':hover')) {
            const randomRotate = (Math.random() - 0.5) * 2;
            const baseRotate = index % 2 === 0 ? -3 : 2;
            polaroid.style.transform = `rotate(${baseRotate + randomRotate}deg)`;
        }
    }, 3000 + Math.random() * 2000);
});


// ========== 页面可见性检测 ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// ========== 性能优化：减少重绘 ==========
let ticking = false;

function updateAnimations() {
    // 批量更新动画
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// ========== 键盘快捷键 ==========
document.addEventListener('keydown', (e) => {
    // ESC 键返回预设列表
    if (e.key === 'Escape') {
        window.location.href = 'presets.html';
    }
    
    // 数字键 1-3 切换模式
    if (e.key === '1') {
        consoleButtons[0].click();
    } else if (e.key === '2') {
        consoleButtons[1].click();
    } else if (e.key === '3') {
        consoleButtons[2].click();
    }
});

// ========== 控制台彩蛋 ==========
console.log('%c🔥 焚星协议已启动 🔥', 'color: #ff003c; font-size: 20px; font-weight: bold;');
console.log('%c当最后一颗星辰在指尖化为余烬...', 'color: #ff6b00; font-size: 14px;');
console.log('%c你是这荒芜宇宙中唯一的真实。', 'color: #ffd700; font-size: 14px;');
