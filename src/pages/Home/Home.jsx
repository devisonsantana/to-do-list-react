import style from "./Home.module.css";
import { Form, TaskList } from "../../components";

const Home = () => {
  return (
    <div className={style.Home}>
      <Form />
      <TaskList />
    </div>
  );
};

export { Home };
