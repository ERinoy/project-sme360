const mysql = require('mysql2');
const path = require('path');
// This forces Node to find the .env file in the current folder
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("Connecting as user:", process.env.DB_USER); // Debug line

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sme_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();