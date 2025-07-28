// 發布公告
document.getElementById('post-announcement').addEventListener('click', function() {
  const title = document.getElementById('announcement-title').value;
  const content = document.getElementById('announcement-text').value;
  const priority = document.getElementById('announcement-priority').value;
  
  if (!title || !content) {
    alert('請填寫標題同內容');
    return;
  }

  fetch('/api/announcements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    },
    body: JSON.stringify({
      title,
      content,
      priority,
      author: currentUser.staffId
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('公告發布成功！');
      loadAnnouncements(); // 重新載入公告列表
      document.getElementById('announcement-text').value = '';
      document.getElementById('announcement-title').value = '';
    } else {
      alert('發布失敗: ' + data.message);
    }
  });
});

// 載入現有公告
function loadAnnouncements() {
  fetch('/api/announcements', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    }
  })
  .then(response => response.json())
  .then(data => {
    const listContainer = document.getElementById('announcement-list');
    listContainer.innerHTML = '';
    
    data.announcements.forEach(ann => {
      const annItem = document.createElement('div');
      annItem.className = 'announcement-item';
      annItem.innerHTML = `
        <h5>${ann.title} <span class="priority-badge ${ann.priority}">${ann.priority}</span></h5>
        <p>${ann.content}</p>
        <small>發布時間: ${new Date(ann.created_at).toLocaleString()} | 發布人: ${ann.author}</small>
        <button class="btn btn-sm btn-danger delete-ann" data-id="${ann.id}">刪除</button>
      `;
      listContainer.appendChild(annItem);
    });
    
    // 綁定刪除按鈕事件
    document.querySelectorAll('.delete-ann').forEach(btn => {
      btn.addEventListener('click', function() {
        const annId = this.getAttribute('data-id');
        deleteAnnouncement(annId);
      });
    });
  });
}

// 刪除公告
function deleteAnnouncement(annId) {
  if (!confirm('確定要刪除此公告？')) return;
  
  fetch(`/api/announcements/${annId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      loadAnnouncements();
    }
  });
}

// 頁面載入時自動加載公告
document.addEventListener('DOMContentLoaded', loadAnnouncements);