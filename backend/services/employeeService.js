const pool = require("../config/db");

class EmployeeService {
  static async getAllEmployees() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM employees");
    conn.release();
    return rows;
  }

  static async getEmployeeById(id) {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM employees WHERE id = ?", [id]);
    conn.release();
    return rows[0];
  }

  static async createEmployee(name, position, salary) {
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)", [name, position, salary]);
    conn.release();
    return result;
  }

  static async updateEmployee(id, name, position, salary) {
    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?", [name, position, salary, id]);
    conn.release();
    return result;
  }

  static async deleteEmployee(id) {
    const conn = await pool.getConnection();
    
    try {
      await conn.query("DELETE FROM employees WHERE id = ?", [id]);
  
      const rows = await conn.query("SELECT id FROM employees ORDER BY id ASC");
  
      let newId = 1;
      for (let row of rows) {
        await conn.query("UPDATE employees SET id = ? WHERE id = ?", [newId, row.id]);
        newId++;
      }
      
      await conn.query("ALTER TABLE employees AUTO_INCREMENT = ?", [newId]);
  
      conn.release();
      return { message: "Karyawan berhasil dihapus dan ID telah diperbarui" };
    } catch (error) {
      conn.release();
      throw error;
    }
  }
  
}

module.exports = EmployeeService;
