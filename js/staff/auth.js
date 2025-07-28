const staffAccounts = {
  "Admin": { password: "123456", type: "owner" },
  "HR": { password: "654321", type: "us_hr" },
  "DivisionHR": {password:"12345", type:"division_hr"}
};

function checkLoginStatus() {
  return localStorage.getItem('staffAuth') !== null;
}

function updateAuthButton(isLoggedIn, userType = null) {
  const authButton = document.getElementById('authButton');
  const buttonText = document.getElementById('authButtonText');
  
  if (!authButton || !buttonText) {
    console.error('Can\'t find button!');
    return;
  }

  if (isLoggedIn) {
    buttonText.textContent = 'Staff Dashboard';
    authButton.onclick = function() {
      window.location.href = 'staff.html';
    };
    authButton.classList.add('dashboard-state');
    authButton.classList.remove('login-state');
  } else {
    buttonText.textContent = 'Staff Login';
    authButton.onclick = function() {
      document.getElementById('staffLoginModal').style.display = 'flex';
    };
    authButton.classList.add('login-state');
    authButton.classList.remove('dashboard-state');
  }
}

// 檢查登入狀態
function handleLoginSubmit(e) {
  e.preventDefault();
  
  const staffId = document.getElementById('staffId').value;
  const password = document.getElementById('staffPassword').value;
  
  if (staffAccounts[staffId] && staffAccounts[staffId].password === password) {
    // 儲存登入狀態
    localStorage.setItem('staffAuth', JSON.stringify({
      id: staffId,
      type: staffAccounts[staffId].type
    }));
    
    updateAuthButton(true, staffAccounts[staffId].type);
    window.location.href = 'staff.html';
  } else {
    alert('Failed to login! Please check your ID and password!');
  }
}

// 頁面初始化
document.addEventListener('DOMContentLoaded', function() {
  updateAuthButton(checkLoginStatus());
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

// 綁定事件 (確保有呢行)
document.getElementById('staffLoginForm').addEventListener('submit', handleLoginSubmit);