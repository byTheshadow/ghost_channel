/* ============================================================
   GHOST CHANNEL — CHARACTER DETAIL PAGE · UNIVERSAL JS
   入场动画 · 导航栏 · 视差 · 滚动揭示 · 光标
   ============================================================ */
(function () {

    /* ==================== 入场动画控制 ==================== */
    const introOverlay = document.getElementById('charIntro');

    if (introOverlay) {
        // 动画时长：6秒循环，我们在第一轮结束时淡出
        const INTRO_DURATION = 5500; // 5.5秒后开始淡出

        function dismissIntro() {
            introOverlay.classList.add('fade-out');
            setTimeout(() => {
                introOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }, 600);
        }

        // 自动消失
        setTimeout(dismissIntro, INTRO_DURATION);

        // 点击跳过
        introOverlay.addEventListener('click', dismissIntro);

        // 阻止入场动画期间滚动
        document.body.style.overflow = 'hidden';
    }

    /* ==================== 导航栏 ==================== */
    const navBurger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    const nav = document.getElementById('ghostNav');

    if (navBurger && mobileMenu) {
        navBurger.addEventListener('click', function () {
            navBurger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    //滚动隐藏导航栏
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        if (!nav) return;
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 80) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    /* ==================== 模板A：3D 视差倾斜 ==================== */
    const parallaxWrapper = document.getElementById('parallaxWrapper');
    const parallaxCard = document.getElementById('parallaxCard');

    if (parallaxWrapper && parallaxCard) {
        parallaxWrapper.addEventListener('mousemove', function (e) {
            const rect = parallaxWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const degX = (y / (rect.height / 2)) * -8;
            const degY = (x / (rect.width / 2)) * 8;
            parallaxCard.style.transform = 'rotateX(' + degX + 'deg) rotateY(' + degY + 'deg)';
        });

        parallaxWrapper.addEventListener('mouseleave', function () {
            parallaxCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
            parallaxCard.style.transition = 'transform 0.5s ease';
        });

        parallaxWrapper.addEventListener('mouseenter', function () {
            parallaxCard.style.transition = 'none';
        });
    }

    /* ==================== 模板B：自定义光标 ==================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

        window.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();
    }

    /* ==================== 模板B：Hero 视差滚动 ==================== */
    const heroName = document.getElementById('heroNameParallax');
    const heroImg = document.getElementById('heroImgParallax');
    const heroImgInner = document.getElementById('heroImgInner');

    if (heroName && heroImg) {
        window.addEventListener('scroll', function () {
            const scrolled = window.scrollY;
            if (window.innerWidth > 900) {
                heroName.style.transform = 'translateY(' + (scrolled * 0.35) + 'px)';
                heroImg.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
                if (heroImgInner) {
                    heroImgInner.style.transform = 'scale(' + (1.1 + scrolled * 0.0004) + ')';
                }
            }
        });
    }

    /* ==================== 通用：卡片滚动揭示 ==================== */
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');}
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.info-card, .bio-block, .band-section, .band-section-b').forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ==================== 通用：雨滴粒子 ==================== */
    function createRainDrop() {
        var drop = document.createElement('div');
        drop.style.cssText =
            'position:fixed;top:-10px;left:' + (Math.random() * 100) + 'vw;' +
            'width:1px;height:' + (8 + Math.random() * 15) + 'px;' +
            'background:linear-gradient(to bottom,transparent,rgba(255,0,60,0.12));' +
            'pointer-events:none;z-index:1;' +
            'animation:rainFallDetail ' + (1.5 + Math.random() * 2) + 's linear forwards;';
        document.body.appendChild(drop);
        setTimeout(function () { drop.remove(); }, 4000);
    }

    // 注入雨滴动画
    var rainStyle = document.createElement('style');
    rainStyle.textContent = '@keyframes rainFallDetail{to{transform:translateY(105vh);opacity:0;}}';
    document.head.appendChild(rainStyle);

    setInterval(createRainDrop, 250);

    /* ==================== 模板A：实时时钟 ==================== */
    var clockEl = document.getElementById('liveClock');
    if (clockEl) {
        function updateClock() {
            var now = new Date();
            clockEl.textContent = now.toTimeString().split(' ')[0];
        }
        setInterval(updateClock, 1000);
        updateClock();
    }

})();
