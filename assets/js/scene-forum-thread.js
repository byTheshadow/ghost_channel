(function() {
    const data = window.THREAD_DATA;
    if (!data) return;

    const headerEl = document.getElementById('threadHeader');
    const floorsEl = document.getElementById('threadFloors');
    
    // 如果找不到对应DOM，说明可能不是帖子页面，直接退出
    if (!headerEl || !floorsEl) return; 

    document.title = `${data.title} · Ghost_BBS`;

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    function escAttr(s) { return esc(s).replace(/"/g, '&quot;'); }
    function initial(n) { return n ? String(n).trim().charAt(0).toUpperCase() : '?'; }

    // 1. 渲染帖子标题栏
    headerEl.innerHTML = `
        <div class="thread-header">
            <span class="th-section">${esc(data.section)}</span>
            <h1 class="th-title">${esc(data.title)}</h1>
            <div class="th-op">
                <span>楼主</span>
                <span class="op-sep">·</span>
                <span class="op-name">${esc(data.op.name)}</span>
                <span class="op-sep">·</span>
                <span>Lv.${esc(data.op.level || 1)}</span>
                <span class="op-sep">·</span>
                <span>${esc(data.op.time)}</span>
            </div>
        </div>
    `;

    // 2. 渲染帖子楼层列表
    floorsEl.className = 'thread-floors';
    floorsEl.innerHTML = data.floors.map((f, i) => {
        const num = i === 0 ? '楼主' : `${i}F`;
        
        // 头像处理（带回退方案）
        const avatarHtml = f.avatar && f.avatar.trim()
            ? `<img class="user-avatar" src="${escAttr(f.avatar)}" alt="${escAttr(f.name)}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'avatar-fallback',textContent:'${escAttr(initial(f.name))}'}))">`
            : `<div class="avatar-fallback">${esc(initial(f.name))}</div>`;
            
        // 楼主标识
        const opBadge = f.isOP ? `<span class="op-badge">LZ</span>` : '';
        
        // 引用内容处理
        const quoteHtml = f.quote ? `
            <div class="floor-quote">
                <span class="quote-author">${esc(f.quote.name)}</span>${esc(f.quote.excerpt)}
            </div>
        ` : '';
        
        // 拼接单层 HTML
        return `
            <div class="floor">
                <div class="floor-user">
                    ${avatarHtml}
                    <div class="user-name">${esc(f.name)}</div>
                    ${opBadge}
                    <div class="user-level">Lv.${esc(f.level || 1)}</div>
                </div>
                <div class="floor-body">
                    <div class="floor-meta">
                        <span class="floor-num">${esc(num)}</span>
                        <span class="floor-time">${esc(f.time)}</span>
                    </div>
                    ${quoteHtml}
                    <div class="floor-content">${esc(f.content)}</div>
                </div>
            </div>
        `;
    }).join('');
})();
