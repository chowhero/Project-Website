// js/staff/ui.js
function setupUI() {
  // 開關登入彈窗
  document.getElementById('staffButton').addEventListener('click', function() {
    document.getElementById('staffLoginModal').style.display = 'flex';
  });

  document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('staffLoginModal').style.display = 'none';
  });
}

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