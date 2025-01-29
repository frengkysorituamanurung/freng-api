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
    const result = await conn.query("DELETE FROM employees WHERE id = ?", [id]);
    conn.release();
    return result;
  }
}

module.exports = EmployeeService;
