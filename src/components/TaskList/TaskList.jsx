import { useAppContext } from "../../hooks";
import { Item } from "./Item/";
import { Loading } from "../";
import style from "./TaskList.module.css";
import { useEffect } from "react";

const TaskList = () => {
  const { tasks, tasksLoading, loadTasks } = useAppContext();
  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <div className={style.TaskList}>
      {tasksLoading && <Loading />}
      {!tasks.length && !tasksLoading && <p>Não há tarefas no momento...</p>}
      {tasks.map((item) => (
        <Item key={item.id} id={item.id} name={item.name} isNew={item.isNew} />
      ))}
    </div>
  );
};

export { TaskList };
