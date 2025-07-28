// 新增職員
document.getElementById('add-staff').addEventListener('click', function() {
  const staffData = {
    staffId: document.getElementById('new-staff-id').value,
    name: document.getElementById('new-staff-name').value,
    password: document.getElementById('new-staff-password').value,
    type: document.getElementById('new-staff-type').value
  };
  
  if (!staffData.staffId || !staffData.name || !staffData.password) {
    alert('請填寫所有字段');
    return;
  }
  
  fetch('/api/staff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    },
    body: JSON.stringify(staffData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('職員新增成功！');
      loadStaffList(); // 重新載入職員列表
      // 清空表單
      document.getElementById('new-staff-id').value = '';
      document.getElementById('new-staff-name').value = '';
      document.getElementById('new-staff-password').value = '';
    } else {
      alert('新增失敗: ' + data.message);
    }
  });
});

// 載入職員列表
function loadStaffList() {
  fetch('/api/staff', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    }
  })
  .then(response => response.json())
  .then(data => {
    const staffListBody = document.getElementById('staff-list-body');
    staffListBody.innerHTML = '';
    
    data.staff.forEach(staff => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${staff.staff_id}</td>
        <td>${staff.name}</td>
        <td>${staff.type}</td>
        <td>${new Date(staff.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-sm btn-danger delete-staff" data-id="${staff.id}">刪除</button>
        </td>
      `;
      staffListBody.appendChild(row);
    });
    
    // 綁定刪除按鈕事件
    document.querySelectorAll('.delete-staff').forEach(btn => {
      btn.addEventListener('click', function() {
        const staffId = this.getAttribute('data-id');
        deleteStaff(staffId);
      });
    });
  });
}

// 刪除職員
function deleteStaff(staffId) {
  if (!confirm('確定要刪除此職員？此操作無法撤銷！')) return;
  
  fetch(`/api/staff/${staffId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('staffToken')
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      loadStaffList();
    }
  });
}

// 頁面載入時自動加載職員列表
document.addEventListener('DOMContentLoaded', loadStaffList);