const EmployeeService = require("../services/employeeService");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, position, salary } = req.body;
    await EmployeeService.createEmployee(name, position, salary);
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { name, position, salary } = req.body;
    await EmployeeService.updateEmployee(req.params.id, name, position, salary);
    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await EmployeeService.deleteEmployee(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };
