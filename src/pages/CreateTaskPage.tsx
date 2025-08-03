import TaskForm from "../components/TaskForm";
import type { Task } from "../types";

interface Props {
  onCreate: (task: Task) => void;
}

export default function CreateTaskPage({ onCreate }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Criar Nova Tarefa</h1>
      <TaskForm onCreate={onCreate} />
    </div>
  );
}
