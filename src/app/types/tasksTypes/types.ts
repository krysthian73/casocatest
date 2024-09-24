export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
};

export type Column = {
  id: string;
  title: string;
  type: TaskStatus;
  tasks: Task[];
};

export type TaskStatus = "pending" | "in progress" | "completed";
