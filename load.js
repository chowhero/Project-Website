document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href && !this.href.includes('#') && !this.classList.contains('no-loader')) {
            e.preventDefault();
            const targetUrl = this.href;
            
            // 显示加载画面
            const loader = document.getElementById('loading-screen');
            loader.style.display = 'flex';
            
            // 获取网络速度（单位：Mbps）
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const mbps = connection?.downlink || 5; // 默认5Mbps
            
            // 基础等待时间配置
            const baseTimes = {
                '/': [300, 500],        // 首页：0.3-0.5秒
                '/index.html': [300, 500],
                '/application.html': [1000, 3000], // 职业页：3-8秒
                '/staff.html': [3800, 6000],
                '/specialthanks.html': [800, 1200],
                '/ownership.html': [800, 1200],
                '/login.html': [3000, 8000],
                '/gamepasses.html': [1200, 3500],
                '/division.html': [2000, 5000],  // 其他页面：1-3秒
            };
            
            // 获取当前页面的基础时间范围
            const path = new URL(this.href).pathname;
            let [minTime, maxTime] = baseTimes[path] || baseTimes.default;
            
            // 根据网速动态调整（280Mbps为分界线）
            let loadTime;
            if (mbps >= 280) {
                // 高速网络：使用较短时间（原范围的50%）
                loadTime = Math.random() * (maxTime - minTime) * 0.5 + minTime * 0.5;
            } else {
                // 低速网络：使用较长时间（原范围的100-150%）
                loadTime = Math.random() * (maxTime - minTime) * 1.5 + minTime;
            }
            
            // 确保时间在合理范围内（0.1秒-10秒）
            loadTime = Math.max(100, Math.min(loadTime, 10000));
            
            console.log(`Network: ${mbps}Mbps, Loading time: ${loadTime}ms`);
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, loadTime);
        }
    });
});
