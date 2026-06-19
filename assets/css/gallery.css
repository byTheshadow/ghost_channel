/* ==========================================
   GALLERY PAGE — Ghost Channel
   依赖 global.css 中定义的 CSS 变量：
   --bg-main / --bg-darker / --red-dark / --red-mid
   --red-bright / --red-neon / --white
   导航栏样式已在 global.css 中定义，此文件不重复编写
   ========================================== */

.gallery-main {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    padding: 140px 40px 100px;
    z-index: 2;
}

/* ==========================================
   1. 自定义光标（桌面端专属）
   ========================================== */
.gallery-cursor {
    position: fixed;
    width: 6px;
    height: 6px;
    background-color: var(--red-neon);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px 2px rgba(255, 0, 60, 0.6);
}

.gallery-cursor-ring {
    position: fixed;
    width: 34px;
    height: 34px;
    border: 1px solid var(--red-neon);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

/* ==========================================
   2. 镂空遮罩大标题
   ========================================== */
.gallery-hero {
    text-align: center;
    margin-bottom: 60px;
}

.gallery-eyebrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 3px;
    color: var(--red-bright);
    margin-bottom: 16px;
    text-transform: uppercase;
}

.gallery-masked-title {
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(3rem, 12vw, 9rem);
    line-height: 1;
    letter-spacing: -2px;
    margin: 0;

    /* 噪点 + 暗红渐变占位纹理；后续可替换为真实图片背景做镂空效果 */
    background-image:
        repeating-linear-gradient(
            0deg,
            rgba(255, 0, 60, 0.08) 0px,
            rgba(255, 0, 60, 0.08) 2px,
            transparent 2px,
            transparent 4px
        ),
        radial-gradient(circle at 30% 30%, var(--red-bright) 0%, var(--red-mid) 45%, var(--bg-darker) 100%);
    background-size: 100% 100%, 160% 160%;
    background-position: 0 0, 50% 50%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 30px rgba(255, 0, 60, 0.35));
    transition: background-position 0.15s ease-out;
}

.gallery-sub {
    font-family: 'Share Tech Mono', monospace;
    color: #999;
    font-size: 0.85rem;
    margin-top: 20px;
    letter-spacing: 1px;
}

/* ==========================================
   3. 分类筛选条
   ========================================== */
.gallery-filter-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    padding-bottom: 24px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--red-dark);
}

.filter-btn {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: #aaa;
    background: transparent;
    border: 1px solid var(--red-dark);
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.filter-btn:hover {
    color: var(--white);
    border-color: var(--red-bright);
}

.filter-btn.active {
    color: var(--bg-darker);
    background: var(--red-neon);
    border-color: var(--red-neon);
    box-shadow: 0 0 14px rgba(255, 0, 60, 0.5);
}

.filter-count {
    margin-left: auto;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: var(--red-bright);
    letter-spacing: 1px;
}

/* ==========================================
   4. 画廊网格 / 卡片
   ========================================== */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
}

.artwork-card {
    position: relative;
    display: flex;
    flex-direction: column;
    aspect-ratio: 3 / 4;
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-darker);
    border: 1px solid var(--red-dark);
    text-decoration: none;
    color: inherit;
    cursor: none;

    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.3s ease,
                box-shadow 0.3s ease;
}

.artwork-card.visible {
    opacity: 1;
    transform: translateY(0);
}

.artwork-card.is-hidden {
    display: none;
}

.artwork-card:hover {
    border-color: var(--red-neon);
    box-shadow: 0 0 24px rgba(255, 0, 60, 0.25);
}

/* 故障闪烁叠加层 */
.card-glitch-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 40%, rgba(255, 0, 60, 0.15) 50%, transparent 60%);
    opacity: 0;
    pointer-events: none;
    z-index: 3;
    transition: opacity 0.2s ease;
}

.artwork-card:hover .card-glitch-overlay {
    opacity: 1;
    animation: glitchSweep 0.6s ease;
}

@keyframes glitchSweep {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* 扫描线动画 */
.card-scan-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--red-neon);
    box-shadow: 0 0 8px var(--red-neon);
    top: 0;
    opacity: 0;
    z-index: 4;
    pointer-events: none;
}

.artwork-card:hover .card-scan-line {
    opacity: 0.8;
    animation: scanMove 1.4s linear infinite;
}

@keyframes scanMove {
    0%   { top: 0%; }
    100% { top: 100%; }
}

/* 图片占位区域 */
.artwork-frame {
    position: relative;
    flex: 1;
    overflow: hidden;
}

.artwork-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background:
        repeating-linear-gradient(45deg, var(--bg-darker), var(--bg-darker) 10px, var(--red-dark) 10px, var(--red-dark) 11px);
}

.placeholder-icon {
    font-size: 2.4rem;
    opacity: 0.5;
    filter: grayscale(1);
}

.placeholder-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: var(--red-bright);
}

/* 真实图片就绪后使用的样式（预留） */
.artwork-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(60%) brightness(0.7);
    transition: filter 0.5s ease, transform 0.5s ease;
}

.artwork-card:hover .artwork-img {
    filter: grayscale(0%) brightness(1);
    transform: scale(1.05);
}

/* 卡片信息区 */
.artwork-info {
    padding: 16px 18px 8px;
}

.artwork-title {
    font-family: 'ZCOOL QingKe HuangYou', sans-serif;
    font-size: 1.1rem;
    color: var(--white);
    margin: 0 0 8px;
}

.artwork-tag {
    display: inline-block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 1px;
    color: var(--red-bright);
    border: 1px solid var(--red-mid);
    border-radius: 3px;
    padding: 3px 8px;
}

.artwork-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 18px 16px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: #777;
}

.artwork-arrow {
    color: var(--red-neon);
    transition: transform 0.3s ease;
}

.artwork-card:hover .artwork-arrow {
    transform: translateX(6px);
}

/* 空状态 */
.gallery-empty {
    text-align: center;
    font-family: 'Share Tech Mono', monospace;
    color: var(--red-bright);
    letter-spacing: 1px;
    padding: 60px 0;
}

/* ==========================================
   5. 移动端适配
   ========================================== */
@media (max-width: 960px) {
    .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 22px;
    }
}

@media (max-width: 768px) {
    .gallery-main {
        padding: 110px 20px 70px;
    }

    .gallery-filter-bar {
        gap: 10px;
    }

    .filter-count {
        margin-left: 0;
        width: 100%;
        order: 99;
    }
}

@media (max-width: 600px) {
    .gallery-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 900px) {
    .artwork-card,
    .filter-btn {
        cursor: auto;
    }
    .gallery-cursor,
    .gallery-cursor-ring {
        display: none;
    }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    .artwork-card,
    .card-scan-line,
    .card-glitch-overlay,
    .gallery-masked-title {
        transition: none;
        animation: none;
    }
}