import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from './cookieUtils';

interface Task {
  id: number;
  title: string;
  completion: boolean;
}

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const idToken = getCookie('idToken');
    if (!idToken) return;

    try {
      const response = await axios.get(`http://localhost:5000/tasks/${idToken}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() === '') return;

    const idToken = getCookie('idToken');
    if (!idToken) return;

    try {
      await axios.post(`http://localhost:5000/tasks/${idToken}`, {
        title: newTask
      });
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    const idToken = getCookie('idToken');
    if (!idToken) return;

    try {
      await axios.put(`http://localhost:5000/tasks/${idToken}/${task.id}`, {
        title: task.title,
        completion: task.completion
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const idToken = getCookie('idToken');
    if (!idToken) return;

    try {
      await axios.delete(`http://localhost:5000/tasks/${idToken}/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskCompletion = (task: Task) => {
    handleUpdateTask({
      ...task,
      completion: !task.completion
    });
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditChange = (value: string) => {
    if (editingTask) {
      setEditingTask({
        ...editingTask,
        title: value
      });
    }
  };

  const saveEdit = async () => {
    if (editingTask) {
      await handleUpdateTask(editingTask);
      setEditingTask(null);
    }
  };

  return (
    <div>
      <form className="add-task-form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
        <input
          className="add-task-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button className="add-task-button" type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask?.id === task.id ? (
              <form onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => handleEditChange(e.target.value)}
                  onBlur={saveEdit}
                  autoFocus
                />
              </form>
            ) : (
              <>
                <span style={{ textDecoration: task.completion ? 'line-through' : 'none' }}>
                  <label onClick={() => toggleTaskCompletion(task)}>{task.title}</label>
                </span>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;