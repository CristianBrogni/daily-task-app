import { useState } from "react";
import type { Task } from "../types";
import { Trash2, Pencil, Check, X } from "lucide-react";

interface Props {
  tasks: Task[];
  onToggleSubTask: (taskId: string, subIndex: number) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (updateTask: Task) => void;
}

export default function TaskList({
  tasks,
  onToggleSubTask,
  onDeleteTask,
  onEditTask,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [EditingSubtask, setEditingSubtask] = useState<{
    taskId: string;
    subIndex: number;
  } | null>(null);
  const [editedTime, setEditedTime] = useState("");
  const [editedAmount, setEditedAmount] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  if (tasks.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa encontrada</p>;
  }

  const isTaskCompleted = (task: Task) =>
    task.subtasks.length > 0 &&
    task.subtasks.every((sub) => sub.completed === true);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(search.toLocaleLowerCase());

    const matchesStatus =
      status === "all"
        ? true
        : status === "completed"
        ? isTaskCompleted(task)
        : !isTaskCompleted(task);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mt-6 space-y-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar tarefa..."
          className="border rounded p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="pending">Pendentes</option>
        </select>
      </div>

      {filteredTasks.map((task) => {
        const total = task.subtasks.length;
        const completed = task.subtasks.filter((s) => s.completed).length;
        const porcentage = Math.round((completed / total) * 100);
        const isEditing = editingId === task.id;

        return (
          <div key={task.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-1">
              {isEditing ? (
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-lg font-bold border px-2 py-1 rounded w-full mr-2"
                />
              ) : (
                <h3 className="text-lg font-bold">{task.name}</h3>
              )}
              <div className="flex gap=-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        onEditTask({ ...task, name: editedName });
                        setEditingId(null);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(task.id);
                        setEditedName(task.name);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm transition"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Tem certeza que deseja excluir esta tarefa?"
                          )
                        ) {
                          onDeleteTask(task.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" /> Excluir
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Total: {task.total} | Divisão: {task.division}
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-3 rounded overflow-hidden mb-2">
              <div
                className={`h-full transmission-all duration-300 ${
                  porcentage === 100
                    ? "bg-green-500"
                    : porcentage >= 67
                    ? "bg-blue-500"
                    : porcentage >= 34
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${porcentage}%` }}
              ></div>
            </div>

            <ul className="mt-2 text-sm list-disc list-inside">
              {task.subtasks.map((subtask, i) => {
                const isEditingSub =
                  EditingSubtask?.taskId === task.id &&
                  EditingSubtask.subIndex === i;

                return (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => onToggleSubTask(task.id, i)}
                    />
                    {isEditingSub ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="time"
                          value={editedTime}
                          onChange={(e) => setEditedTime(e.target.value)}
                          className="border p-1 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={editedAmount}
                          onChange={(e) =>
                            setEditedAmount(Number(e.target.value))
                          }
                          className="border p-1 w-20 rounded text-sm"
                        />
                        <button
                          className="text-green-600 text-xs"
                          onClick={() => {
                            const updatedSubtasks = task.subtasks.map(
                              (s, idx) =>
                                idx === i
                                  ? {
                                      ...s,
                                      time: editedTime,
                                      amount: editedAmount,
                                    }
                                  : s
                            );
                            onEditTask({ ...task, subtasks: updatedSubtasks });
                            setEditingSubtask(null);
                          }}
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <>
                        <span>
                          {subtask.time} - {subtask.amount} -{" "}
                          {subtask.completed ? "✅" : "❌"}
                        </span>
                        <button
                          className="text-blue-600 text-xs"
                          onClick={() => {
                            setEditingSubtask({ taskId: task.id, subIndex: i });
                            setEditedTime(subtask.time);
                            setEditedAmount(subtask.amount);
                          }}
                        >
                          Editar
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
