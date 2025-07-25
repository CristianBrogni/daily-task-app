import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import type { Task } from './types'
import { saveTasks, loadTasks } from './utils/storage'
import TaskList from './components/TaskList'

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  const handleCreateTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleToggleSubTask = (taskId: string, subIndex: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id != taskId) return task;

      const newTasks = task.subtasks.map((sub, i) => i === subIndex ? {...sub, completed: !sub.completed} : sub);

      return { ...task, subtasks: newTasks};
  });

  setTasks(newTasks);
  saveTasks(newTasks);
};

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tarefas do Dia</h1>
      <TaskForm onCreate={handleCreateTask} />
      <TaskList tasks={tasks} onToggleSubTask={handleToggleSubTask}/>
    </main>
  );
}

export default App;
