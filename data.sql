-- 公告表
CREATE TABLE announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority ENUM('normal', 'important', 'urgent') DEFAULT 'normal',
  author VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 招聘表
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  link VARCHAR(255) NOT NULL,
  author VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 職員表 (已存在，但需要添加name字段)
ALTER TABLE staff ADD COLUMN name VARCHAR(100) AFTER staff_id;

-- 公告表 (用於首頁)
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 招聘表 (用於招聘頁)
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    apply_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);