// ==========================================
// LINKS.JS — Ghost Channel
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. 生成顶部字母轴 / 左侧数字轴 ---------- */
    const axisTop = document.getElementById('axisTop');
    const axisLeft = document.getElementById('axisLeft');
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (axisTop) {
        for (let i = 0; i < 40; i++) {
            const letter = i < 26 ? alphabet[i] : alphabet[Math.floor(i / 26) - 1] + alphabet[i % 26];
            const cell = document.createElement('div');
            cell.className = 'axis-cell';
            cell.textContent = letter;
            axisTop.appendChild(cell);
        }
    }
    if (axisLeft) {
        for (let i = 1; i < 50; i++) {
            const cell = document.createElement('div');
            cell.className = 'axis-cell';
            cell.textContent = i;
            axisLeft.appendChild(cell);
        }
    }

    /* ---------- 2. 鼠标坐标追踪器 ---------- */
    const tracker = document.getElementById('cursorTracker');
    if (tracker) {
        window.addEventListener('mousemove', (e) => {
            tracker.textContent = `X: ${String(e.clientX).padStart(3, '0')} | Y: ${String(e.clientY).padStart(3, '0')}`;
        });
    }

    /* ---------- 3. 小剧场手风琴 ---------- */
    document.querySelectorAll('.theater-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.theater-item');
            item.classList.toggle('open');
        });
    });

    /* ---------- 4. 复制全文 ---------- */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止触发手风琴折叠
            const targetId = btn.getAttribute('data-target');
            const textEl = document.getElementById(targetId);
            if (!textEl) return;

            const text = textEl.innerText;

            navigator.clipboard.writeText(text).then(() => {
                const original = btn.textContent;
                btn.textContent = '✓ 已复制';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = original;
                    btn.classList.remove('copied');
                }, 1500);
            }).catch(() => {
                // 兼容性兜底方案
                const range = document.createRange();
                range.selectNode(textEl);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();

                const original = btn.textContent;
                btn.textContent = '✓ 已复制';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = original;
                    btn.classList.remove('copied');
                }, 1500);
            });
        });
    });

});