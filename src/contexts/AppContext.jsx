import { createContext, useState } from "react";
import { api } from "../services";

const AppContext = createContext({});

const AppContextProvider = (props) => {
  const { children } = props;

  const [tasks, setTasks] = useState([]);

  const [tasksLoading, setTasksLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState([]);

  // Verifies if is already authenticated
  const isAuthenticated = () => !!localStorage.getItem("accessToken");

  // Verifies expiration date time
  const isTokenExpired = () => {
    const expiresAt = localStorage.getItem("expiresAt");

    if (!expiresAt) return true;

    return new Date() > new Date(expiresAt);
  };

  // LOGIN METHOD
  const login = async (loginForm) => {
    try {
      const { data } = await api.post("/login", loginForm);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("expiresAt", data.expiresAt);
      return {
        success: true,
        response: {
          ...data,
        },
      };
    } catch (error) {
      if (error.response?.status === 401) {
        return {
          success: false,
          status: error.response?.status,
          error: {
            email: "Email incorreto, tente novamente",
            password: "Senha incorreta, tente novamente.",
          },
        };
      } else {
        return {
          success: false,
          status: error.response?.status,
          error: {
            email: "Ocorreu um erro inesperado, tente novamente mais tarde.",
            password: "Ocorreu um erro inesperado, tente novamente mais tarde.",
          },
        };
      }
    }
  };

  // REGISTER METHOD
  const register = async (registerForm) => {
    try {
      const { data } = await api.post("register", registerForm);
      return {
        success: true,
        response: {
          ...data,
        },
      };
    } catch (error) {
      if (error.response?.status === 409) {
        return {
          success: false,
          status: error.response?.status,
          error: {
            email: "Este email já está registrado.",
          },
        };
      } else {
        return {
          success: false,
          status: error.response?.status,
          error: {
            email: "Ocorreu um erro inesperado, tente novamente mais tarde.",
            password: "Ocorreu um erro inesperado, tente novamente mais tarde.",
          },
        };
      }
    }
  };

  // REQUEST HEADER CONFIGURATION
  const setAuthorizationHeader = () => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: (status) => status < 500,
    };
  };

  // LOAD TASKS
  const loadTasks = async () => {
    const headers = setAuthorizationHeader();

    setTasksLoading(true);
    const { data = [] } = await api.get("/todos", headers);
    setTasks([...data]);
    setTasksLoading(false);
  };

  // ADD A NEW TASK
  const addTask = async (taskName) => {
    const headers = setAuthorizationHeader();

    setCreateLoading(true);
    const { data: task } = await api.post(
      "/todos",
      { name: taskName },
      headers,
    );

    setTasks((prev) => [...prev, { ...task, isNew: true }]);
    setCreateLoading(false);
  };

  // REMOVE A TASK
  const deleteTask = async (id) => {
    const headers = setAuthorizationHeader();

    setDeleteLoading((prev) => [...prev, id]);

    await api.delete(`/todos/${id}`, headers);

    setTasks((prev) => prev.filter((task) => task.id !== id));

    setDeleteLoading((prev) => prev.filter((taskId) => taskId !== id));
  };

  // EDIT A TASK
  const editTask = async (id, taskName) => {
    const headers = setAuthorizationHeader();

    setEditLoading((prev) => [...prev, id]);
    await api.put(
      `/todos/${id}`,
      {
        name: taskName,
      },
      headers,
    );

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name: taskName } : task)),
    );

    setEditLoading((prev) => prev.filter((taskId) => taskId !== id));
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
        loadTasks,
        login,
        register,
        isAuthenticated,
        isTokenExpired,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
