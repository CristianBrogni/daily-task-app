import TaskList from "../components/TaskList";
import type { Task } from "../types";

interface CompletedTaskPageProps {
  tasks: Task[];
  onToggleSubTask: (taskId: string, subIndex: number) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (updatedTask: Task) => void;
}

export default function CompletedTaskPage({
  tasks,
  onToggleSubTask,
  onDeleteTask,
  onEditTask,
}: CompletedTaskPageProps) {
  const completedTasks = tasks.filter(
    (task) =>
      task.subtasks.length > 0 && task.subtasks.every((sub) => sub.completed)
  );

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6"> Tarefas Conlcuídas </h1>
      {completedTasks.length > 0 ? (
        <TaskList
          tasks={completedTasks}
          onToggleSubTask={onToggleSubTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ) : (
        <p className="text-gray-500"> Nenhuma tarefa Concluída. </p>
      )}
    </main>
  );
}
