// 公告數據存儲
let announcements = JSON.parse(localStorage.getItem('announcements')) || [];

function showAnnouncementPanel() {
  return `
    <div class="panel-header">
      <h2><i class="icon-megaphone"></i> 公告發佈</h2>
      <button onclick="showStaffDashboard(currentUserType)" class="back-btn">
        <i class="icon-arrow-left"></i> 返回
      </button>
    </div>
    
    <div class="panel-content">
      <div class="form-group">
        <label>公告標題</label>
        <input type="text" id="announcementTitle" placeholder="輸入標題">
      </div>
      
      <div class="form-group">
        <label>公告內容</label>
        <textarea id="announcementContent" rows="6" placeholder="輸入詳細內容..."></textarea>
      </div>
      
      <div class="form-actions">
        <button onclick="postAnnouncement()" class="btn-primary">
          <i class="icon-send"></i> 發佈公告
        </button>
        <button onclick="previewAnnouncement()" class="btn-secondary">
          <i class="icon-eye"></i> 預覽
        </button>
      </div>
      
      <div id="announcementPreview" class="preview-container"></div>
      
      <div class="recent-announcements">
        <h3>近期公告</h3>
        <div id="announcementList"></div>
      </div>
    </div>
  `;
}

function postAnnouncement() {
  const title = document.getElementById('announcementTitle').value;
  const content = document.getElementById('announcementContent').value;
  
  if (!title || !content) {
    showAlert('請填寫標題和內容', 'error');
    return;
  }

  const newAnnouncement = {
    id: 'ANN-' + Date.now(),
    title,
    content,
    date: new Date().toLocaleString(),
    author: currentUserType
  };

  announcements.unshift(newAnnouncement);
  localStorage.setItem('announcements', JSON.stringify(announcements));
  
  updateAnnouncementList();
  showAlert('公告已發佈！', 'success');
}

function updateAnnouncementList() {
  const container = document.getElementById('announcementList');
  container.innerHTML = announcements.slice(0, 5).map(ann => `
    <div class="announcement-item">
      <h4>${ann.title}</h4>
      <p>${ann.content.substring(0, 50)}...</p>
      <small>${ann.date} • ${ann.author}</small>
    </div>
  `).join('');
}


