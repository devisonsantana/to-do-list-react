import { useAppContext } from "../../hooks";
import { Item } from "./Item/";
import { Loading } from "../";
import style from "./TaskList.module.css";

const TaskList = () => {
  const { tasks, tasksLoading } = useAppContext();
  return (
    <div className={style.TaskList}>
      {tasksLoading && <Loading />}
      {!tasks.length && !tasksLoading && <p>Não há tarefas no momento...</p>}
      {tasks.map((item) => (
        <Item key={item.id} id={item.id} name={item.name} />
      ))}
    </div>
  );
};

export { TaskList };
