// assets/js/preset2.js - 过载预设详情页交互

document.addEventListener('DOMContentLoaded', () => {
    // ========== 自定义光标 ==========
    const cursor = document.getElementById('cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // ========== Phase 1: 扫雷游戏 ==========
    const grid = document.getElementById('grid');
    const minesweeperStage = document.getElementById('stage-minesweeper');
    let clickCount = 0;
    const bombIndex = Math.floor(Math.random() * 16); // 随机雷的位置

    // 生成16个格子
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'ms-cell';
        cell.dataset.index = i;
        grid.appendChild(cell);

        cell.addEventListener('click', function() {
            if (this.classList.contains('clicked') || this.classList.contains('bomb')) {
                return;
            }

            clickCount++;

            if (parseInt(this.dataset.index) === bombIndex) {
                // 触雷！
                this.classList.add('bomb');
                this.textContent = '!';
                triggerOverload();
            } else {
                // 安全格子
                this.classList.add('clicked');
                const symbols = ['Σ', 'Ø', 'Ψ', 'Δ', 'Ω', 'Φ'];
                this.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            }
        });
    }

    // ========== Phase 2: 过载转场 ==========
    function triggerOverload() {
        const overlay = document.getElementById('overload-overlay');
        const glitchText = document.getElementById('glitch-text');
        
        // 屏幕震动
        document.body.classList.add('shaking');
        
        setTimeout(() => {
            overlay.style.display = 'flex';
            
            // 闪烁效果
            let flashCount = 0;
            const flashInterval = setInterval(() => {
                const colors = ['#ff003c', '#fff', '#000'];
                overlay.style.backgroundColor = colors[flashCount % 3];
                glitchText.style.color = colors[(flashCount + 1) % 3];
                
                flashCount++;
                
                if (flashCount > 12) {
                    clearInterval(flashInterval);
                    finalizeTransition();
                }
            }, 100);
        }, 300);
    }

    function finalizeTransition() {
        document.body.classList.remove('shaking');
        
        const minesweeperStage = document.getElementById('stage-minesweeper');
        const overlay = document.getElementById('overload-overlay');
        const portfolio = document.getElementById('stage-portfolio');
        
        // 淡出扫雷和转场
        minesweeperStage.style.opacity = '0';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            minesweeperStage.style.display = 'none';
            overlay.style.display = 'none';
            portfolio.style.display = 'block';
            
            // 触发入场动画
            setTimeout(() => {
                revealElements();
            }, 100);
        }, 500);
    }

    // ========== 渐显动画 ==========
    function revealElements() {
        const items = document.querySelectorAll('.reveal-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, index * 100);
        });
    }

    // ========== 幸运观测图交互 ==========
    const versionNodes = document.querySelectorAll('.version-node');
    
    versionNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // 高亮连接线
            document.body.style.filter = 'hue-rotate(5deg) brightness(1.05)';
        });

        node.addEventListener('mouseleave', () => {
            document.body.style.filter = 'none';
        });
    });

    // ========== 人物卡片视差效果 ==========
    const charCards = document.querySelectorAll('.char-card');
    
    document.addEventListener('mousemove', (e) => {
        charCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / 50;
            const deltaY = (e.clientY - centerY) / 50;
            
            const rotation = index === 0 ? -3 : 2;
            card.style.transform = `rotate(${rotation}deg) translate(${deltaX}px, ${deltaY}px)`;
        });
    });

    // ========== 滚动视差效果 ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const bgNum = document.querySelector('.huge-number-bg');
        
        if (bgNum) {
            bgNum.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // 人物卡片滚动效果
        charCards.forEach((card, index) => {
            const speed = index === 0 ? 0.1 : 0.15;
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========== 导航栏交互 ==========
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    // 滚动时导航栏隐藏/显示
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ========== 下载按钮点击效果 ==========
    const downloadBtn = document.querySelector('.download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // 创建粒子爆发效果
            for (let i = 0; i < 20; i++) {
                createParticle(e.clientX, e.clientY);
            }
        });
    }

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#ff003c';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }

    // ========== 特色标签悬停效果 ==========
    const featureTags = document.querySelectorAll('.feature-tag');
    
    featureTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.boxShadow = '0 0 20px rgba(255, 0, 60, 0.6)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.boxShadow = 'none';
        });
    });
});
