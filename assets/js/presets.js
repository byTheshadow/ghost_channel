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
