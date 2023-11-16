const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10, // Maximum number of connections in the pool
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

module.exports = pool;
