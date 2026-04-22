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
        createStarBurst(blade);
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



// ========== 星星粒子爆发效果 ==========
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
// ========== 像素云生成系统 ==========

document.addEventListener('DOMContentLoaded', () => {
    const pixelClouds = document.getElementById('pixelClouds');

    function createPixelCloud() {
        if (!pixelClouds) return;

        const cloud = document.createElement('div');
        cloud.className = 'pixel-cloud';

        // 随机大小（40%大云，30%小云，30%普通）
        const sizeRandom = Math.random();
        if (sizeRandom > 0.7) {
            cloud.classList.add('large');
        } else if (sizeRandom < 0.3) {
            cloud.classList.add('small');
        }

        // 随机颜色（20%红色，80%白色）
        if (Math.random() > 0.8) {
            cloud.classList.add('red');
        } else {
            cloud.classList.add('white');
        }

        // 随机垂直位置（分层：上层、中层、下层）
        const layer = Math.random();
        let topPosition;
        if (layer < 0.3) {
            topPosition = Math.random() * 20 + 5;   // 上层 5-25%
        } else if (layer < 0.7) {
            topPosition = Math.random() * 25 + 25;  // 中层 25-50%
        } else {
            topPosition = Math.random() * 20 + 50;  // 下层 50-70%
        }
        cloud.style.top = topPosition + '%';

        // 根据层次调整速度（上层快，下层慢）
        let duration;
        if (layer < 0.3) {
            duration = Math.random() * 15 + 25;  // 25-40秒
        } else if (layer < 0.7) {
            duration = Math.random() * 20 + 35;  // 35-55秒
        } else {
            duration = Math.random() * 25 + 45;  // 45-70秒
        }
        cloud.style.animationDuration = duration + 's';

        // 随机延迟
        const delay = Math.random() * 5;
        cloud.style.animationDelay = delay + 's';

        // 修复：直接设置目标 opacity 值，不依赖 getComputedStyle（元素未挂载时无效）
        const baseOpacity = 0.8 + Math.random() * 0.4; // 0.8-1.2，超出1会被浏览器截断为1
        cloud.style.opacity = Math.min(baseOpacity, 1).toString();

        pixelClouds.appendChild(cloud);

        // 动画结束后移除
        setTimeout(() => {
            cloud.remove();
        }, (duration + delay) * 1000);
    }

    function initClouds() {
        if (!pixelClouds) return;

        // 创建初始云朵
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createPixelCloud();
            }, i * 1500);
        }

        // 持续生成新云朵
        setInterval(() => {
            createPixelCloud();
        }, 6000);
    }

    initClouds();
});
// 预设选择跳转函数
function selectPreset(presetId) {
    // 添加选择反馈
    const player = document.getElementById('player');
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
