"use client";

import { useTask } from "@/hooks/useTask";
import { TaskPayload } from "@/types";
import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface AddTaskProps {
  show: boolean;
  onHide: () => void;
  employeeId: string | number;
}

export default function AddTask({ show, onHide, employeeId }: AddTaskProps) {
  const { createTaskMutation: mutation } = useTask();
  const [task, setTask] = useState<TaskPayload>({
    employees_id: employeeId.toString(),
    task_name: "",
    due_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    setTask((prev) => ({ ...prev, employees_id: employeeId.toString() }));
  }, [employeeId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutation.mutate(task, {
      onSuccess: () => {
        setTask({
          employees_id: employeeId.toString(),
          task_name: "",
          due_date: new Date().toISOString().split("T")[0],
        });
        onHide();
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold">
          <i className="bi bi-clipboard-plus me-2"></i> Tambah Tugas Baru
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nama Tugas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Tugas"
              value={task.task_name}
              onChange={(e) => setTask({ ...task, task_name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tenggat Waktu</Form.Label>
            <Form.Control
              type="date"
              value={task.due_date}
              onChange={(e) => setTask({ ...task, due_date: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onHide}>
            Batal
          </Button>
          <Button type="submit" variant="primary" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Spinner size="sm" animation="border" className="me-2" />
            ) : (
              "Simpan"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
