export interface Employee {
  id: number;
  name: string;
  position: string;
  tasks: Task[];
}

export interface EmployeePayload {
  name: string;
  position: string;
}

export interface Task {
  id: number;
  employees_id: string;
  task_name: string;
  due_date: string;
}

export interface TaskPayload {
  employees_id: string;
  task_name: string;
  due_date: string;
}
