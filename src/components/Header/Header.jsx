import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.Header}>
      <Link to="/">
        <h1>
          <span>ToDo</span> List
        </h1>
      </Link>
      <Link to="/about">
        <h2>About</h2>
      </Link>
    </header>
  );
};

export { Header };
