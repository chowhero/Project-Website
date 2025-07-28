// 職位數據存儲
let jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];

function showCareerPanel() {
  return `
    <div class="panel-header">
      <h2><i class="icon-briefcase"></i> 招聘管理</h2>
      <button onclick="showStaffDashboard(currentUserType)" class="back-btn">
        <i class="icon-arrow-left"></i> 返回
      </button>
    </div>
    
    <div class="panel-tabs">
      <button class="tab-btn active" data-tab="postJob">發佈職位</button>
      <button class="tab-btn" data-tab="manageJobs">管理職位</button>
    </div>
    
    <div id="careerTabContent">
      ${renderPostJobForm()}
    </div>
  `;
}

function renderPostJobForm() {
  return `
    <div class="tab-content active" data-tab="postJob">
      <div class="form-group">
        <label>職位名稱</label>
        <input type="text" id="jobTitle" placeholder="例如：前端工程師">
      </div>
      
      <div class="form-group">
        <label>部門</label>
        <select id="jobDepartment">
          <option value="technology">技術部</option>
          <option value="design">設計部</option>
          <option value="marketing">市場部</option>
        </select>
      </div>
      
      <button onclick="postJob()" class="btn-primary">
        <i class="icon-send"></i> 發佈職位
      </button>
    </div>
  `;
}

function postJob() {
  const title = document.getElementById('jobTitle').value;
  const department = document.getElementById('jobDepartment').value;
  
  if (!title) {
    showAlert('請填寫職位名稱', 'error');
    return;
  }

  const newJob = {
    id: 'JOB-' + Date.now(),
    title,
    department,
    status: 'open',
    postDate: new Date().toLocaleString(),
    postedBy: currentUserType
  };

  jobPostings.unshift(newJob);
  localStorage.setItem('jobPostings', JSON.stringify(jobPostings));
  
  showAlert('職位已發佈！', 'success');
  document.getElementById('jobTitle').value = '';
}