import TaskList from "../components/TaskList";
import type { Task } from "../types";

interface Props {
  tasks: Task[];
  onToggleSubTask: (taskId: string, subIndex: number) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (updatedTask: Task) => void;
}

export default function TaskOverviewPage({
  tasks,
  onToggleSubTask,
  onDeleteTask,
  onEditTask,
}: Props) {
  return (
    <div className="text-2xl font-bold mb-6">
      <h1>Tarefas do Dia</h1>
      <TaskList
        tasks={tasks}
        onToggleSubTask={onToggleSubTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
    </div>
  );
}
