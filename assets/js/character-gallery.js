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
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/fD91/1632X2912/0_0%2B-%2B2025-06-27T135940.088.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/fD91/1632X2912/0_0%2B-%2B2025-06-27T135940.088.jpeg/webp',
        title: '苍白的挽歌',
        desc:  '鲜血褪去后的十字架，只剩下灰烬与沉默。\n不要试图唤醒沉睡的夜。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/zUPx/1632X2912/0_0%2B-%2B2025-06-27T135753.101.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/zUPx/1632X2912/0_0%2B-%2B2025-06-27T135753.101.jpeg/webp',
        title: '破碎的倒影',
        desc:  '乌鸦在塔楼盘旋，带走最后一丝温度。\n镜子里的那张脸，早就不属于我。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/KcOo/1632X2912/0_0%2B-%2B2025-06-27T135955.887.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/KcOo/1632X2912/0_0%2B-%2B2025-06-27T135955.887.jpeg/webp',
        title: '永夜的低语',
        desc:  '提灯的光芒无法穿透这片灵魂的荒芜。\n我们在深渊边缘，等待着被吞噬。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Zegj/1632X2912/0_0%2B-%2B2025-06-27T135749.214.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Zegj/1632X2912/0_0%2B-%2B2025-06-27T135749.214.jpeg/webp',
        title: '枯萎的黑蔷薇',
        desc:  '爱情与死亡，最终都成了干瘪的花瓣。\n风一吹，连同誓言一起散落。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/wWCn/1632X2912/0_0%2B-%2B2025-06-29T164042.175.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/wWCn/1632X2912/0_0%2B-%2B2025-06-29T164042.175.jpeg/webp',
        title: '第十三次葬礼',
        desc:  '墓碑上的名字早已斑驳不清。\n只有无尽的冷雨，还在诉说被遗忘的罪恶。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/ABUm/1632X2912/0_0%2B-%2B2025-06-27T135746.920.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/ABUm/1632X2912/0_0%2B-%2B2025-06-27T135746.920.jpeg/webp',
        title: '提线木偶',
        desc:  '丝线嵌进血肉，舞步伴随着关节碎裂的脆响。\n没有灵魂的躯壳，连流泪都是一种奢望。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/jEbO/1632X2912/0_0%2B-%2B2025-06-29T164044.176.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/jEbO/1632X2912/0_0%2B-%2B2025-06-29T164044.176.jpeg/webp',
        title: '血族之拥',
        desc:  '獠牙刺破苍白颈项的瞬间，是永生的赐福，亦是诅咒。\n黎明，是永远无法触及的痛。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/AJX4/1632X2912/0_0%2B-%2B2025-06-29T164109.343.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/AJX4/1632X2912/0_0%2B-%2B2025-06-29T164109.343.jpeg/webp',
        title: '废墟上的安魂曲',
        desc:  '钟摆停在了午夜零点，管风琴发出沙哑的悲鸣。\n神明早已背弃了这座荒城。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/C1qN/1632X2912/0_0%2B-%2B2025-06-29T163404.186.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/C1qN/1632X2912/0_0%2B-%2B2025-06-29T163404.186.jpeg/webp',
        title: '黑天鹅的哀羽',
        desc:  '水面上漂浮着最后一片黑羽。\n她沉入寒冷的湖底，将秘密永远封存。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6dMw/1632X2912/0_0%2B-%2B2025-06-29T163406.720.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6dMw/1632X2912/0_0%2B-%2B2025-06-29T163406.720.jpeg/webp',
        title: '猩红之眼',
        desc:  '在黑暗中凝视深渊的人，眼底也会染上绝望的底色。\n别看，那里面藏着地狱。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/MbXq/1632X2912/0_0%2B-%2B2025-06-29T163400.717.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/MbXq/1632X2912/0_0%2B-%2B2025-06-29T163400.717.jpeg/webp',
        title: '尘封的契约',
        desc:  '用干涸的血迹写下的羊皮纸，字迹发黄斑驳。\n代价是交出你那千疮百孔的心。',
    }
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

