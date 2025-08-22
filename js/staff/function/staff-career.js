document.getElementById('post-job').addEventListener('click', function() {
  const jobData = {
    title: document.getElementById('job-title').value,
    department: document.getElementById('job-department').value,
    location: document.getElementById('job-location').value,
    description: document.getElementById('job-description').value,
    requirements: document.getElementById('job-requirements').value,
    link: document.getElementById('job-link').value,
    author: currentUser.staffId
  };
  
  // 簡單驗證
  if (!jobData.title || !jobData.description || !jobData.link) {
    alert('請填寫必填字段');
    return;
  }
  
  fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    },
    body: JSON.stringify(jobData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('招聘信息發布成功！');
      loadJobs(); // 重新載入招聘列表
      // 清空表單
      document.getElementById('job-title').value = '';
      document.getElementById('job-description').value = '';
      document.getElementById('job-requirements').value = '';
      document.getElementById('job-link').value = '';
    } else {
      alert('發布失敗: ' + data.message);
    }
  });
});

// 載入現有招聘信息
function loadJobs() {
  fetch('/api/jobs', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    }
  })
  .then(response => response.json())
  .then(data => {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';
    
    data.jobs.forEach(job => {
      const jobItem = document.createElement('div');
      jobItem.className = 'col-md-4 mb-4';
      jobItem.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${job.department} · ${job.location}</h6>
            <p class="card-text">${job.description.substring(0, 100)}...</p>
            <a href="${job.link}" class="card-link" target="_blank">申請連結</a>
          </div>
          <div class="card-footer">
            <small class="text-muted">發布: ${new Date(job.created_at).toLocaleDateString()}</small>
            <button class="btn btn-sm btn-danger float-right delete-job" data-id="${job.id}">刪除</button>
          </div>
        </div>
      `;
      jobList.appendChild(jobItem);
    });
    
    // 綁定刪除按鈕事件
    document.querySelectorAll('.delete-job').forEach(btn => {
      btn.addEventListener('click', function() {
        const jobId = this.getAttribute('data-id');
        deleteJob(jobId);
      });
    });
  });
}

// 刪除招聘信息
function deleteJob(jobId) {
  if (!confirm('確定要刪除此招聘信息？')) return;
  
  fetch(`/api/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      loadJobs();
    }
  });
}

// 頁面載入時自動加載招聘信息
document.addEventListener('DOMContentLoaded', loadJobs);