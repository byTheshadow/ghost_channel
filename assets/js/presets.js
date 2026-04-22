// ========== Presets 页面交互逻辑 ==========

// 导航栏交互
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
}

// 代码矩阵背景生成
const codeMatrix = document.getElementById('codeMatrix');
const codeChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function generateMatrix() {
    if (!codeMatrix) return;
    
    const numChars = 200;
    for (let i = 0; i < numChars; i++) {
        const char = document.createElement('div');
        char.className = 'code-char';
        char.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
        
        if (Math.random() > 0.9) {
            char.classList.add('glow');
        }
        
        codeMatrix.appendChild(char);
    }
    
    // 随机闪烁效果
    setInterval(() => {
        const chars = document.querySelectorAll('.code-char');
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        if (randomChar) {
            randomChar.classList.toggle('glow');
            randomChar.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
        }
    }, 200);
}

generateMatrix();

// 骷髅头主角移动
const player = document.getElementById('player');
const presetBlades = document.querySelectorAll('.preset-blade');

presetBlades.forEach((blade, index) => {
    blade.addEventListener('mouseenter', () => {
        movePlayer(index);
    });
});

function movePlayer(index) {
    if (!player || window.innerWidth <= 1024) return;
    
    const blade = presetBlades[index];
    if (!blade) return;
    
    const rect = blade.getBoundingClientRect();
    const targetPos = rect.left + (rect.width / 2) - 20;
    
    player.style.left = targetPos + 'px';
    
    // 跳跃动画
    player.classList.remove('skull-jump');
    void player.offsetWidth; // 触发回流
    player.classList.add('skull-jump');
    
    setTimeout(() => {
        player.classList.remove('skull-jump');
    }, 400);
}

// 预设选择
function selectPreset(presetId) {
    // 添加选择反馈
    if (player) {
        player.style.filter = 'hue-rotate(90deg) brightness(1.5)';
    }
    
    // 页面过渡效果
    document.body.style.transition = 'opacity 0.3s';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        // 跳转到对应的预设详情页
        window.location.href = `${presetId}.html`;
    }, 300);
}

// 初始化骷髅头位置
window.addEventListener('load', () => {
    if (player && window.innerWidth > 1024) {
        movePlayer(0);
    }
});

// 窗口大小改变时重新定位
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (player && window.innerWidth > 1024) {
            const hoveredBlade = document.querySelector('.preset-blade:hover');
            if (hoveredBlade) {
                const index = Array.from(presetBlades).indexOf(hoveredBlade);
                movePlayer(index);
            }
        }
    }, 250);
});
// ========== 像素云生成系统 ==========
const pixelClouds = document.getElementById('pixelClouds');

function createPixelCloud() {
    if (!pixelClouds) return;
    
    const cloud = document.createElement('div');
    cloud.className = 'pixel-cloud';
    
    // 随机大小
    if (Math.random() > 0.6) {
        cloud.classList.add('large');
    }
    
    // 随机红色云
    if (Math.random() > 0.8) {
        cloud.classList.add('red');
    }
    
    // 随机垂直位置
    const topPosition = Math.random() * 60 + 10; // 10% - 70%
    cloud.style.top = topPosition + '%';
    
    // 随机动画时长（速度）
    const duration = Math.random() * 30 + 20; // 20-50秒
    cloud.style.animationDuration = duration + 's';
    
    // 随机延迟
    const delay = Math.random() * 10;
    cloud.style.animationDelay = delay + 's';
    
    pixelClouds.appendChild(cloud);
    
    // 动画结束后移除
    setTimeout(() => {
        cloud.remove();
    }, (duration + delay) * 1000);
}

// 初始化云朵
function initClouds() {
    // 创建初始云朵
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createPixelCloud();
        }, i * 2000);
    }
    
    // 持续生成新云朵
    setInterval(() => {
        createPixelCloud();
    }, 8000);
}

initClouds();

// ========== 星星粒子爆发效果 ==========
presetBlades.forEach((blade) => {
    blade.addEventListener('mouseenter', (e) => {
        createStarBurst(blade);
    });
});

function createStarBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 创建8个星星粒子
    for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        
        // 计算爆发方向
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 50 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        star.style.setProperty('--tx', tx + 'px');
        star.style.setProperty('--ty', ty + 'px');
        star.style.left = centerX + 'px';
        star.style.top = centerY + 'px';
        
        element.appendChild(star);
        
        // 动画结束后移除
        setTimeout(() => {
            star.remove();
        }, 600);
    }
}


const coinSound = new Audio('data:audio/wav;base64,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
