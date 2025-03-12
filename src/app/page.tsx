"use client";

import { useState } from "react";
import AddEmployee from "./components/AddEmployee";
import EmployeeTable from "./components/EmployeeTable";
import AddTask from "./components/AddTask";
import { Employee } from "@/types";

export default function Home() {
  const [showAddEmployee, setShowAddEmployee] = useState<boolean>(false);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleOpenAddTask = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowAddTask(true);
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Employee Task Management</h1>
        <button className="shadow-section bg-white p-2" onClick={() => setShowAddEmployee(true)}>
          <i className="bi bi-plus-circle me-2"></i> Tambah Karyawan
        </button>
      </div>

      <AddEmployee show={showAddEmployee} onHide={() => setShowAddEmployee(false)} />
      <AddTask 
        show={showAddTask} 
        onHide={() => setShowAddTask(false)} 
        employeeId={selectedEmployee?.id ?? ""} 
      />
      <EmployeeTable onAddTask={handleOpenAddTask} />
    </div>
  );
}
