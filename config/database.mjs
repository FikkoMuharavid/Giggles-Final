// config/db.js
import mysql from 'mysql2/promise';

// Membuat koneksi pool ke database
const database = mysql.createPool({
  host: 'localhost',        // Sesuaikan dengan host database Anda
  port: 3306,               // Port default MySQL
  user: 'root',             // Username database
  password: '',             // Password database
  database: "giggle",      // Nama database
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Menguji koneksi ke database
database
  .getConnection()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error(`Connection to database FAILED! ${err}`));

export default database;
