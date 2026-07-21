/* ============================================================
   GHOST CHANNEL — SURVEILLANCE LIST
   从 SCENES_REGISTRY.surveillance 读数据并渲染监控列表
   ============================================================ */

(function() {
    const grid = document.getElementById('survGrid');
    if (!grid) return;

    const registry = window.SCENES_REGISTRY || {};
    const list = registry.surveillance || [];

    // 空态
    if (!list.length) {
        grid.innerHTML = `
            <div class="surv-empty">
                <p class="empty-title">// NO_FEED_AVAILABLE</p>
                <p class="empty-desc">监控信号尚未接入。请等待记录者上传素材。</p>
            </div>
        `;
        updateCounter(0);
        return;
    }

    // 渲染每张卡片
    grid.innerHTML = list.map(renderCard).join('');
    updateCounter(list.length);

    function renderCard(item) {
        const rawTag  = (item.tag || '[CLASSIFIED]').toUpperCase();
        const tagKey  = rawTag.replace(/\[|\]/g, '').toLowerCase();
        const codeName = item.codeName ? escapeHtml(item.codeName) : '';
        const hasImg  = item.thumbnail && item.thumbnail.trim() !== '';

        const thumbInner = hasImg
            ? `<img src="${escapeAttr(item.thumbnail)}" alt="${escapeAttr(item.location)}" loading="lazy">`
            : `<span class="no-signal-text">NO_SIGNAL</span>`;

        const thumbCls = hasImg ? 'surv-thumb' : 'surv-thumb empty';

        return `
            <a href="clips/${escapeAttr(item.file)}" class="surv-card">
                <div class="${thumbCls}">
                    ${thumbInner}
                    <div class="scanlines"></div>
                    <div class="rec-dot">REC</div>
                    ${codeName ? `<div class="thumb-codename">${codeName}</div>` : ''}
                </div>
                <div class="surv-card-body">
                    ${codeName ? `<div class="surv-codename">// ${codeName}</div>` : ''}
                    <div class="surv-location">${escapeHtml(item.location)}</div>
                    <div class="surv-meta">
                        <span class="surv-timestamp">${escapeHtml(item.timestamp)}</span>
                        <span class="surv-tag ${tagKey}">${escapeHtml(rawTag)}</span>
                    </div>
                </div>
            </a>
        `;
    }

    function updateCounter(n) {
        const counter = document.getElementById('survCount');
        if (counter) counter.textContent = String(n).padStart(2, '0');
    }

    function escapeHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    function escapeAttr(s) {
        return escapeHtml(s).replace(/"/g, '&quot;');
    }
})();
