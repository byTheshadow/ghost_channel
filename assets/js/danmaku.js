/* ============================================================
   GHOST CHANNEL — DANMAKU ENGINE
   读取 window.DANMAKU_DATA，往 .danmaku-track 中生成从右往左
   滚动的弹幕。序列播放完毕后循环。
   
   数据格式：
   window.DANMAKU_DATA = [
       { text: '文本', time: 0.5, color: '#fff' },
       ...
   ]
   ============================================================ */

(function() {
    const track = document.querySelector('.danmaku-track');
    if (!track) return;

    const data = window.DANMAKU_DATA;
    if (!Array.isArray(data) || data.length === 0) return;

    // 可调参数
    const CFG = {
        rows: 5,             // 弹幕轨道数
        rowGap: 8,           // 轨道间距 px
        rowHeight: 30,       // 每条弹幕行高 px
        speed: 90,           // 滚动速度 px/s
        loopPause: 4         // 每轮播完后停顿秒数
    };

    // 轨道占用记录：每条轨道下次可插入弹幕的最早时间戳
    const rowsAvailAt = new Array(CFG.rows).fill(0);
    let timers = [];

    function spawn(item, targetRow) {
        const el = document.createElement('div');
        el.className = 'danmaku-item';
        el.textContent = item.text;
        if (item.color) el.style.color = item.color;
        el.style.top = (CFG.rowGap + targetRow * CFG.rowHeight) + 'px';
        // 初始放到轨道右侧外部
        el.style.transform = `translateX(${track.clientWidth}px)`;
        track.appendChild(el);

        // 测量文本宽度，计算总位移
        requestAnimationFrame(() => {
            const trackWidth = track.clientWidth;
            const textWidth  = el.offsetWidth;
            const distance   = trackWidth + textWidth + 40;
            const durationMs = (distance / CFG.speed) * 1000;

            const anim = el.animate([
                { transform: `translateX(${trackWidth}px)` },
                { transform: `translateX(-${textWidth + 20}px)` }
            ], { duration: durationMs, easing: 'linear' });

            anim.onfinish = () => el.remove();
        });
    }

    function pickRow(atTime, estDurationSec) {
        // 简单的轨道分配：找一条最早可用的
        let best = 0;
        let bestAvail = rowsAvailAt[0];
        for (let i = 1; i < CFG.rows; i++) {
            if (rowsAvailAt[i] < bestAvail) {
                bestAvail = rowsAvailAt[i];
                best = i;
            }
        }
        // 如果最早可用轨道也还没空，就随机选，避免完全堆叠
        if (rowsAvailAt[best] > atTime + 0.05) {
            best = Math.floor(Math.random() * CFG.rows);
        }
        // 假设弹幕平均需要 3 秒才彻底离开开头位置
        rowsAvailAt[best] = atTime + 2.4;
        return best;
    }

    function playSequence() {
        // 清空轨道占用
        for (let i = 0; i < CFG.rows; i++) rowsAvailAt[i] = 0;

        const maxTime = Math.max(...data.map(d => Number(d.time) || 0));

        data.forEach((item) => {
            const t = Number(item.time) || 0;
            const row = pickRow(t, 3);
            const tid = setTimeout(() => spawn(item, row), t * 1000);
            timers.push(tid);
        });

        // 循环
        const loopId = setTimeout(playSequence, (maxTime + CFG.loopPause) * 1000);
        timers.push(loopId);
    }

    // 页面隐藏时暂停生成新弹幕（省电）
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            timers.forEach(t => clearTimeout(t));
            timers = [];
        } else if (timers.length === 0) {
            playSequence();
        }
    });

    playSequence();
})();
