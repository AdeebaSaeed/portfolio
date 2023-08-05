// db.js
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'eu-cdbr-west-03.cleardb.net',
  user: 'b13efadba3264b',
  password: '0c955f3b',
  database: 'heroku_17e924704263cd7',
});

module.exports = pool;
