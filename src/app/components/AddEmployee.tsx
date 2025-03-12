"use client";

import { useEmployee } from "@/hooks/useEmployee";
import { EmployeePayload } from "@/types";
import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface AddEmployeeProps {
  show: boolean;
  onHide: () => void;
}

export default function AddEmployee({ show, onHide }: AddEmployeeProps) {
  const { createEmployeeMutation: mutation } = useEmployee();
  const [employee, setEmployee] = useState<EmployeePayload>({
    name: "",
    position: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutation.mutate(employee, {
      onSuccess: () => {
        setEmployee({ name: "", position: "" });
        onHide();
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold">
          <i className="bi bi-person-plus-fill me-2"></i>
          Tambah Karyawan Baru
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nama Karyawan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama karyawan"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Posisi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan posisi karyawan"
              value={employee.position}
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
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
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Menambahkan...
              </>
            ) : (
              "Simpan"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
