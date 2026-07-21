/* ============================================================
   GHOST CHANNEL — DIAL PAD SYSTEM
   主界面弹窗风暴 + 信息流 + 手机拨号逻辑
   ============================================================ */

(function () {
    'use strict';

    /* ==================== 弹窗风暴(黑红色系 · 高频连续弹出) ==================== */
    const POPUP_MESSAGES = [
        { title: 'FATAL ERROR', icon: '💀', text: '未知错误<br>错误代码: GHOST_0x3C<br><span class="hint">有人在听。</span>' },
        { title: 'ACCESS DENIED', icon: '🔒', text: '您没有权限查看此文件夹<br><span class="path">D:\\ARCHIVE\\calls\\</span>' },
        { title: 'SYSTEM FAILURE', icon: '❌', text: '内存溢出 0x0000007E<br>SYSTEM_THREAD_EXCEPTION' },
        { title: 'WARNING', icon: '⚠️', text: '检测到异常进程<br>PID: 6667<br>进程名: listener.exe' },
        { title: 'CONNECTION LOST', icon: '📡', text: '与服务器的连接已断开<br>正在尝试重新连接...' },
        { title: 'FILE CORRUPTED', icon: '📁', text: '文件已损坏<br><span class="path">voice_record_03AM.wav</span>' },
        { title: 'ALERT', icon: '🔔', text: '检测到未知来电记录<br>来源: [REDACTED]<br><span class="hint">号码以 138 开头...</span>' },
        { title: 'MEMORY LEAK', icon: '🧠', text: '内存泄漏警告<br>剩余: 13%<br>建议立即重启' },
        { title: 'INTRUSION', icon: '👁️', text: '检测到外部访问尝试<br>IP: 192.168.█.███<br><span class="hint">来自本地网络</span>' },
        { title: 'DECRYPT FAILED', icon: '🔐', text: '解密失败<br>密钥不匹配<br><span class="path">msg_backup.enc</span>' }
    ];

    let popupIndex = 0;
    let popupTimer = null;

    function initPopupStorm() {
        const container = document.querySelector('.popup-storm');
        if (!container) return;

        const feedSection = document.querySelector('.feed-section');
        const closeAllBtn = document.querySelector('.close-all-btn');

        // 高频连续弹出
        function spawnPopup() {
            if (popupIndex >= POPUP_MESSAGES.length) {
                // 全部弹完,停止
                clearInterval(popupTimer);
                return;
            }

            const msg = POPUP_MESSAGES[popupIndex];
            popupIndex++;

            const popup = document.createElement('div');
            popup.className = 'error-popup';
            
            // 随机位置
            const maxTop = Math.min(window.innerHeight - 220, 400);
            const maxLeft = Math.max(window.innerWidth - 380, 100);
            popup.style.top = (60 + Math.random() * maxTop) + 'px';
            popup.style.left = (30 + Math.random() * maxLeft) + 'px';
            popup.style.zIndex = 500 + popupIndex;

            popup.innerHTML = `
                <div class="error-popup-header">
                    <span>${msg.title}</span>
                    <button class="error-popup-close">×</button>
                </div>
                <div class="error-popup-body">
                    <span class="error-popup-icon">${msg.icon}</span>
                    <div class="error-popup-text">${msg.text}</div>
                </div>
                <button class="error-popup-btn">确定</button>
            `;

            // 关闭单个
            const closeThis = () => {
                popup.classList.add('closing');
                setTimeout(() => popup.remove(), 200);
                checkAllClosed();
            };
            popup.querySelector('.error-popup-close').addEventListener('click', closeThis);
            popup.querySelector('.error-popup-btn').addEventListener('click', closeThis);

            container.appendChild(popup);
        }

        // 每 180ms 弹一个(高频)
        popupTimer = setInterval(spawnPopup, 180);
        spawnPopup(); // 立即弹第一个

        // 关闭全部
        if (closeAllBtn) {
            closeAllBtn.addEventListener('click', clearAll);
        }

        function checkAllClosed() {
            const remaining = container.querySelectorAll('.error-popup:not(.closing)');
            if (remaining.length === 0 && popupIndex >= POPUP_MESSAGES.length) {
                clearAll();
            }
        }

        function clearAll() {
            clearInterval(popupTimer);
            container.querySelectorAll('.error-popup').forEach(p => {
                p.classList.add('closing');
            });
            setTimeout(() => {
                container.classList.add('cleared');
                if (closeAllBtn) closeAllBtn.style.display = 'none';
                if (feedSection) {
                    feedSection.classList.add('visible');
                    initFeedScroll(); // 启动滚动
                }
            }, 300);
        }
    }

    /* ==================== 信息流(自动扶梯式无限滚动) ==================== */
    function initFeedList() {
        const track = document.querySelector('.feed-track');
        if (!track || !window.SCENES_REGISTRY?.dial?.feeds) return;

        const feeds = window.SCENES_REGISTRY.dial.feeds;
        if (feeds.length === 0) return;

        const typeIcons = {
            'news': '📰',
            'msg': '💬',
            'notice': '🔔',
            'error': '⚠️'
        };

        // 渲染卡片(重复多份以实现无缝滚动)
        const renderCards = () => {
            let html = '';
            feeds.forEach(feed => {
                html += `
                    <a class="feed-card" href="phones/${feed.phonePage}">
                        <div class="feed-card-icon">${typeIcons[feed.type] || '📄'}</div>
                        <div class="feed-card-content">
                            <span class="feed-card-type">${feed.type}</span>
                            <div class="feed-card-title">${feed.title}</div>
                            <div class="feed-card-preview">${feed.preview}</div>
                            <div class="feed-card-time">${feed.time}</div>
                        </div>
                    </a>
                `;
            });
            return html;
        };

        // 复制多份保证无缝
        const copies = Math.max(Math.ceil(8 / feeds.length), 3);
        for (let i = 0; i < copies; i++) {
            track.innerHTML += renderCards();
        }
    }

    function initFeedScroll() {
        const track = document.querySelector('.feed-track');
        if (!track) return;

        // CSS animation 已在样式里定义,这里只需确保 track 有内容
        track.classList.add('scrolling');
    }

    /* ==================== 手机拨号逻辑 ==================== */
    function initDialPad() {
        const display = document.querySelector('.phone-number');
        const statusEl = document.querySelector('.phone-call-status');
        const keypad = document.querySelector('.phone-keypad');
        const deleteBtn = document.querySelector('.key-delete');
        const callBtn = document.querySelector('.key-call');

        if (!display || !keypad) return;

        let currentNumber = '';
        const maxDigits = 7;

        const feedId = document.body.dataset.feedId || '';
        const allContacts = window.SCENES_REGISTRY?.dial?.contacts || [];
        const contacts = feedId
            ? allContacts.filter(c => c.feedId === feedId || !c.feedId)
            : allContacts;

        function formatNumber(num) {
            if (num.length <= 3) return num;
            return num.slice(0, 3) + '-' + num.slice(3);
        }

        function updateDisplay() {
            if (currentNumber === '') {
                display.textContent = '输入号码';
                display.classList.add('empty');
                display.classList.remove('calling');
            } else {
                display.textContent = formatNumber(currentNumber);
                display.classList.remove('empty');
            }
        }

        function setStatus(type, text) {
            statusEl.className = 'phone-call-status ' + type;
            statusEl.textContent = text;
        }

        // 按键点击
        keypad.addEventListener('click', (e) => {
            const key = e.target.closest('.key');
            if (!key) return;

            const digit = key.dataset.digit;
            if (digit && currentNumber.length < maxDigits) {
                currentNumber += digit;
                updateDisplay();
                setStatus('idle', '');
                
                // 按键反馈动画
                key.classList.add('pressed');
                setTimeout(() => key.classList.remove('pressed'), 150);
            }
        });

        // 删除键
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (currentNumber.length > 0) {
                    currentNumber = currentNumber.slice(0, -1);
                    updateDisplay();
                    setStatus('idle', '');
                }
            });

            let holdTimer;
            deleteBtn.addEventListener('mousedown', () => {
                holdTimer = setTimeout(() => {
                    currentNumber = '';
                    updateDisplay();
                    setStatus('idle', '');
                }, 600);
            });
            deleteBtn.addEventListener('mouseup', () => clearTimeout(holdTimer));
            deleteBtn.addEventListener('mouseleave', () => clearTimeout(holdTimer));
        }

        // 呼叫键
        if (callBtn) {
            callBtn.addEventListener('click', () => {
                if (currentNumber.length === 0) {
                    setStatus('failed', '请输入号码');
                    return;
                }

                if (currentNumber.length < maxDigits) {
                    setStatus('failed', '号码不完整');
                    return;
                }

                display.classList.add('calling');
                setStatus('calling', '正在呼叫...');

                const formatted = formatNumber(currentNumber);
                const match = contacts.find(c => c.number === formatted);

                setTimeout(() => {
                    display.classList.remove('calling');

                    if (match && match.reachable) {
                        setStatus('connected', `${match.name || '未知'} 已接听`);
                        setTimeout(() => {
                            window.location.href = `../talks/${match.file}`;
                        }, 800);
                    } else if (match && !match.reachable) {
                        const msgs = {
                            'empty': '您拨打的号码是空号',
                            'busy': '对方正在通话中',
                            'off': '对方已关机'
                        };
                        setStatus('failed', msgs[match.unreachableType] || '无法接通');
                    } else {
                        setStatus('failed', '您拨打的号码是空号');
                    }
                }, 1500);
            });
        }

        updateDisplay();
        setStatus('idle', '');
    }

    /* ==================== 对话页:打字机效果 ==================== */
    function initTalkPage() {
        const messages = document.querySelectorAll('.talk-message[data-delay]');
        if (messages.length === 0) return;

        messages.forEach((msg) => {
            const delay = parseInt(msg.dataset.delay) || 0;

            setTimeout(() => {
                msg.style.opacity = '1';
                msg.style.transform = 'translateY(0)';

                if (msg.dataset.typewriter === 'true') {
                    const bubble = msg.querySelector('.talk-bubble');
                    if (bubble) {
                        const text = bubble.textContent;
                        bubble.textContent = '';
                        const cursor = document.createElement('span');
                        cursor.className = 'typing-cursor';
                        bubble.appendChild(cursor);

                        let i = 0;
                        const interval = setInterval(() => {
                            if (i < text.length) {
                                bubble.insertBefore(document.createTextNode(text[i]), cursor);
                                i++;
                            } else {
                                clearInterval(interval);
                                setTimeout(() => cursor.remove(), 1000);
                            }
                        }, 60);
                    }
                }
            }, delay);
        });
    }

    /* ==================== 对话选项交互 ==================== */
    function initTalkOptions() {
        const options = document.querySelectorAll('.talk-option-btn');
        if (options.length === 0) return;

        options.forEach(btn => {
            btn.addEventListener('click', () => {
                const optionId = btn.dataset.optionId;

                // 隐藏所有同轮选项,只显示选中的
                const parentOptions = btn.closest('.talk-options');
                parentOptions.querySelectorAll('.talk-option-btn').forEach(b => {
                    if (b !== btn) b.classList.add('hidden');
                });
                btn.classList.add('selected');

                // 显示用户消息
                document.querySelectorAll(`.talk-message[data-option-id="${optionId}"]`).forEach(m => {
                    m.style.display = 'block';
                    setTimeout(() => {
                        m.style.opacity = '1';
                        m.style.transform = 'translateY(0)';
                    }, 100);
                });

                // 显示对方回复
                setTimeout(() => {
                    document.querySelectorAll(`.talk-message[data-reply-to="${optionId}"]`).forEach(m => {
                        m.style.display = 'block';
                        setTimeout(() => {
                            m.style.opacity = '1';
                            m.style.transform = 'translateY(0)';

                            if (m.dataset.typewriter === 'true') {
                                const bubble = m.querySelector('.talk-bubble');
                                if (bubble) {
                                    const text = bubble.textContent;
                                    bubble.textContent = '';
                                    const cursor = document.createElement('span');
                                    cursor.className = 'typing-cursor';
                                    bubble.appendChild(cursor);

                                    let i = 0;
                                    const interval = setInterval(() => {
                                        if (i < text.length) {
                                            bubble.insertBefore(document.createTextNode(text[i]), cursor);
                                            i++;
                                        } else {
                                            clearInterval(interval);
                                            setTimeout(() => cursor.remove(), 1000);
                                        }
                                    }, 60);
                                }
                            }
                        }, 100);
                    });
                }, 1200);

                // 显示下一轮选项
                const nextOptions = document.querySelector(`.talk-options[data-after="${optionId}"]`);
                if (nextOptions) {
                    setTimeout(() => {
                        nextOptions.style.display = 'flex';
                    }, 3500);
                }
            });
        });
    }

    /* ==================== 初始化 ==================== */
    document.addEventListener('DOMContentLoaded', () => {
        if (document.body.classList.contains('dial-page')) {
            initFeedList();
            initPopupStorm();
        }

        if (document.body.classList.contains('phone-page')) {
            initDialPad();
        }

        if (document.body.classList.contains('talk-page')) {
            initTalkPage();
            initTalkOptions();
        }
    });

})();

                
