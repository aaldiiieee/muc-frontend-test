"use client";

import { useEmployee } from "@/hooks/useEmployee";
import { useTask } from "@/hooks/useTask";
import { Employee } from "@/types";
import { useState } from "react";
import { Table, Button, Spinner, Card, Modal } from "react-bootstrap";

interface EmployeeTableProps {
  onAddTask: (employee: Employee) => void;
  onDeleteTask: (id: string) => void;
}

export default function EmployeeTable({ onAddTask }: EmployeeTableProps) {
  const {
    employeesQuery: { isLoading, error, data: employees },
  } = useEmployee();

  const { deleteTaskMutation } = useTask();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleShowConfirm = (taskId: string) => {
    setSelectedTaskId(taskId);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setSelectedTaskId(null);
    setShowConfirm(false);
  };

  const handleDelete = () => {
    if (selectedTaskId) {
      deleteTaskMutation.mutate(selectedTaskId, {
        onSuccess: () => {
          handleCloseConfirm();
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Memuat data karyawan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-danger text-center">
        <Card.Body className="p-4">
          <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
          <Card.Title className="mt-3">Terjadi Kesalahan</Card.Title>
          <Card.Text>
            Gagal memuat data karyawan. Silakan coba lagi nanti.
          </Card.Text>
          <Button variant="outline-primary">
            <i className="bi bi-arrow-clockwise me-2"></i> Muat Ulang
          </Button>
        </Card.Body>
      </Card>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <Card className="text-center border-0 shadow-sm">
        <Card.Body className="p-5">
          <i className="bi bi-people text-muted fs-1"></i>
          <Card.Title className="mt-3">Belum Ada Data Karyawan</Card.Title>
          <Card.Text>
            Silakan tambahkan karyawan baru menggunakan tombol di atas.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-section">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-3">#</th>
                <th>Nama Karyawan</th>
                <th>Posisi</th>
                <th>Task Name</th>
                <th>Due Date</th>
                <th className="text-end pe-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee: Employee, index: number) => (
                <tr key={employee.id}>
                  <td className="ps-3">{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>
                    {employee.tasks.map((task) => (
                      <ul key={task.id}>
                        <li>{task.task_name}</li>
                      </ul>
                    ))}
                  </td>
                  <td>
                    {employee.tasks.map((task) => (
                      <ul
                        key={task.id}
                        className="d-flex gap-2 align-items-center"
                      >
                        <li>{task.due_date}</li>
                        <Button
                          key={task.id}
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleShowConfirm(task.id.toString())}
                          className="ms-2"
                        >
                          <i className="bi bi-trash"></i> Hapus
                        </Button>
                      </ul>
                    ))}
                  </td>
                  <td className="text-end pe-3">
                    <Button
                      size="sm"
                      variant="outline-success ms-2"
                      onClick={() => onAddTask(employee)}
                    >
                      <i className="bi bi-plus-circle me-2"></i> Tambah Tugas
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">
            <i className="bi bi-trash me-2"></i>
            Konfirmasi Hapus
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus task ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
