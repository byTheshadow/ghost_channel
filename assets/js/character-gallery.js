/* ============================================================
   GHOST CHANNEL — CHARACTER GALLERY
   瀑布流渲染 · 灯箱查看 · 内存友好
   ============================================================ */

/* ---------- 图片数据（在这里增删改，最方便） ---------- */
/*
   每张图片的字段：
   - thumb : 缩略图路径（400px 宽 WebP，用于网格）
   - full  : 高清原图路径（1600px 宽 WebP，用于灯箱）
   - title : 标题
   - desc  : 简介，可用 \n 换行
   （编号 FIG.XXX 由数组顺序自动生成，无需手写）
*/
const GALLERY_DATA = [
    {
        thumb: '../assets/images/char-gallery/thumb/001.webp',
        full:  '../assets/images/char-gallery/full/001.webp',
        title: '隼 · 舞台侧影',
        desc:  '2024.03 · 霖城地下 Livehouse\n那晚他弹断了一根弦，还是弹完了。',
    },
    {
        thumb: '../assets/images/char-gallery/thumb/002.webp',
        full:  '../assets/images/char-gallery/full/002.webp',
        title: '阿丧 · 雨夜',
        desc:  '角色设定初稿。\n伞是没有的，他从来不带。',
    },
    // ↓↓↓ 继续加就行，加多少张都可以 ↓↓↓
];

/* ---------- DOM 引用 ---------- */
const grid = document.getElementById('cgGrid');
const lb = document.getElementById('cgLightbox');
const lbImg = document.getElementById('cgLbImg');
const lbFig = document.getElementById('cgLbFig');
const lbTitle = document.getElementById('cgLbTitle');
const lbDesc = document.getElementById('cgLbDesc');
const lbIndex = document.getElementById('cgLbIndex');
const lbTotal = document.getElementById('cgLbTotal');
const lbPrev = document.getElementById('cgLbPrev');
const lbNext = document.getElementById('cgLbNext');
const lbClose = document.getElementById('cgLbClose');
const lbBg = lb.querySelector('.cg-lightbox-bg');

let currentIndex = -1;

/* ---------- 工具：编号补零 ---------- */
function pad(n, width = 3) {
    return String(n).padStart(width, '0');
}

/* ---------- 渲染网格 ---------- */
function renderGrid() {
    const total = GALLERY_DATA.length;
    document.getElementById('cgTotalCount').textContent = pad(total);
    lbTotal.textContent = pad(total, 2);

    const frag = document.createDocumentFragment();
    let loadedCount = 0;
    const loadedEl = document.getElementById('cgLoadedCount');

    GALLERY_DATA.forEach((item, i) => {
        const fig = 'FIG.' + pad(i + 1);
        const card = document.createElement('div');
        card.className = 'cg-item';
        card.style.animationDelay = (0.03 * i) + 's';
        card.dataset.index = i;

        card.innerHTML = `
            <div class="cg-item-img-wrap">
                <img src="${item.thumb}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async">
                <div class="cg-crosshair"></div>
            </div>
            <div class="cg-item-caption">
                <span class="cg-item-fig">${fig}</span>
                <div class="cg-item-title">${escapeHtml(item.title)}</div>
            </div>
        `;

        card.addEventListener('click', () => openLightbox(i));

        // 统计加载完成的缩略图数
        const imgEl = card.querySelector('img');
        imgEl.addEventListener('load', () => {
            loadedCount++;
            loadedEl.textContent = pad(loadedCount);
        });
        imgEl.addEventListener('error', () => {
            loadedCount++;
            loadedEl.textContent = pad(loadedCount);
            imgEl.style.opacity = '0.2';
            imgEl.alt = '[加载失败]';
        });

        frag.appendChild(card);
    });

    grid.appendChild(frag);
}

/* ---------- 打开灯箱 ---------- */
function openLightbox(index) {
    currentIndex = index;
    const item = GALLERY_DATA[index];

    lbFig.textContent = 'FIG.' + pad(index + 1);
    lbTitle.textContent = item.title;
    lbDesc.textContent = item.desc;
    lbIndex.textContent = pad(index + 1, 2);

    // 先清空 src 触发浏览器释放上一张
    lbImg.removeAttribute('src');
    // 用 requestAnimationFrame 让 DOM 更新
    requestAnimationFrame(() => {
        lbImg.src = item.full;
        lbImg.alt = item.title;
    });

    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // 预加载相邻图，切换更流畅
    preloadNeighbors(index);
}

/* ---------- 关闭灯箱（并释放内存） ---------- */
function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // 关键：清空 src，让浏览器立即释放高清图的解码位图
    setTimeout(() => {
        lbImg.removeAttribute('src');
    }, 300);
    currentIndex = -1;
}

/* ---------- 切换 ---------- */
function showPrev() {
    if (currentIndex < 0) return;
    const i = (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    openLightbox(i);
}
function showNext() {
    if (currentIndex < 0) return;
    const i = (currentIndex + 1) % GALLERY_DATA.length;
    openLightbox(i);
}

/* ---------- 相邻预加载 ---------- */
function preloadNeighbors(index) {
    const nextIdx = (index + 1) % GALLERY_DATA.length;
    const prevIdx = (index - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    [nextIdx, prevIdx].forEach(i => {
        const preImg = new Image();
        preImg.src = GALLERY_DATA[i].full;
    });
}

/* ---------- 事件绑定 ---------- */
lbClose.addEventListener('click', closeLightbox);
lbBg.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') showPrev();
    else if (e.key === 'ArrowRight') showNext();
});

/* 触摸滑动切换 */
let touchStartX = 0;
lb.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });
lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
        dx > 0 ? showPrev() : showNext();
    }
}, { passive: true });

/* 页面离开时兜底释放（虽然浏览器会自动做，但显式写更保险） */
window.addEventListener('pagehide', () => {
    lbImg.removeAttribute('src');
    document.querySelectorAll('.cg-item img').forEach(img => {
        // 只释放视口外的
        const rect = img.getBoundingClientRect();
        if (rect.bottom < -500 || rect.top > window.innerHeight + 500) {
            img.removeAttribute('src');
        }
    });
});

/* ---------- 汉堡菜单（沿用 characters.css 的类名） ---------- */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
}

/* ---------- HTML 转义（防止标题里的特殊字符破坏结构） ---------- */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ---------- 启动 ---------- */
renderGrid();
/* ---------- 声明弹窗逻辑 ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const noticeModal = document.getElementById('cgNoticeModal');
    const noticeClose = document.getElementById('cgNoticeClose');
    const noticeConfirm = document.getElementById('cgNoticeConfirm');

    if (!noticeModal) return;

    // 检查本地缓存是否已经点击过确认（关闭后以后不再弹出）
    // 如果你想让每次刷新页面都弹，请删掉下面这个 if 条件的判断，只保留内部的 setTimeout 即可
    if (!localStorage.getItem('ghost_channel_notice_agreed')) {
        // 延迟 0.5 秒弹出，增加终端启动的仪式感
        setTimeout(() => {
            noticeModal.classList.add('show');
            noticeModal.setAttribute('aria-hidden', 'false');
        }, 500);
    }

    const closeNotice = () => {
        noticeModal.classList.remove('show');
        noticeModal.setAttribute('aria-hidden', 'true');
        // 记录到浏览器本地，下次再进页面不再打扰
        localStorage.setItem('ghost_channel_notice_agreed', 'true');
    };

    if (noticeClose) noticeClose.addEventListener('click', closeNotice);
    if (noticeConfirm) noticeConfirm.addEventListener('click', closeNotice);
});

