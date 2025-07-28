// ======================
// 工具函數 (staff-utils.js)
// ======================

// 顯示提示訊息 (iPad兼容)
function showAlert(message) {
  if (typeof alert !== 'undefined') {
    alert(message);
  } else {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'staff-alert';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  }
}

// 生成員工ID
function generateStaffId(type) {
  const prefix = {
    'owner': 'OWN',
    'us_hr': 'USHR',
    'division_hr': 'DHR'
  }[type] || 'STAFF';
  
  return `${prefix}${Math.floor(1000 + Math.random() * 9000)}`;
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
    