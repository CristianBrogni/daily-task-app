import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskOverviewPage from "./pages/TaskOvreviewPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import type { Task } from "./types";
import { saveTasks, loadTasks } from "./utils/storage";

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

      const updatedSubTasks = task.subtasks.map((sub, i) =>
        i === subIndex ? { ...sub, completed: !sub.completed } : sub
      );

      return { ...task, subtasks: updatedSubTasks };
    });

    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleEditText = (updatedTask: Task) => {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/">Tarefas</Link>
        <Link to="/criar">Nova Tarefa</Link>
      </nav>
      <main className="max-w-2xl mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <TaskOverviewPage
                tasks={tasks}
                onToggleSubTask={handleToggleSubTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditText}
              />
            }
          />
          <Route
            path="/criar"
            element={<CreateTaskPage onCreate={handleCreateTask} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
