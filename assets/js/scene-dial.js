/* ============================================================
   GHOST CHANNEL — DIAL PAD SYSTEM
   主界面弹窗风暴 + 信息流 + 手机拨号逻辑
   ============================================================ */

(function () {
    'use strict';

    /* ==================== 弹窗风暴(主界面用) ==================== */
    const POPUP_MESSAGES = [
        { title: 'ERROR', icon: '⚠️', text: '无法访问路径<br><span class="path">C:\\Users\\Shadow\\AppData\\Local\\ghost_channel\\mem_dump.log</span><br>权限被拒绝。' },
        { title: 'SYSTEM FAILURE', icon: '❌', text: '内存溢出<br>0x0000007E<br>SYSTEM_THREAD_EXCEPTION_NOT_HANDLED' },
        { title: 'WARNING', icon: '⚠️', text: '检测到异常进程<br>PID: 6667<br>进程名: listener.exe' },
        { title: 'ACCESS DENIED', icon: '🔒', text: '您没有权限查看此文件夹<br><span class="path">D:\\ARCHIVE\\calls\\</span>' },
        { title: 'FATAL ERROR', icon: '💀', text: '未知错误<br>错误代码: GHOST_0x3C<br><span class="hint">有人在听。</span>' },
        { title: 'CONNECTION LOST', icon: '📡', text: '与服务器的连接已断开<br>正在尝试重新连接...<br>失败。' },
        { title: 'FILE CORRUPTED', icon: '📁', text: '文件已损坏或不完整<br><span class="path">voice_record_03AM.wav</span><br>无法读取。' },
        { title: 'ALERT', icon: '🔔', text: '检测到未知来电记录<br>来源: [REDACTED]<br><span class="hint">号码以 138 开头...</span>' }
    ];

    function initPopupStorm() {
        const container = document.querySelector('.popup-storm');
        if (!container) return;

        const feedContainer = document.querySelector('.feed-container');
        const closeAllBtn = document.querySelector('.close-all-btn');

        // 随机选 5-7 个弹窗
        const count = 5 + Math.floor(Math.random() * 3);
        const selected = [];
        const used = new Set();

        while (selected.length < count && selected.length < POPUP_MESSAGES.length) {
            const idx = Math.floor(Math.random() * POPUP_MESSAGES.length);
            if (!used.has(idx)) {
                used.add(idx);
                selected.push(POPUP_MESSAGES[idx]);
            }
        }

        // 创建弹窗
        selected.forEach((msg, i) => {
            const popup = document.createElement('div');
            popup.className = 'error-popup';
            popup.style.top = (80 + Math.random() * 300) + 'px';
            popup.style.left = (50 + Math.random() * (window.innerWidth - 450)) + 'px';
            popup.style.animationDelay = (i * 0.15) + 's';
            popup.style.zIndex = 500 + i;

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
            popup.querySelector('.error-popup-close').addEventListener('click', () => {
                popup.remove();
                checkAllClosed();
            });
            popup.querySelector('.error-popup-btn').addEventListener('click', () => {
                popup.remove();
                checkAllClosed();
            });

            container.appendChild(popup);
        });

        // 关闭全部
        if (closeAllBtn) {
            closeAllBtn.addEventListener('click', clearAll);
        }

        function checkAllClosed() {
            if (container.querySelectorAll('.error-popup').length === 0) {
                clearAll();
            }
        }

        function clearAll() {
            container.classList.add('cleared');
            if (closeAllBtn) closeAllBtn.style.display = 'none';
            if (feedContainer) {
                setTimeout(() => {
                    feedContainer.classList.add('visible');
                }, 300);
            }
        }
    }

    /* ==================== 信息流渲染(主界面用) ==================== */
    function initFeedList() {
        const list = document.querySelector('.feed-list');
        if (!list || !window.SCENES_REGISTRY?.dial?.feeds) return;

        const feeds = window.SCENES_REGISTRY.dial.feeds;
        if (feeds.length === 0) {
            list.innerHTML = '<p style="color:#555;text-align:center;font-family:Share Tech Mono,monospace;">// NO SIGNALS DETECTED</p>';
            return;
        }

        const typeIcons = {
            'news': '📰',
            'msg': '💬',
            'notice': '🔔',
            'error': '⚠️'
        };

        feeds.forEach(feed => {
            const card = document.createElement('a');
            card.className = 'feed-card';
            card.href = `phones/${feed.phonePage}`;

            card.innerHTML = `
                <div class="feed-card-image">${typeIcons[feed.type] || '📄'}</div>
                <div class="feed-card-content">
                    <span class="feed-card-type">${feed.type}</span>
                    <div class="feed-card-title">${feed.title}</div>
                    <div class="feed-card-preview">${feed.preview}</div>
                    <div class="feed-card-time">${feed.time}</div>
                </div>
            `;

            list.appendChild(card);
        });
    }

    /* ==================== 手机拨号逻辑(手机页用) ==================== */
    function initDialPad() {
        const display = document.querySelector('.phone-number');
        const statusEl = document.querySelector('.phone-call-status');
        const keypad = document.querySelector('.phone-keypad');
        const deleteBtn = document.querySelector('.key-delete');
        const callBtn = document.querySelector('.key-call');

        if (!display || !keypad) return;

        let currentNumber = '';
        const maxDigits = 7;

        // 获取当前 feed 的 contacts
        const feedId = document.body.dataset.feedId || '';
        const allContacts = window.SCENES_REGISTRY?.dial?.contacts || [];
        const contacts = feedId
            ? allContacts.filter(c => c.feedId === feedId || !c.feedId)
            : allContacts;

        function formatNumber(num) {
            // 格式: xxx-xxxx
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
            if (!key || key.classList.contains('key-delete') || key.classList.contains('key-call')) return;

            const digit = key.dataset.digit;
            if (digit && currentNumber.length < maxDigits) {
                currentNumber += digit;
                updateDisplay();
                setStatus('idle', '');
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

            // 长按清空
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

                // 开始拨号动画
                display.classList.add('calling');
                setStatus('calling', '正在呼叫...');

                // 匹配号码
                const formatted = formatNumber(currentNumber);
                const match = contacts.find(c => c.number === formatted);

                setTimeout(() => {
                    display.classList.remove('calling');

                    if (match && match.reachable) {
                        // 打通
                        setStatus('connected', `${match.name || '未知'} 已接听`);
                        setTimeout(() => {
                            window.location.href = `../talks/${match.file}`;
                        }, 800);
                    } else if (match && !match.reachable) {
                        // 打不通
                        const msgs = {
                            'empty': '您拨打的号码是空号',
                            'busy': '对方正在通话中',
                            'off': '对方已关机'
                        };
                        setStatus('failed', msgs[match.unreachableType] || '无法接通');
                    } else {
                        // 未知号码
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

        messages.forEach((msg, index) => {
            const delay = parseInt(msg.dataset.delay) || (index * 2000);
            msg.style.animationDelay = delay + 'ms';

            // 打字机效果(可选)
            if (msg.dataset.typewriter === 'true') {
                const bubble = msg.querySelector('.talk-bubble');
                if (bubble) {
                    const text = bubble.textContent;
                    bubble.textContent = '';
                    bubble.innerHTML = '<span class="typing-cursor"></span>';

                    setTimeout(() => {
                        let i = 0;
                        const cursor = bubble.querySelector('.typing-cursor');
                        const interval = setInterval(() => {
                            if (i < text.length) {
                                bubble.insertBefore(document.createTextNode(text[i]), cursor);
                                i++;
                            } else {
                                clearInterval(interval);
                                setTimeout(() => cursor.remove(), 1000);
                            }
                        }, 50);
                    }, delay);
                }
            }
        });
    }

    /* ==================== 对话选项交互 ==================== */
    function initTalkOptions() {
        const options = document.querySelectorAll('.talk-option-btn');
        if (options.length === 0) return;

        options.forEach(btn => {
            btn.addEventListener('click', () => {
                // 标记选中
                options.forEach(b => b.classList.add('hidden'));
                btn.classList.remove('hidden');
                btn.classList.add('selected');

                // 显示用户发送的消息
                const userMsg = document.querySelector(`.talk-message[data-option-id="${btn.dataset.optionId}"]`);
                if (userMsg) {
                    userMsg.style.display = 'block';
                    userMsg.style.animationDelay = '0.3s';
                }

                // 显示对方回复
                const replyMsg = document.querySelector(`.talk-message[data-reply-to="${btn.dataset.optionId}"]`);
                if (replyMsg) {
                    setTimeout(() => {
                        replyMsg.style.display = 'block';
                        replyMsg.style.animationDelay = '0s';
                    }, 1500);
                }

                // 显示下一轮选项
                const nextOptions = document.querySelector(`.talk-options[data-after="${btn.dataset.optionId}"]`);
                if (nextOptions) {
                    setTimeout(() => {
                        nextOptions.style.display = 'flex';
                    }, 3000);
                }
            });
        });
    }

    /* ==================== 初始化 ==================== */
    document.addEventListener('DOMContentLoaded', () => {
        // 主界面
        if (document.body.classList.contains('dial-page')) {
            initPopupStorm();
            initFeedList();
        }

        // 手机页
        if (document.body.classList.contains('phone-page')) {
            initDialPad();
        }

        // 对话页
        if (document.body.classList.contains('talk-page')) {
            initTalkPage();
            initTalkOptions();
        }
    });

})();

                
