// 獲取招聘列表
app.get('/api/jobs', (req, res) => {
  db.query('SELECT * FROM jobs ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ jobs: results });
  });
});

// 發布新招聘
app.post('/api/jobs', authenticateStaff, (req, res) => {
  // 檢查權限 (owner、US HR 或 Division HR)
  if (req.user.type !== 'owner' && req.user.type !== 'US HR' && req.user.type !== 'Division HR') {
    return res.status(403).json({ error: '無權限' });
  }
  
  const { title, department, location, description, requirements, link } = req.body;
  
  db.query(
    'INSERT INTO jobs (title, department, location, description, requirements, link, author) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, department, location, description, requirements, link, req.user.staffId],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error' });
      res.json({ success: true });
    }
  );
});

// 刪除招聘 
app.delete('/api/jobs/:id', authenticateStaff, (req, res) => {
  // 檢查權限 (owner、US HR 或 Division HR)
  if (req.user.type !== 'owner' && req.user.type !== 'US HR' && req.user.type !== 'Division HR') {
    return res.status(403).json({ error: '無權限' });
  }
  
  db.query('DELETE FROM jobs WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

module.exports = (pool) => {
  const router = require('express').Router();

  // Get all jobs (for application.html)
  router.get('/', async (req, res) => {
    try {
      const [jobs] = await pool.query(
        'SELECT * FROM jobs ORDER BY created_at DESC'
      );
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: 'Database error' });
    }
  });

  // Create new job (from staff.html)
  router.post('/', authenticateStaff, async (req, res) => {
    const { title, department, description, requirements, apply_url } = req.body;
    
    try {
      const [result] = await pool.query(
        `INSERT INTO jobs 
        (title, department, description, requirements, apply_url) 
        VALUES (?, ?, ?, ?, ?)`,
        [title, department, description, requirements, apply_url]
      );
      res.json({ success: true, id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Database error' });
    }
  });

  return router;
};
