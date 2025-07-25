import { useState } from "react";
import type { Task, SubTask } from "../types";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
  onCreate: (task: Task) => void;
}

export default function TaskForm({ onCreate }: TaskFormProps) {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(4);
  const [division, setDivision] = useState(4);
  const [times, setTimes] = useState<string[]>(Array(4).fill(""));

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountPerSub = total / division;

    const subtasks: SubTask[] = times.map((time) => ({
      time,
      amount: amountPerSub,
      completed: false,
    }));

    const newTask: Task = {
      id: uuidv4(),
      name,
      total,
      division,
      times,
      createdAt: new Date().toISOString(),
      subtasks,
    };

    onCreate(newTask);

    // Clear the form
    setName("");
    setTotal(2000);
    setDivision(4);
    setTimes(Array(4).fill(""));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold">Criar Nova Tarefa</h2>

      <div>
        <label className="block text-sm font-medium">Nome da tarefa</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Quantidade total</label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Divide how many times?</label>
        <input
          type="number"
          min={1}
          value={division}
          onChange={(e) => {
            const val = Number(e.target.value);
            setDivision(val);
            setTimes(Array(val).fill(""));
          }}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Times</label>
        <div className="grid grid-cols-2 gap-2">
          {times.map((time, index) => (
            <input
              key={index}
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(index, e.target.value)}
              className="border p-2 rounded"
              required
            />
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Criar Tarefa
      </button>
    </form>
  );
}
