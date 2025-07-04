import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setUsername(savedUsername);
    setTasks(savedTasks);
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleToggle = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleEdit = (id, newTitle, newDesc) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, title: newTitle, description: newDesc } : t
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mr-52 md:mr-0 mb-6 text-center flex items-center text-gray-800 dark:text-white">
        <span className="hidden md:block">Welcome,</span> {username} 👋
      </h1>

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        {/* Left: Task Form */}
        <div className="md:w-1/2">
          <TaskForm onAddTask={handleAddTask} />
        </div>

        {/* Right: Task Filters & List */}
        <div className="md:w-1/2">
          <TaskFilter
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            tasks={tasks}
          />
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
