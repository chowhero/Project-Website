let currentUserType = '';

/* 🛠️ 工具函數 */
const utils = {
  // 顯示通知
  showAlert: (message, type = 'success') => {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.prepend(alert);
    setTimeout(() => alert.remove(), 5000);
  },

  // 安全跳轉
  redirect: (url) => {
    window.location.href = url;
    window.stop(); // 防止後續腳本執行
  }
};

/* 🔐 登出系統 */
const logoutSystem = {
  init: () => {
    // 事件委派處理登出
    document.addEventListener('click', (e) => {
      if (e.target.id === 'logoutBtn') this.handleLogout(e);
    });
  },

  handleLogout: (e) => {
    e?.preventDefault();
    
    // 清除所有存儲
    localStorage.removeItem('staffAuth');
    ['announcements', 'careers', 'staffList'].forEach(key => {
      localStorage.removeItem(key);
    });

    utils.showAlert('登出成功，正在跳轉...', 'info');
    setTimeout(() => utils.redirect('index.html'), 1000);
  }
};

/* 📢 公告系統 */
const announcementSystem = {
  panel: () => {
    return `
      <div class="panel">
        <h3><i class="fas fa-bullhorn"></i> 發布公告</h3>
        <textarea id="announcementText" placeholder="輸入公告內容（超過50字會自動變成跑馬燈）"></textarea>
        <button id="postAnnouncement" class="submit-btn">
          <i class="fas fa-paper-plane"></i> 發布
        </button>
      </div>
    `;
  },

  initEvents: () => {
    document.getElementById('postAnnouncement').addEventListener('click', () => {
      const message = document.getElementById('announcementText').value.trim();
      if (!message) return utils.showAlert('請輸入公告內容', 'error');
      
      const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
      announcements.push({
        message,
        timestamp: new Date().toLocaleString('zh-HK'),
        isTicker: message.length > 50
      });
      
      localStorage.setItem('announcements', JSON.stringify(announcements));
      utils.showAlert('公告已發布！');
    });
  }
};

/* 💼 職位管理 */
const careerSystem = {
  panel: () => {
    return `
      <div class="panel">
        <h3><i class="fas fa-briefcase"></i> 發布職位</h3>
        <input type="text" id="careerTitle" placeholder="職位標題">
        <textarea id="careerDesc" placeholder="職位描述"></textarea>
        <input type="url" id="careerLink" placeholder="申請連結">
        <button id="postCareer" class="submit-btn">
          <i class="fas fa-save"></i> 發布職位
        </button>
      </div>
    `;
  },

  initEvents: () => {
    document.getElementById('postCareer').addEventListener('click', () => {
      const [title, desc, link] = [
        document.getElementById('careerTitle'),
        document.getElementById('careerDesc'),
        document.getElementById('careerLink')
      ].map(el => el.value.trim());

      if (!title || !desc || !link) {
        return utils.showAlert('請填寫所有欄位', 'error');
      }

      const careers = JSON.parse(localStorage.getItem('careers')) || [];
      careers.push({ title, desc, link });
      localStorage.setItem('careers', JSON.stringify(careers));
      
      utils.showAlert('職位發布成功！');
    });
  }
};

/* 👥 員工管理 */
const staffSystem = {
  panel: () => {
    return `
      <div class="panel">
        <h3><i class="fas fa-user-plus"></i> 添加員工</h3>
        <select id="staffType">
          <option value="us_hr">美國HR</option>
          <option value="division_hr">部門HR</option>
        </select>
        <input type="text" id="staffId" placeholder="員工編號">
        <input type="password" id="staffPass" placeholder="密碼">
        <button id="addStaff" class="submit-btn">
          <i class="fas fa-user-check"></i> 確認添加
        </button>
      </div>
    `;
  },

  initEvents: () => {
    document.getElementById('addStaff').addEventListener('click', () => {
      const [type, id, pass] = [
        document.getElementById('staffType'),
        document.getElementById('staffId'),
        document.getElementById('staffPass')
      ].map(el => el.value.trim());

      if (!id || !pass) {
        return utils.showAlert('請填寫完整資料', 'error');
      }

      const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
      staffList.push({ type, id, pass });
      localStorage.setItem('staffList', JSON.stringify(staffList));
      
      utils.showAlert(`已添加 ${type === 'us_hr' ? '美國HR' : '部門HR'} 員工`);
    });
  }
};

/* 🖥️ 主控制台 */
function initDashboard() {
  // 驗證登入
  const authData = JSON.parse(localStorage.getItem('staffAuth'));
  if (!authData?.type) {
    return utils.redirect('index.html');
  }

  currentUserType = authData.type;
  document.getElementById('staffDashboard').style.display = 'block';
  
  // 根據權限顯示功能
  showStaffDashboard(currentUserType);
  logoutSystem.init();
}

/* 🛠️ 顯示控制台 */
function showStaffDashboard(userType) {
  const dashboard = document.getElementById('staffDashboard');
  dashboard.innerHTML = `
    <h2>${getUserTitle(userType)} 控制台</h2>
    <div class="button-group"></div>
    <div id="panelContainer"></div>
  `;

  const buttonGroup = dashboard.querySelector('.button-group');
  
  // 添加功能按鈕
  if (userType === 'owner' || userType === 'us_hr') {
    addButton(buttonGroup, '發布公告', 'announcement');
  }
  
  if (userType !== 'division_hr') {
    addButton(buttonGroup, '發布職位', 'career');
  }

  if (userType === 'owner') {
    addButton(buttonGroup, '添加員工', 'staff');
  }

  function addButton(container, text, type) {
    const btn = document.createElement('button');
    btn.className = 'panel-btn';
    btn.innerHTML = `<i class="fas fa-${getIcon(type)}"></i> ${text}`;
    btn.onclick = () => showPanel(type);
    container.appendChild(btn);
  }

  function getIcon(type) {
    return {
      announcement: 'bullhorn',
      career: 'briefcase',
      staff: 'users-cog'
    }[type];
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
  const titles = {
    owner: '管理員',
    us_hr: '美國人事部',
    division_hr: '部門人事部'
  };
  return titles[type] || '員工';
}

// 🚀 啟動系統
document.addEventListener('DOMContentLoaded', initDashboard);
