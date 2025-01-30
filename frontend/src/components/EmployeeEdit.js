import React, { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSave } from "react-icons/fa"; // Ikon alternatif

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    fetchEmployee();
  },);

  const fetchEmployee = async () => {
    try {
      const data = await getEmployeeById(id);
      setName(data.name);
      setPosition(data.position);
      setSalary(data.salary);
    } catch (error) {
      console.error("Gagal mengambil data karyawan", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, { name, position, salary });
      navigate("/");
    } catch (error) {
      console.error("Gagal memperbarui data", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">✏️ Edit Karyawan</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jabatan</label>
            <input
              type="text"
              className="form-control"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gaji</label>
            <input
              type="number"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-10">
            <FaSave /> Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
