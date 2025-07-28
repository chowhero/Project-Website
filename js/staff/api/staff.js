// 獲取職員列表 (只有owner可以訪問)
app.get('/api/staff', authenticateStaff, (req, res) => {
  if (req.user.type !== 'owner') {
    return res.status(403).json({ error: '無權限' });
  }
  
  db.query('SELECT id, staff_id, name, type, created_at FROM staff WHERE type != "owner" ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ staff: results });
  });
});

// 新增職員 (只有owner可以訪問)
app.post('/api/staff', authenticateStaff, (req, res) => {
  if (req.user.type !== 'owner') {
    return res.status(403).json({ error: '無權限' });
  }
  
  const { staffId, name, password, type } = req.body;
  
  // 密碼加密
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ success: false, message: 'Password hash error' });
    
    db.query(
      'INSERT INTO staff (staff_id, name, password, type) VALUES (?, ?, ?, ?)',
      [staffId, name, hash, type],
      (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.json({ success: false, message: '職員編號已存在' });
          }
          return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true });
      }
    );
  });
});

// 刪除職員 (只有owner可以訪問)
app.delete('/api/staff/:id', authenticateStaff, (req, res) => {
  if (req.user.type !== 'owner') {
    return res.status(403).json({ error: '無權限' });
  }
  
  // 不能刪除自己
  if (parseInt(req.params.id) === req.user.id) {
    return res.status(400).json({ error: '不能刪除自己' });
  }
  
  db.query('DELETE FROM staff WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

module.exports = (pool) => {
  const router = require('express').Router();
  const bcrypt = require('bcrypt');

  // Staff login
  router.post('/login', async (req, res) => {
    const { staffId, password } = req.body;
    
    try {
      const [staff] = await pool.query(
        'SELECT * FROM staff WHERE staff_id = ?',
        [staffId]
      );
      
      if (staff.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const isValid = await bcrypt.compare(password, staff[0].password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Create token (simplified - use JWT in production)
      const token = 'generated-token-here';
      res.json({ 
        success: true, 
        token,
        userType: staff[0].type 
      });
    } catch (err) {
      res.status(500).json({ error: 'Database error' });
    }
  });

  // Add new staff (owner only)
  router.post('/', authenticateStaff, async (req, res) => {
    if (req.user.type !== 'owner') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const { staffId, name, password, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      await pool.query(
        `INSERT INTO staff 
        (staff_id, name, password, type) 
        VALUES (?, ?, ?, ?)`,
        [staffId, name, hashedPassword, type]
      );
      res.json({ success: true });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Staff ID already exists' });
      }
      res.status(500).json({ error: 'Database error' });
    }
  });

  return router;
};


// Example: Posting an announcement
async function postAnnouncement() {
  const data = {
    title: document.getElementById('announce-title').value,
    content: document.getElementById('announce-content').value,
    priority: document.getElementById('announce-priority').value
  };
  
  try {
    const response = await fetch('/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('staffToken')}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to post');
    alert('Announcement posted successfully!');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// Example: Fetching announcements for inter.html
async function loadAnnouncements() {
  try {
    const response = await fetch('/api/announcements');
    const announcements = await response.json();
    
    const container = document.getElementById('announcements-container');
    container.innerHTML = announcements.map(ann => `
      <div class="announcement ${ann.priority}">
        <h3>${ann.title}</h3>
        <p>${ann.content}</p>
        <small>${new Date(ann.created_at).toLocaleString()}</small>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load announcements:', error);
  }
}
