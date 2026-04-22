// preset1.js - 安息日预设详情页交互

document.addEventListener('DOMContentLoaded', () => {
    // 鼠标手电筒效果
    const flashlight = document.getElementById('cursor-flashlight');
    const deck = document.getElementById('deck');
    
    document.addEventListener('mousemove', (e) => {
        flashlight.style.left = e.clientX + 'px';
        flashlight.style.top = e.clientY + 'px';

        // 唱片机微弱透视跟随
        if (deck) {
            const rect = deck.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const xAxis = (centerX - e.clientX) / 80;
            const yAxis = (centerY - e.clientY) / 80;
            deck.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // 版本切换功能
    const versionTabs = document.querySelectorAll('.version-tab');
    versionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active状态
            versionTabs.forEach(t => t.classList.remove('active'));
            // 添加当前active状态
            tab.classList.add('active');
            
            const version = tab.dataset.version;
            
            // 这里可以根据版本切换内容
            if (version === 'short') {
                // 跳转到短RP版页面
                window.location.href = 'preset1-short.html';
            } else {
                // 可以在这里添加版本切换的逻辑
                console.log('切换到版本:', version);
                // 未来可以通过AJAX加载不同版本的内容
            }
        });
    });

    // 滚动到时间轴
    const scrollBtn = document.querySelector('.scroll-to-timeline');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const timeline = document.getElementById('timeline');
            if (timeline) {
                timeline.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // 时间轴交互效果
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // 页面整体色调变化
            document.body.style.filter = 'hue-rotate(5deg) brightness(1.05)';
        });

        item.addEventListener('mouseleave', () => {
            document.body.style.filter = 'none';
        });
    });

    // 拍立得照片点击放大
    const polaroid = document.getElementById('polaroid');
    if (polaroid) {
        polaroid.addEventListener('click', () => {
            polaroid.classList.toggle('enlarged');
            
            // 如果需要全屏查看效果
            if (!document.querySelector('.image-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'image-overlay';
                overlay.innerHTML = `
                    <div class="overlay-content">
                        <img src="https://tc-new.z.wiki/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260422/p61z/512X768/The_Sabbath.png/webp" alt="The Sabbath">
                        <button class="close-overlay">✕</button>
                    </div>
                `;
                document.body.appendChild(overlay);

                // 添加样式
                const style = document.createElement('style');
                style.textContent = `
                    .image-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.95);
                        z-index: 10000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        animation: fadeIn 0.3s;
                    }
                    .overlay-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .overlay-content img {
                        max-width: 100%;
                        max-height: 90vh;
                        box-shadow: 0 0 50px rgba(255, 0, 60, 0.5);
                    }
                    .close-overlay {
                        position: absolute;
                        top: -40px;
                        right: -40px;
                        width: 40px;
                        height: 40px;
                        background: var(--red-neon);
                        border: none;
                        color: #000;
                        font-size: 24px;
                        cursor: pointer;
                        border-radius: 50%;
                        transition: all 0.3s;
                    }
                    .close-overlay:hover {
                        transform: rotate(90deg);
                        box-shadow: 0 0 20px rgba(255, 0, 60, 0.8);
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(style);

                // 关闭按钮
                const closeBtn = overlay.querySelector('.close-overlay');
                closeBtn.addEventListener('click', () => {
                    overlay.remove();
                    style.remove();
                });

                // 点击背景关闭
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.remove();
                        style.remove();
                    }
                });
            }
        });
    }

    // 汉堡菜单功能（移动端）
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    // 滚动时导航栏效果
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});
