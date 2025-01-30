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
        salary DECIMAL(10,0) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
  `INSERT INTO company_db.employees (name, position, salary) VALUES 
      ('Frengky Soritua Manurung', 'DevOps Engineer', 7000000),
      ('Siti Aminah', 'Backend Developer', 5500000),
      ('Budi Santoso', 'Project Manager', 12000000)`,
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

    // Panggil fungsi untuk mengambil data dengan format Rupiah
    await getEmployees();
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat migrasi:", error);
  } finally {
    if (connection) await connection.release(); // Pastikan koneksi dikembalikan ke pool
    await pool.end(); // Tutup pool setelah selesai
  }
})();

/**
 * Fungsi untuk mengambil data dengan format Rupiah
 */
async function getEmployees() {
  let connection;
  try {
    connection = await pool.getConnection();
    const results = await connection.query(`
      SELECT id, name, position, 
             CONCAT('Rp ', REPLACE(FORMAT(salary, 0), ',', '.')) AS salary_rupiah, 
             created_at, updated_at 
      FROM company_db.employees
    `);

    console.log("📜 Data Karyawan:");
    console.table(results);
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat mengambil data karyawan:", error);
  } finally {
    if (connection) await connection.release();
  }
}
