/* ============================================
   SPOTLIGHT.JS — 聚光灯跟随 + 幽灵跟随光标
   区块 J2
   ============================================ */

(function () {
    'use strict';

    let spotlightEl = null;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let rafId = null;

    function initSpotlight() {
        spotlightEl = document.getElementById('spotlight');
        if (!spotlightEl) return;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove, { passive: true });
        tick();
    }

    function onMouseMove(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX / window.innerWidth;
            mouseY = e.touches[0].clientY / window.innerHeight;
        }
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function tick() {
        // 平滑插值
        currentX = lerp(currentX, mouseX, 0.08);
        currentY = lerp(currentY, mouseY, 0.08);

        if (spotlightEl) {
            spotlightEl.style.setProperty('--mx', (currentX * 100) + '%');
            spotlightEl.style.setProperty('--my', (currentY * 100) + '%');
        }

        rafId = requestAnimationFrame(tick);
    }

    // 暴露为全局函数供 intro.js 调用
    window.initSpotlight = initSpotlight;

    // 清理
    window.addEventListener('beforeunload', () => {
        if (rafId) cancelAnimationFrame(rafId);
    });

})();

/* ====== 区块 J2 结束 ====== */
