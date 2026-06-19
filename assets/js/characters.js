/* ============================================================
   GHOST CHANNEL — CHARACTERS PAGE LOGIC
   导航栏 · 世界观面板展开/收起 · 入场动画
   ============================================================ */
(function () {

    /* ---------- DOM ---------- */
    const navBurger  = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    const nav        = document.getElementById('ghostNav');

    /* ---------- 导航栏汉堡按钮 ---------- */
    if (navBurger && mobileMenu) {
        navBurger.addEventListener('click', function () {
            navBurger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    /* ---------- 导航栏滚动隐藏 ---------- */
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 80) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    /* ---------- 世界观介绍面板 展开/收起 ---------- */
    // 展开按钮
    document.querySelectorAll('.world-lore-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const worldId = this.getAttribute('data-world');
            const panel = document.getElementById('lore-' + worldId);
            if (panel) {
                panel.classList.toggle('open');
                //滚动到面板位置
                if (panel.classList.contains('open')) {
                    setTimeout(() => {
                        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        });
    });

    // 关闭按钮
    document.querySelectorAll('.lore-close').forEach(btn => {
        btn.addEventListener('click', function () {
            const worldId = this.getAttribute('data-world');
            const panel = document.getElementById('lore-' + worldId);
            if (panel) {
                panel.classList.remove('open');
            }
        });
    });

    /* ---------- 卡片入场动画（Intersection Observer） ---------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 对所有世界观区块做观察
    document.querySelectorAll('.world-section').forEach(section => {
        cardObserver.observe(section);
    });

    /* ---------- 角色卡 hover 音效（可选，静音模式） ---------- */
    document.querySelectorAll('.char-card:not(.placeholder-card)').forEach(card => {
        card.addEventListener('mouseenter', function () {
            // 微妙的故障效果
            this.style.transition = 'none';
            setTimeout(() => {
                this.style.transition = 'all 0.35s ease';
            }, 50);
        });});

    /* ---------- 终端打字效果 ---------- */
    const typingLines = document.querySelectorAll('.typing-line .cmd');
    typingLines.forEach(line => {
        const text = line.textContent;
        line.textContent = '';
        let i = 0;
        const delay = parseInt(line.closest('.typing-line').getAttribute('data-delay')) || 0;

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 60);
        }, delay);
    });

    /* ---------- 雨滴粒子背景（霖城氛围） ---------- */
    function createRainDrop() {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 1px;
            height: ${8 + Math.random() * 15}px;
            background: linear-gradient(to bottom, transparent, rgba(255, 0, 60, 0.15));
            pointer-events: none;
            z-index: 1;animation: rainFall ${1.5 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(drop);

        setTimeout(() => {
            drop.remove();
        }, 4000);
    }

    // 添加雨滴动画关键帧
    const rainStyle = document.createElement('style');
    rainStyle.textContent = `
        @keyframes rainFall {
            to {
                transform: translateY(105vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rainStyle);

    // 每隔一段时间生成雨滴
    setInterval(createRainDrop, 200);

})();
