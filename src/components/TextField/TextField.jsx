import style from "./TextField.module.css";

const TextField = (props) => {
  return <input className={style.TextField} type="text" {...props} />;
};

export { TextField };
