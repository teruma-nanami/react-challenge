// src/hooks/useTaskForm.ts
import { useState } from "react";
import type { TaskStatus } from "../types/task";

type AddTaskParams = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
};

export function useTaskForm(
  onAddTask: (params: AddTaskParams) => Promise<void>,
) {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [dueDate, setDueDate] = useState("");

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const reset = () => {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setDueDate("");
  };

  const submit = async () => {
    await onAddTask({
      title,
      description,
      status,
      dueDate,
    });

    reset();
    close();
  };

  return {
    // modal
    isOpen,
    open,
    close,

    // values
    title,
    description,
    status,
    dueDate,

    // setters
    setTitle,
    setDescription,
    setStatus,
    setDueDate,

    // action
    submit,
  };
}
