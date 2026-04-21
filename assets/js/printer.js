/* ============================================
   PRINTER.JS — 打印机逐行打字效果
   区块 J3
   ============================================ */

(function () {
    'use strict';

    const printLines = [
        { text: '> 正在连接... ghost_channel',       delay: 0,    type: 'normal' },
        { text: '> 操作员：shadow玉元一',              delay: 600,  type: 'normal' },
        { text: '> 日期：' + getCurrentDate(),         delay: 1200, type: 'normal' },
        { text: '> 状态：在线 / 创作中',                delay: 1800, type: 'highlight' },
        { text: '> 最新动态：still creating...',       delay: 2400, type: 'normal' },
        { text: '> ████████████████ 100%',            delay: 3200, type: 'progress-bar' },
        { text: '',                                    delay: 3800, type: 'normal' },
        { text: '> 欢迎光临。',                         delay: 4200, type: 'highlight' },
    ];

    let started = false;

    function getCurrentDate() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const h = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        return `${y}.${m}.${d} ${h}:${min}`;
    }

    function startPrinter() {
        if (started) return;
        started = true;

        const container = document.getElementById('paper-content');
        if (!container) return;

        // 清空
        container.innerHTML = '';

        printLines.forEach((lineData, index) => {
            setTimeout(() => {
                typeLine(container, lineData, index);
            }, lineData.delay);
        });
    }

    function typeLine(container, lineData, index) {
        const lineEl = document.createElement('div');
        lineEl.className = 'print-line';
        if (lineData.type === 'highlight') lineEl.classList.add('highlight');
        if (lineData.type === 'progress-bar') lineEl.classList.add('progress-bar');

        // 设置动画延迟
        lineEl.style.animationDelay = '0s';

        container.appendChild(lineEl);

        // 逐字打印效果
        const text = lineData.text;
        let charIndex = 0;

        // 先创建光标
        const cursor = document.createElement('span');
        cursor.className = 'print-cursor';
        lineEl.appendChild(cursor);

        if (text.length === 0) {
            // 空行
            lineEl.innerHTML = '&nbsp;';
            lineEl.style.opacity = '1';
            return;
        }

        const typeSpeed = lineData.type === 'progress-bar' ? 15 : 35;

        function typeChar() {
            if (charIndex < text.length) {
                // 在光标前插入字符
                const charSpan = document.createTextNode(text[charIndex]);
                lineEl.insertBefore(charSpan, cursor);
                charIndex++;
                setTimeout(typeChar, typeSpeed + Math.random() * 25);
            } else {
                // 打完了，移除光标（最后一行保留）
                if (index < printLines.length - 1) {
                    setTimeout(() => {
                        cursor.remove();
                    }, 300);
                }
            }
        }

        // 开始显示并打字
        lineEl.style.opacity = '1';
        lineEl.style.animation = 'none';
        typeChar();

        // 滚动到最新行
        container.scrollTop = container.scrollHeight;
    }

    // 暴露为全局函数
    window.startPrinter = startPrinter;

})();

/* ====== 区块 J3 结束 ====== */
