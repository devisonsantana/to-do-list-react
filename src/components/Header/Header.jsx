import { Link, useNavigate } from "react-router-dom";

import style from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className={style.Header}>
      <Link to="/" className={style.logo}>
        <h1>
          <span>ToDo</span> List
        </h1>
      </Link>

      <nav className={style.navigation}>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Sair</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className={style.registerButton}>
              Cadastrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export { Header };
