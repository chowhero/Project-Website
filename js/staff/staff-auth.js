const staffAccounts = {
  "Admin": { password: "123456", type: "owner" },
  "HR": { password: "654321", type: "us_hr" },
  "DivisionHR": {password:"12345", type:"division_hr"}
};

// 新增：统一页面名称
const DASHBOARD_PAGE = "dashboard.html";
const INDEX_PAGE = "index.html";

function checkLoginStatus() {
  const authData = localStorage.getItem('staffAuth');
  return authData !== null && authData !== "loggedOut";
}

function updateAuthButton(isLoggedIn) {
  const authButton = document.getElementById('authButton');
  const buttonText = document.getElementById('authButtonText');
  
  if (!authButton || !buttonText) {
    console.error('找不到按钮元素');
    return;
  }

  if (isLoggedIn) {
    buttonText.textContent = 'Staff Dashboard';
    authButton.onclick = function() {
      window.location.href = DASHBOARD_PAGE;
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

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const staffId = document.getElementById('staffId').value;
    const password = document.getElementById('staffPassword').value;

    if (staffAccounts[staffId] && staffAccounts[staffId].password === password) {
        // 存储登录状态
        localStorage.setItem('staffAuth', JSON.stringify({
            id: staffId,
            type: staffAccounts[staffId].type,
            timestamp: Date.now()
        }));
        
        // 清除可能的登出标记
        sessionStorage.removeItem('justLoggedOut');
        
        // 跳转到仪表板
        window.location.replace('staff.html?from=login');
    } else {
        alert('Login failed! Please check your credentials.');
    }
}

// 初始化函数
function initAuth() {
  updateAuthButton(checkLoginStatus());
  
  // 绑定登录表单
  const loginForm = document.getElementById('staffLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
  
  // 仪表板页面检查
  if (window.location.pathname.includes(DASHBOARD_PAGE)) {
    if (!checkLoginStatus()) {
      window.location.replace(INDEX_PAGE + '?from=unauthorized');
    }
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initAuth);
