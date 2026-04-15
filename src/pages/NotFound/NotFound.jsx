import style from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={style.NotFound}>
      <h3>404</h3>
      <p>Page Not Found :(</p>
    </div>
  );
};

export { NotFound };
