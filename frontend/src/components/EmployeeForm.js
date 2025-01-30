import React, { useState } from "react";
import { createEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSave } from "react-icons/fa"; // Import ikon simpan

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !position || !salary) {
      setError("Semua bidang harus diisi!");
      return;
    }

    try {
      await createEmployee({ name, position, salary });
      navigate("/");
    } catch (err) {
      setError("Gagal menyimpan data. Coba lagi.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">➕ Tambah Karyawan</h2>
      <div className="card p-4 shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan nama"
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
              placeholder="Masukkan jabatan"
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
              placeholder="Masukkan gaji"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-10">
            <FaSave /> Simpan Karyawan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
