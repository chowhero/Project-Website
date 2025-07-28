// ======================
// 員工系統主文件 (staff-main.js)
// ======================

document.addEventListener('DOMContentLoaded', function() {
  // 初始化員工按鈕
  const staffBtn = document.getElementById('staffButton');
  if (staffBtn) {
    staffBtn.addEventListener('touchend', handleStaffButtonClick);
  } else {
    console.error('找不到員工按鈕元素');
  }

// 在 staff-main.js 添加
document.addEventListener('touchend', function(e) {
  if (e.target.classList.contains('back-btn')) {
    e.preventDefault();
    showStaffDashboard(currentUserType);
  }
});
  
  // 初始化登入表單
  const loginForm = document.getElementById('staffLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
  
  // 初始化關閉按鈕
  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('touchend', closeLoginModal);
  }
});

// 處理員工按鈕點擊
function handleStaffButtonClick(e) {
  e.preventDefault();
  const modal = document.getElementById('staffLoginModal');
  if (modal) {
    modal.style.display = 'flex';
    console.log('登入彈窗已顯示');
  }
}

// 關閉登入彈窗
function closeLoginModal() {
  const modal = document.getElementById('staffLoginModal');
  if (modal) {
    modal.style.display = 'none';
  }
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
