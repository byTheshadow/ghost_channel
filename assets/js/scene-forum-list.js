/* ============================================================
   GHOST CHANNEL — FORUM LIST
   从 SCENES_REGISTRY.forum 读数据，渲染列表 + 板块 tab 过滤
   ============================================================ */

(function() {
    const listEl = document.getElementById('forumList');
    const tabsEl = document.getElementById('forumTabs');
    const countEl = document.getElementById('forumCount');
    if (!listEl) return;

    const registry = window.SCENES_REGISTRY || {};
    const all = registry.forum || [];

    // 按 pinned + hot + lastReply 排序（置顶优先，然后热帖，然后最近回复）
    const sorted = [...all].sort((a, b) => {
        if (!!b.pinned - !!a.pinned) return !!b.pinned - !!a.pinned;
        if (!!b.hot - !!a.hot) return !!b.hot - !!a.hot;
        return String(b.lastReply || '').localeCompare(String(a.lastReply || ''));
    });

    // 聚合板块
    const sections = ['ALL', ...Array.from(new Set(sorted.map(t => t.section).filter(Boolean)))];
    let currentSection = 'ALL';

    if (countEl) countEl.textContent = String(all.length).padStart(2, '0');

    renderTabs();
    renderList();

    function renderTabs() {
        if (!tabsEl) return;
        tabsEl.innerHTML = sections.map(sec => {
            const count = sec === 'ALL' ? sorted.length : sorted.filter(t => t.section === sec).length;
            const label = sec === 'ALL' ? '全部' : sec;
            const active = sec === currentSection ? 'active' : '';
            return `<button class="forum-tab ${active}" data-section="${escapeAttr(sec)}">
                ${escapeHtml(label)}<span class="tab-count">${count}</span>
            </button>`;
        }).join('');
        tabsEl.querySelectorAll('.forum-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSection = btn.dataset.section;
                tabsEl.querySelectorAll('.forum-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderList();
            });
        });
    }

    function renderList() {
        const filtered = currentSection === 'ALL'
            ? sorted
            : sorted.filter(t => t.section === currentSection);

        if (!filtered.length) {
            listEl.innerHTML = `
                <div class="forum-list-head">
                    <span>状态</span><span>标题 / 板块</span><span>楼主</span><span>回复 / 阅读</span><span>最后回复</span>
                </div>
                <div class="forum-empty">
                    <p class="empty-title">// NO_THREADS</p>
                    <p>此板块暂无帖子。</p>
                </div>
            `;
            return;
        }

        listEl.innerHTML = `
            <div class="forum-list-head">
                <span>状态</span><span>标题 / 板块</span><span>楼主</span><span>回复 / 阅读</span><span>最后回复</span>
            </div>
            ${filtered.map(renderRow).join('')}
        `;
    }

    function renderRow(t) {
        const badges = [];
        if (t.pinned) badges.push(`<span class="badge-pin">置顶</span>`);
        if (t.hot)    badges.push(`<span class="badge-hot">热</span>`);
        const badgesHtml = badges.length ? badges.join('') : '<span style="color:#444;font-family:Share Tech Mono,monospace;font-size:10px;">--</span>';

        const avatarHtml = t.authorAvatar && t.authorAvatar.trim()
            ? `<img src="${escapeAttr(t.authorAvatar)}" alt="${escapeAttr(t.author)}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'avatar-fallback',textContent:'${escapeAttr(initial(t.author))}'}))">`
            : `<div class="avatar-fallback">${escapeHtml(initial(t.author))}</div>`;

        return `
            <a href="threads/${escapeAttr(t.file)}" class="forum-row">
                <div class="row-badges">${badgesHtml}</div>
                <div class="row-title-wrap">
                    <span class="row-section">${escapeHtml(t.section)}</span>
                    <span class="row-title">${escapeHtml(t.title)}</span>
                </div>
                <div class="row-author">
                    ${avatarHtml}
                    <span class="author-name">${escapeHtml(t.author)}</span>
                </div>
                <div class="row-stats">
                    <span class="stat-replies">${formatNum(t.replies)}</span>
                    <span class="stat-sep">/</span>
                    <span>${formatNum(t.views)}</span>
                </div>
                <div class="row-last">${escapeHtml(t.lastReply || '')}</div>
            </a>
        `;
    }

    function initial(name) {
        if (!name) return '?';
        const first = String(name).trim().charAt(0);
        return first.toUpperCase();
    }

    function formatNum(n) {
        n = Number(n) || 0;
        if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
        if (n >= 1000)  return (n / 1000).toFixed(1) + 'k';
        return String(n);
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
