/* ============================================================
   GHOST CHANNEL — SCENES HUB · JS
   从 _registry.js 读取各分类条目数量并渲染
   ============================================================ */

(function () {
    'use strict';

    const R = window.SCENES_REGISTRY;

    if (!R) {
        console.warn('[scenes-hub] SCENES_REGISTRY 未加载');
        return;
    }

    // 各分类计数（拨号特殊：读 contacts 数）
    const counts = {
        social: (R.weibo ? R.weibo.length : 0) + (R.moments ? R.moments.length : 0),
        calls: R.calls ? R.calls.length : 0,
        surveillance: R.surveillance ? R.surveillance.length : 0,
        forum: R.forum ? R.forum.length : 0,
        dial: R.dial && R.dial.contacts ? R.dial.contacts.length : 0
    };

    // 更新每个文件夹的 count 显示
    document.querySelectorAll('[data-count-key]').forEach(el => {
        const key = el.dataset.countKey;
        const n = counts[key] || 0;
        if (key === 'dial') {
            el.textContent = `${String(n).padStart(2, '0')} contacts`;
        } else if (key === 'forum') {
            el.textContent = `${String(n).padStart(2, '0')} threads`;
        } else {
            el.textContent = `${String(n).padStart(2, '0')} items`;
        }
    });
})();
