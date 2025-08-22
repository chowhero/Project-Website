// js/staff/main.js
document.addEventListener('DOMContentLoaded', function() {
  // 載入其他模組
  setupUI();
  setupLogin();
  
  // 其他初始化代碼...
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