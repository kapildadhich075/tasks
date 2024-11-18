import React, { useState, useEffect, useMemo } from "react";

import { Task } from "../constants/interface_task";
import {
  AppContainer,
  TaskInput,
  Button,
  TaskList,
  TaskItem,
} from "../style/TaskStyle";

type FilterType = "all" | "active" | "completed";

const TaskManagementApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filtered tasks with memoization
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const addTask = () => {
    if (!newTask.trim()) return;

    const newTaskObject: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
    setNewTask("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <AppContainer>
      <h1
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        Task Manager
      </h1>

      {/* Task Input */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <TaskInput
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <Button
          onClick={addTask}
          style={{
            marginBottom: "10px",
          }}
        >
          Add Task
        </Button>
      </div>

      {/* Filter Buttons */}
      <div>
        <Button $active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </Button>
        <Button
          $active={filter === "active"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          $active={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button onClick={clearCompleted}>Clear Completed</Button>
      </div>

      {/* Task List */}
      <TaskList>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} $completed={task.completed}>
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              style={{ flex: 1, cursor: "pointer" }}
            >
              {task.text}
            </span>
            <Button
              onClick={() => deleteTask(task.id)}
              style={{ backgroundColor: "#f44336", color: "white" }}
            >
              Delete
            </Button>
          </TaskItem>
        ))}
      </TaskList>
    </AppContainer>
  );
};

export default TaskManagementApp;
