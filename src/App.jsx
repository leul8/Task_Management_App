import React, { useState, useEffect } from 'react';
import { CheckIcon, TrashIcon, SunIcon, MoonIcon } from '@heroicons/react/solid'; // Import the Sun and Moon Icons

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all'); // Default filter to show all tasks
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // Add new task
  const addTask = () => {
    if (!taskTitle.trim()) {
      alert('Task title cannot be empty.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDescription('');
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Set the task being edited
  const editTask = (task) => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setEditingTask(task); // Set the task being edited
    setIsModalOpen(true); // Open the modal
  };

  // Save the edited task
  const saveTask = () => {
    if (!taskTitle.trim()) {
      alert('Task title cannot be empty.');
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, title: taskTitle, description: taskDescription }
          : task
      )
    );
    closeModal(); // Close the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskTitle('');
    setTaskDescription('');
    setEditingTask(null);
  };

  // Filter tasks
  const filterTasks = (filter) => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  // Render Tasks based on the selected filter
  const renderTasks = () => {
    const filteredTasks = filterTasks(currentFilter);

    return filteredTasks.map((task) => (
      <div key={task.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:text-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => toggleTaskCompletion(task.id)}
            className={`p-2 rounded-full transition duration-200 ${task.completed ? 'bg-green-600 text-white' : 'bg-gray-300'}`}
          >
            <CheckIcon className="h-6 w-6" />
          </button>
          <div>
            <h3 className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-black dark:text-white'}`}>{task.title}</h3>
            <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600 dark:text-white'}`}>{task.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => editTask(task)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    ));
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode to the body and app container
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold dark:text-white">Task Manager</h1>
        <p className="text-gray-500 mt-2 dark:text-white">Organize your tasks with ease!</p>
      </header>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'text-white' : 'text-black'} transition`}
      >
        {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      </button>

      {/* Task Form */}
      <div className="mb-6 flex flex-col items-center">
        <input
          id="taskTitle"
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="mb-2 p-3 w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <input
          id="taskDescription"
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="mb-4 p-3 w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          onClick={addTask}
          className="p-3 w-64 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          Add Task
        </button>
      </div>

      <div className="mb-4 text-center">
        <button
          onClick={() => setCurrentFilter('all')}
          className="mx-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          All
        </button>
        <button
          onClick={() => setCurrentFilter('active')}
          className="mx-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Active
        </button>
        <button
          onClick={() => setCurrentFilter('completed')}
          className="mx-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Completed
        </button>
      </div>

      <div id="taskList" className="space-y-4">
        {renderTasks()}
      </div>

      <div id="taskCount" className="text-center mt-4 text-gray-600 dark:text-gray-400">
        {`Total Tasks: ${tasks.length} | Active: ${tasks.filter((task) => !task.completed).length} | Completed: ${tasks.filter((task) => task.completed).length}`}
      </div>

      {/* Edit Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 dark:bg-gray-700">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Edit Task</h3>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task Title"
              className="mb-2 p-3 w-full border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white"
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description"
              className="mb-4 p-3 w-full border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white"
            />
            <div className="flex justify-between">
              <button
                onClick={saveTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
