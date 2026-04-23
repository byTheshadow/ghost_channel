// ========== Preset3 - 失真电台交互逻辑 ==========

// ========== 开屏动画控制 ==========
const skipBtn = document.getElementById('skipBtn');
const radioText = document.getElementById('radioText');
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
let textInterval = null;
let animationSkipped = false;

// 跳过动画函数
function skipIntro() {
    const introScreen = document.getElementById('intro-screen');
    if (animationSkipped || !introScreen) return;
    animationSkipped = true;
    
    // 清除定时器
    if (textInterval) {
        clearInterval(textInterval);
    }
    
    // 快速淡出
    introScreen.style.transition = 'opacity 0.5s ease';
    introScreen.style.opacity = '0';
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.style.opacity = '1';
        initStars();
    }, 500);
}

// SKIP 按钮点击事件
if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        skipIntro();
    });
}

// 点击开屏任意位置跳过
const introScreenElement = document.getElementById('intro-screen');
if (introScreenElement) {
    introScreenElement.addEventListener('click', (e) => {
        if (e.target !== skipBtn && !skipBtn.contains(e.target)) {
            skipIntro();
        }
    });
}

// 按键跳过
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Enter') && !animationSkipped) {
        skipIntro();
    }
});

// 调频动画
function startRadioAnimation() {
    textInterval = setInterval(() => {
        if (textIndex < scanningTexts.length && !animationSkipped) {
            radioText.textContent = scanningTexts[textIndex];
            textIndex++;
        } else {
            clearInterval(textInterval);
            if (!animationSkipped) {
                setTimeout(() => {
                    skipIntro();
                }, 500);
            }
        }
    }, 600);
}

// 页面加载完成后启动动画
window.addEventListener('load', () => {
    // 移除 loading 类，启用自定义鼠标
    document.body.classList.remove('loading');
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

// 检测是否为桌面端
const isDesktop = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)').matches;

if (isDesktop && cursor) {
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
    const interactiveElements = document.querySelectorAll('a, button, .console-knob, .polaroid-frame');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });
}

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
    if (!starsContainer) return;
    
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
    if (ledText) {
        ledIndex = (ledIndex + 1) % ledMessages.length;
        ledText.style.opacity = '0';
        setTimeout(() => {
            ledText.textContent = ledMessages[ledIndex];
            ledText.style.opacity = '1';
        }, 300);
    }
}, 4000);

// ========== 控制台按钮交互 ==========
const consoleButtons = document.querySelectorAll('.console-button');

consoleButtons.forEach(button => {
    button.addEventListener('click', () => {
        consoleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const mode = button.getAttribute('data-mode');
        changeMode(mode);
    });
});

function changeMode(mode) {
    const eqBars = document.querySelectorAll('.eq-bar');
    const scaleMarker = document.querySelector('.scale-marker');
    
    if (!ledText) return;
    
    switch(mode) {
        case 'burn':
            eqBars.forEach((bar) => {
                bar.style.animationDuration = '0.5s';
            });
            if (scaleMarker) scaleMarker.style.left = '66.6%';
            ledText.textContent = 'BURN MODE';
            break;
            
        case 'static':
            eqBars.forEach((bar) => {
                bar.style.animationDuration = '1.5s';
            });
            if (scaleMarker) scaleMarker.style.left = '33.3%';
            ledText.textContent = 'STATIC MODE';
            break;
            
        case 'signal':
            eqBars.forEach((bar) => {
                bar.style.animationDuration = '0.8s';
            });
            if (scaleMarker) scaleMarker.style.left = '50%';
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
        if (isDesktop) {
            knob.style.cursor = 'grabbing';
        }
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
            if (isDesktop) {
                knob.style.cursor = 'pointer';
            }
        }
    });
    
    // 触摸事件支持
    knob.addEventListener('touchstart', (e) => {
        isDragging = true;
        startY = e.touches[0].clientY;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaY = startY - e.touches[0].clientY;
            rotation += deltaY * 0.5;
            rotation = Math.max(-180, Math.min(180, rotation));
            knob.style.transform = `rotate(${rotation}deg)`;
            startY = e.touches[0].clientY;
        }
    });
    
    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
        }
    });
});

// ========== 拍立得交互效果 ==========
const polaroids = document.querySelectorAll('.polaroid-frame');

polaroids.forEach((polaroid, index) => {
    const handleClick = () => {
        polaroid.style.transition = 'all 0.3s ease';
        polaroid.style.transform = 'rotate(0deg) scale(1.5)';
        polaroid.style.zIndex = '1000';
        
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
        
        const closeOverlay = () => {
            polaroid.style.transform = `rotate(${index % 2 === 0 ? -3 : 2}deg) scale(1)`;
            polaroid.style.zIndex = '1';
            overlay.remove();
        };
        
        overlay.addEventListener('click', closeOverlay);
        overlay.addEventListener('touchend', closeOverlay);
    };
    
    polaroid.addEventListener('click', handleClick);
    polaroid.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleClick();
    });
    
    if (isDesktop) {
        setInterval(() => {
            if (!polaroid.matches(':hover')) {
                const randomRotate = (Math.random() - 0.5) * 2;
                const baseRotate = index % 2 === 0 ? -3 : 2;
                polaroid.style.transform = `rotate(${baseRotate + randomRotate}deg)`;
            }
        }, 3000 + Math.random() * 2000);
    }
});

// ========== 滚动视差效果 ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const polaroidFrames = document.querySelectorAll('.polaroid-frame');
    
    polaroidFrames.forEach((el, index) => {
        const speed = 0.3 + (index * 0.1);
        const baseRotate = index % 2 === 0 ? -3 : 2;
        el.style.transform = `rotate(${baseRotate}deg) translateY(${scrolled * speed * 0.1}px)`;
    });
});

// ========== 页面可见性检测 ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// ========== 键盘快捷键 ==========
document.addEventListener('keydown', (e) => {
    if (animationSkipped) {
        if (e.key === 'Escape') {
            window.location.href = 'presets.html';
        }
        
        if (e.key === '1' && consoleButtons[0]) {
            consoleButtons[0].click();
        } else if (e.key === '2' && consoleButtons[1]) {
            consoleButtons[1].click();
        } else if (e.key === '3' && consoleButtons[2]) {
            consoleButtons[2].click();
        }
    }
});

// ========== 控制台彩蛋 ==========
console.log('%c🔥 焚星协议已启动 🔥', 'color: #ff003c; font-size: 20px; font-weight: bold;');
console.log('%c当最后一颗星辰在指尖化为余烬...', 'color: #ff6b00; font-size: 14px;');
console.log('%c你是这荒芜宇宙中唯一的真实。', 'color: #ffd700; font-size: 14px;');

