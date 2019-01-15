let Mysql = require('node-mysql-promise');
let mysql = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'crm'
})

module.exports = mysql