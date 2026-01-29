// src/pages/Tasks.tsx
import TaskView from "../components/tasks/TaskView";
import { useTasks } from "../hooks/useTasks";

function Tasks() {
  // Auth0 未導入期間の暫定
  const auth0UserId = "auth0|admin-user";

  const {
    tasks,
    loading,
    submitting,
    error,
    addTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks(auth0UserId);

  return (
    <TaskView
      tasks={tasks}
      loading={loading}
      error={error}
      submitting={submitting}
      onAddTask={addTask}
      onUpdateStatus={updateTaskStatus}
      onDelete={deleteTask}
    />
  );
}

export default Tasks;
