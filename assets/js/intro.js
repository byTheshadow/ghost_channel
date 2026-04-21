// 开屏动画控制
(function() {
    const skipBtn = document.getElementById('skipBtn');
    const INTRO_DURATION = 13000; // 13秒动画总时长
    
    // 跳转到主页面
    function goToHome() {
        // 添加淡出效果
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 500);
    }
    
    // Skip 按钮点击
    skipBtn.addEventListener('click', goToHome);
    
    // 动画结束后自动跳转
    setTimeout(goToHome, INTRO_DURATION);
    

   const eatSound = new Audio('assets/audio/eat.mp3');
   
})();

