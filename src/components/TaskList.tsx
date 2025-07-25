import type { Task } from "../types";

interface Props {
    tasks: Task[];
    onToggleSubTask: (taskId: string, subIndex: number) => void;
}

export default function TaskList({ tasks, onToggleSubTask}: Props) {
    if (tasks.length === 0) {
        return <p className="text-gray-500">Nenhuma tarefa encontrada</p>
    }

    return (
        <div className="mt-6 space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className="border p-4 rounded shadow">
                    <h3 className="text-lg font-bold mb-1">{task.name}</h3>
                    <p className="text-sm text-gray-600">Total: {task.total} | Divisão: {task.division}</p>
                    <ul className="mt-2 text-sm list-disc list-inside">
                        {task.subtasks.map((subtask, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <input type="checkbox" checked={subtask.completed} onChange={() => onToggleSubTask(task.id, i)} />
                                
                                <span>
                                {subtask.time} - {subtask.amount} - {" "} 
                                {subtask.completed ? "✅" : "❌"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}