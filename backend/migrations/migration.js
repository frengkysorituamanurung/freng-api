const mariadb = require("mariadb");
const dotenv = require("dotenv");

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
});

const queries = [
  `DROP DATABASE IF EXISTS company_db`,
  `CREATE DATABASE company_db`,
  `USE company_db`,
  `CREATE TABLE company_db.employees (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
  `INSERT INTO company_db.employees (name, position, salary) VALUES 
      ('John Doe', 'Software Engineer', 75000.00),
      ('Jane Smith', 'Project Manager', 90000.00),
      ('Alice Johnson', 'UI/UX Designer', 65000.00),
      ('Bob Brown', 'Data Scientist', 85000.00),
      ('Charlie Wilson', 'DevOps Engineer', 70000.00)`,
];

(async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("🚀 Migration dimulai!");

    for (const query of queries) {
      await connection.query(query);
      console.log(`✅ Query berhasil dieksekusi:\n${query}\n`);
    }

    console.log("🎉 Migrasi berhasil dengan data dummy dimasukkan!");
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat migrasi:", error);
  } finally {
    if (connection) await connection.release(); // Pastikan koneksi dikembalikan ke pool
    await pool.end(); // Tutup pool setelah selesai
  }
})();
