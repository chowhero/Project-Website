// 页面切换功能
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// 倒计时功能 (1年2个月28天)
// 将原targetDate替换为以下代码
const targetDate = new Date('2026-08-30T00:00:00').getTime(); // 北京时间2026年8月30日

function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('timer').innerHTML = "<span class='blink'>Game has been published!</span>";
        return;
    }

    // 计算年/月/日
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    diff = diff % (1000 * 60 * 60 * 24 * 365);  // 用取余确保剩余时间正确

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    diff = diff % (1000 * 60 * 60 * 24 * 30);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff = diff % (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff = diff % (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff = diff % (1000 * 60);

    const seconds = Math.floor(diff / 1000); // 新增秒数计算

    // 更新显示
    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;  // 显示秒数
}

// 初始化
setInterval(updateCountdown, 1000);
updateCountdown();

