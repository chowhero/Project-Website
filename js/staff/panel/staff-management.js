// 員工數據存儲
let staffMembers = JSON.parse(localStorage.getItem('staffMembers')) || [];

function showAddStaffPanel() {
  return `
    <div class="panel-header">
      <h2><i class="icon-users"></i> 員工管理</h2>
      <button onclick="showStaffDashboard(currentUserType)" class="back-btn">
        <i class="icon-arrow-left"></i> 返回
      </button>
    </div>
    
    <div class="panel-content">
      <div class="form-group">
        <label>員工編號</label>
        <input type="text" id="newStaffId" placeholder="例如：STF2023001">
      </div>
      
      <div class="form-group">
        <label>初始密碼</label>
        <input type="password" id="newStaffPassword">
      </div>
      
      <div class="form-group">
        <label>權限等級</label>
        <select id="staffRole">
          <option value="staff">普通員工</option>
          <option value="hr">HR人員</option>
          ${currentUserType === 'owner' ? '<option value="admin">管理員</option>' : ''}
        </select>
      </div>
      
      <button onclick="addStaff()" class="btn-primary">
        <i class="icon-user-plus"></i> 添加員工
      </button>
      
      <div class="staff-list">
        <h3>現有員工</h3>
        <div id="staffList"></div>
      </div>
    </div>
  `;
}

function addStaff() {
  const staffId = document.getElementById('newStaffId').value;
  const password = document.getElementById('newStaffPassword').value;
  const role = document.getElementById('staffRole').value;

  if (!staffId || !password) {
    showAlert('請填寫完整資料', 'error');
    return;
  }

  if (staffMembers.some(staff => staff.id === staffId)) {
    showAlert('該員工編號已存在', 'error');
    return;
  }

  const newStaff = {
    id: staffId,
    password: hashPassword(password), // 實際項目應該加密
    role,
    joinDate: new Date().toLocaleDateString(),
    addedBy: currentUserType
  };

  staffMembers.push(newStaff);
  localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
  
  updateStaffList();
  showAlert('員工添加成功！', 'success');
}

function hashPassword(pwd) {
  // 實際項目應該使用 bcrypt 等加密
  return btoa(encodeURIComponent(pwd));
}