// ======================
// 員工管理系統 - 主控制台
// ======================

let currentUserType = '';

/* 🛠️ 工具函數 */
const utils = {
  showAlert: (message, type = 'success') => {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `${message}`;
    document.body.prepend(alert);
    setTimeout(() => alert.remove(), 3000);
  }
};

/* 🔐 登出系統 - 修正版 */
function setupLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (!logoutBtn) {
    console.error('Error: Logout button not found!');
    setTimeout(setupLogoutButton, 500); // 5秒後重試
    return;
  }

  // 徹底移除舊事件
  const newBtn = logoutBtn.cloneNode(true);
  logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
  
  // 重新綁定事件
  document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // 清除所有相關數據
    localStorage.removeItem('staffAuth');
    localStorage.removeItem('announcements');
    localStorage.removeItem('careers');
    localStorage.removeItem('staffList');
    
    // 立即反饋
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        z-index: 9999;
        font-size: 2rem;
      ">
        Logout successful! Redirecting...
      </div>
    `;

    // 3秒後重定向到首頁
      window.location.replace('index.html');
  });
}

function handleLogout() {
  // 设置登出标记
  localStorage.setItem('staffAuth', "loggedOut");
  sessionStorage.setItem('justLoggedOut', Date.now());
  
  // 显示登出界面
  document.body.innerHTML = `
    <style>
      .logout-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 9999;
      }
    </style>
    <div class="logout-screen">
      <h2>登出成功</h2>
      <p>正在返回首页...</p>
    </div>
  `;
  
  // 强制跳转（防止缓存）
  setTimeout(() => {
    window.location.replace('index.html?fromLogout=true&t=' + Date.now());
  }, 800);
}

// 初始化登出按钮
function initLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}

// 仪表板初始化
function initDashboard() {
  if (!checkLoginStatus()) {
    handleLogout();
    return;
  }
  
  initLogoutButton();
  // 其他仪表板初始化代码...
}

document.addEventListener('DOMContentLoaded', initDashboard);


/* 📢 公告系統 - 修正版 */
const announcementSystem = {
  panel: () => {
    return `
      <div class="panel">
        <h3>發布公告</h3>
        <textarea id="announcementText" placeholder="輸入公告內容..." required></textarea>
        <button id="postAnnouncement" class="submit-btn">發布</button>
      </div>
    `;
  },

  initEvents: () => {
    document.getElementById('postAnnouncement').addEventListener('click', () => {
      const message = document.getElementById('announcementText').value.trim();
      if (!message) {
        utils.showAlert('請輸入公告內容', 'error');
        return;
      }
      
      const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
      announcements.unshift({
        message,
        timestamp: new Date().toLocaleString('zh-HK'),
        isTicker: message.length > 50
      });
      
      localStorage.setItem('announcements', JSON.stringify(announcements));
      utils.showAlert('公告已發布！');
      document.getElementById('announcementText').value = '';
    });
  }
};

/* 💼 職位系統 - 修正版 */
const careerSystem = {
  panel: () => {
    return `
      <div class="panel">
        <h3>發布職位</h3>
        <input type="text" id="careerTitle" placeholder="職位標題" required>
        <textarea id="careerDesc" placeholder="職位描述" required></textarea>
        <input type="url" id="careerLink" placeholder="申請連結" required>
        <button id="postCareer" class="submit-btn">發布職位</button>
      </div>
    `;
  },

  initEvents: () => {
    document.getElementById('postCareer').addEventListener('click', () => {
      const title = document.getElementById('careerTitle').value.trim();
      const desc = document.getElementById('careerDesc').value.trim();
      const link = document.getElementById('careerLink').value.trim();

      if (!title || !desc || !link) {
        utils.showAlert('請填寫所有欄位', 'error');
        return;
      }

      const careers = JSON.parse(localStorage.getItem('careers')) || [];
      careers.unshift({ title, desc, link });
      localStorage.setItem('careers', JSON.stringify(careers));
      
      utils.showAlert('職位發布成功！');
      ['careerTitle', 'careerDesc', 'careerLink'].forEach(id => {
        document.getElementById(id).value = '';
      });
    });
  }
};

/* 👥 員工系統 - 修正版 */
const staffSystem = {
  panel: () => {
    return `
      <div class="panel">
        <h3>添加員工</h3>
        <select id="staffType">
          <option value="us_hr">美國HR</option>
          <option value="division_hr">部門HR</option>
        </select>
        <input type="text" id="staffId" placeholder="員工編號" required>
        <input type="password" id="staffPass" placeholder="密碼" required>
        <button id="addStaff" class="submit-btn">確認添加</button>
      </div>
    `;
  },

  initEvents: () => {
    document.getElementById('addStaff').addEventListener('click', () => {
      const type = document.getElementById('staffType').value;
      const id = document.getElementById('staffId').value.trim();
      const pass = document.getElementById('staffPass').value.trim();

      if (!id || !pass) {
        utils.showAlert('請填寫完整資料', 'error');
        return;
      }

      const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
      staffList.push({ type, id, pass });
      localStorage.setItem('staffList', JSON.stringify(staffList));
      
      utils.showAlert('員工添加成功！');
      document.getElementById('staffId').value = '';
      document.getElementById('staffPass').value = '';
    });
  }
};

/* 🖥️ 主控制台初始化 */
function initDashboard() {
  // 驗證登入
  const authData = JSON.parse(localStorage.getItem('staffAuth'));
  if (!authData?.type) {
    window.location.replace('index.html');
    return;
  }

  currentUserType = authData.type;
  document.getElementById('staffDashboard').style.display = 'block';
  
  // 根據權限顯示功能
  showStaffDashboard(currentUserType);
  setupLogoutButton(); // 初始化登出按鈕
}

/* 🛠️ 顯示控制台界面 */
function showStaffDashboard(userType) {
  const dashboard = document.getElementById('staffDashboard');
  dashboard.innerHTML = `
    <h2>${getUserTitle(userType)} 控制台</h2>
    <div class="button-group"></div>
    <div id="panelContainer"></div>
  `;

  const addButton = (container, text, type) => {
    const btn = document.createElement('button');
    btn.className = 'panel-btn';
    btn.textContent = text;
    btn.onclick = () => showPanel(type);
    container.appendChild(btn);
  };

  const buttonGroup = dashboard.querySelector('.button-group');
  
  if (userType === 'owner' || userType === 'us_hr') {
    addButton(buttonGroup, '發布公告', 'announcement');
  }
  
  if (userType !== 'division_hr') {
    addButton(buttonGroup, '發布職位', 'career');
  }

  if (userType === 'owner') {
    addButton(buttonGroup, '添加員工', 'staff');
  }
}

/* 📦 顯示功能面板 */
function showPanel(type) {
  const container = document.getElementById('panelContainer');
  
  switch(type) {
    case 'announcement':
      container.innerHTML = announcementSystem.panel();
      announcementSystem.initEvents();
      break;
    case 'career':
      container.innerHTML = careerSystem.panel();
      careerSystem.initEvents();
      break;
    case 'staff':
      container.innerHTML = staffSystem.panel();
      staffSystem.initEvents();
      break;
  }
}

/* 🏷️ 獲取用戶稱謂 */
function getUserTitle(type) {
  return {
    owner: '管理員',
    us_hr: '美國人事部',
    division_hr: '部門人事部'
  }[type] || '員工';
}

// 🚀 啟動系統
document.addEventListener('DOMContentLoaded', initDashboard);