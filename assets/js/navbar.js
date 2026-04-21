// ========== 通用导航栏交互 ==========

// 导航栏滚动隐藏
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 汉堡菜单
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

if (hamburger && sidebar) {
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
}

// 小幽灵提示语配置
const ghostMessages = {
    'HOME': 'BACK TO START',
    'ABOUT': 'WHO AM I?',
    'CHARACTERS': 'MEET THEM',
    'GALLERY': 'PRETTY THINGS',
    'PRESETS': 'READY TO USE',
    'PLUGINS': 'POWER UP!',
    'LINKS': 'GO EXPLORE'
};

// 为每个导航链接添加小幽灵提示
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkText = link.textContent.trim();
        const message = ghostMessages[linkText] || 'HELLO!';
        
        // 添加 data-text 属性用于故障效果
        link.setAttribute('data-text', linkText);
        
        // 创建小幽灵提示
        const tooltip = document.createElement('div');
        tooltip.className = 'ghost-tooltip';
        tooltip.innerHTML = `
            <div class="ghost-tooltip-inner">
                <div class="ghost-tooltip-sprite"></div>
                <div class="ghost-tooltip-bubble">
                    <span class="ghost-tooltip-text">${message}</span>
                </div>
            </div>
        `;
        
        link.appendChild(tooltip);
    });
});
