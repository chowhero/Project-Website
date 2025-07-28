// 獲取公告列表
app.get('/api/announcements', (req, res) => {
  db.query('SELECT * FROM announcements ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ announcements: results });
  });
});

// 發布新公告
app.post('/api/announcements', authenticateStaff, (req, res) => {
  // 檢查權限 (owner 或 US HR)
  if (req.user.type !== 'owner' && req.user.type !== 'US HR') {
    return res.status(403).json({ error: '無權限' });
  }
  
  const { title, content, priority } = req.body;
  
  db.query(
    'INSERT INTO announcements (title, content, priority, author) VALUES (?, ?, ?, ?)',
    [title, content, priority, req.user.staffId],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error' });
      res.json({ success: true });
    }
  );
});

// 刪除公告
app.delete('/api/announcements/:id', authenticateStaff, (req, res) => {
  // 檢查權限 (owner 或 US HR)
  if (req.user.type !== 'owner' && req.user.type !== 'US HR') {
    return res.status(403).json({ error: '無權限' });
  }
  
  db.query('DELETE FROM announcements WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

module.exports = (pool) => {
  const router = require('express').Router();

  // Get all announcements (for inter.html)
  router.get('/', async (req, res) => {
    try {
      const [announcements] = await pool.query(
        'SELECT * FROM announcements ORDER BY created_at DESC LIMIT 5'
      );
      res.json(announcements);
    } catch (err) {
      res.status(500).json({ error: 'Database error' });
    }
  });

  // Create new announcement (from staff.html)
  router.post('/', authenticateStaff, async (req, res) => {
    const { title, content, priority } = req.body;
    
    try {
      const [result] = await pool.query(
        'INSERT INTO announcements (title, content, priority) VALUES (?, ?, ?)',
        [title, content, priority || 'medium']
      );
      res.json({ success: true, id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Database error' });
    }
  });

  return router;
};
