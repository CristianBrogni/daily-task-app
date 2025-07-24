import { useState } from 'react'
import TaskForm from './components/TaskForm'
import type { Task } from './types'
import './App.css'

function App() {
  const handleCreateTask = (task: Task) => {
    console.log("Nova tarefa criada:", task);
    // Aqui você pode salvar no LocalStorage ou no estado
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <TaskForm onCreate={handleCreateTask} />
    </div>
  );
}

export default App
