// ======================
// iPad 專用適配代碼 (staff-ios.js)
// ======================

// 解決 iPad 點擊延遲問題
document.addEventListener('touchend', function(e) {
  if (e.target.classList.contains('staff-action-btn')) {
    e.preventDefault();
    e.target.click();
  }
}, { passive: false });

// iPad 鍵盤收起時調整佈局
document.getElementById('staffPassword').addEventListener('blur', function() {
  window.scrollTo(0, 0);
});

// 在每個頁面都需要放置的檢查代碼
document.addEventListener('DOMContentLoaded', function() {
  // 儀表板頁面檢查
  if (window.location.pathname.includes('staff.html')) {
    if (!checkLoginStatus()) {
      window.location.href = 'index.html';
    }
  }
  
  // 更新首頁按鈕狀態
  updateAuthButton(checkLoginStatus());
});