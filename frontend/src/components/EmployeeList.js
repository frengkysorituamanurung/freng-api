import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa"; // Import icons
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Fungsi untuk format Rupiah
const formatRupiah = (angka) => {
  return `Rp ${Number(angka).toLocaleString("id-ID")}`;
};

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
    if (window.confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📋 Daftar Karyawan</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          <FaUserPlus /> Tambah Karyawan
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Gaji</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{formatRupiah(emp.salary)}</td>
                <td className="text-center">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate(`/edit/${emp.id}`)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <FaTrash /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {employees.length === 0 && (
        <p className="text-center text-muted">Belum ada karyawan yang terdaftar.</p>
      )}
    </div>
  );
};

export default EmployeeList;