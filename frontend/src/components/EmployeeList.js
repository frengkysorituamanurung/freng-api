import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Daftar Karyawan</h2>
      <button onClick={() => navigate("/add")}>Tambah Karyawan</button>
      <table border="1">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Gaji</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => navigate(`/edit/${emp.id}`)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
