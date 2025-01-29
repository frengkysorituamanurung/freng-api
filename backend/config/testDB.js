const mariadb = require("mariadb");
require("dotenv").config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,       // Nama container database
  port: process.env.DB_PORT,       // Port database (3307)
  user: process.env.DB_USER,       // Username database (root)
  password: process.env.DB_PASSWORD, // Password database
  database: process.env.DB_NAME,   // Nama database (company_db)
  connectionLimit: 5,              // Batasi jumlah koneksi
  acquireTimeout: 10000,           // Waktu tunggu koneksi (10 detik)
});

async function testConnection() {
  let conn;
  try {
    console.log("🔍 Checking database connection...");

    conn = await pool.getConnection();
    const rows = await conn.query("SELECT NOW() as currentTime;");

    console.log("✅ Connected to MariaDB!");
    console.log("🕒 Current Database Time:", rows[0].currentTime);

  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  } finally {
    if (conn) conn.release(); // Pastikan koneksi dilepaskan setelah selesai
    process.exit(); // Keluar dari proses setelah eksekusi selesai
  }
}

testConnection();
