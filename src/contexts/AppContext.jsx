import { createContext, useEffect, useState } from "react";
import { api } from "../services";

const AppContext = createContext({});

const AppContextProvider = (props) => {
  const { children } = props;

  const [tasks, setTasks] = useState([]);

  const [tasksLoading, setTasksLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState([]);

  // LOAD TASKS
  const loadTasks = async () => {
    setTasksLoading(true);
    const { data = [] } = await api.get("/todos");
    setTasks([...data]);
    setTasksLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ADD A NEW TASK
  const addTask = async (taskName) => {
    setCreateLoading(true);
    const { data: task } = await api.post("/todos", { name: taskName });
    setTasks((prev) => [...prev, task]);
    setCreateLoading(false);
  };

  // REMOVE A TASK
  const deleteTask = async (id) => {
    setDeleteLoading((prev) => [...prev, id]);
    await api.delete(`/todos/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setDeleteLoading((prev)=> prev.filter(taskId => taskId !== id));
  };

  // EDIT A TASK
  const editTask = async (id, taskName) => {
    setEditLoading(prev => [...prev, id]);
    await api.put(`/todos/${id}`, {
      name: taskName,
    });
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name: taskName } : task)),
    );
    setEditLoading(prev=> prev.filter(taskId=> taskId !== id));
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        editTask,
        tasksLoading,
        createLoading,
        editLoading,
        deleteLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
