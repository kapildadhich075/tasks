import React, { useState, useEffect } from "react";

import { Task } from "../constants/interface_task";
import {
  AppContainer,
  TaskInput,
  Button,
  TaskList,
  TaskItem,
} from "../style/TaskStyle";

const TaskManagementApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    if (newTask.trim() === "") return;

    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, text: newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      // Add new task
      const newTaskObject: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
    }
    setNewTask("");
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task: Task): void => {
    setEditingTask(task);
    setNewTask(task.text);
  };

  return (
    <AppContainer>
      <h1>Task Management App</h1>
      <TaskInput
        type="text"
        value={newTask}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTask(e.target.value)
        }
        placeholder="Enter a new task"
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.key === "Enter" && addTask()
        }
      />
      <Button onClick={addTask}>
        {editingTask ? "Update Task" : "Add Task"}
      </Button>

      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id} $completed={task.completed}>
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <div>
              <Button className="edit" onClick={() => startEditing(task)}>
                Edit
              </Button>
              <Button className="delete" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          </TaskItem>
        ))}
      </TaskList>
    </AppContainer>
  );
};

export default TaskManagementApp;
