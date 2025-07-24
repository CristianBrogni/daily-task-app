import { useState } from "react";
import type { Task, SubTask } from "../types";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
  onCreate: (task: Task) => void;
}

export default function TaskForm({ onCreate }: TaskFormProps) {
  const [nome, setNome] = useState("");
  const [total, setTotal] = useState(4);
  const [divisao, setDivisao] = useState(4);
  const [horarios, setHorarios] = useState<string[]>(Array(4).fill(""));

  const handleHorarioChange = (index: number, value: string) => {
    const novosHorarios = [...horarios];
    novosHorarios[index] = value;
    setHorarios(novosHorarios);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quantidadePorSub = total / divisao;

    const subtarefas: SubTask[] = horarios.map((horario) => ({
      horario,
      quantidade: quantidadePorSub,
      concluido: false,
    }));

    const novaTask: Task = {
      id: uuidv4(),
      nome,
      total,
      divisao,
      horarios,
      criadoEm: new Date().toISOString(),
      subtarefas,
    };

    onCreate(novaTask);

    // Limpar o formulário
    setNome("");
    setTotal(2000);
    setDivisao(4);
    setHorarios(Array(4).fill(""));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold">Criar Nova Tarefa</h2>

      <div>
        <label className="block text-sm font-medium">Nome da tarefa</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
        <label className="block text-sm font-medium">Dividir em quantas vezes?</label>
        <input
          type="number"
          min={1}
          value={divisao}
          onChange={(e) => {
            const val = Number(e.target.value);
            setDivisao(val);
            setHorarios(Array(val).fill(""));
          }}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Horários</label>
        <div className="grid grid-cols-2 gap-2">
          {horarios.map((horario, index) => (
            <input
              key={index}
              type="time"
              value={horario}
              onChange={(e) => handleHorarioChange(index, e.target.value)}
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
