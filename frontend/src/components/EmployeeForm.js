import React, { useState } from "react";
import { createEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee({ name, position, salary });
    navigate("/");
  };

  return (
    <div>
      <h2>Tambah Karyawan</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Jabatan" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <input type="number" placeholder="Gaji" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
