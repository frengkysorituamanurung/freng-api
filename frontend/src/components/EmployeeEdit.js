import React, { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const data = await getEmployeeById(id);
    setName(data.name);
    setPosition(data.position);
    setSalary(data.salary);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(id, { name, position, salary });
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Karyawan</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
