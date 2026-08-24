// backend/config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Apna password yahan daalein
    database: 'portfolio_db'
});

db.connect(err => {
    if (err) console.error('Database Connection Error:', err);
    else console.log('Connected to MySQL Database');
});

module.exports = db;