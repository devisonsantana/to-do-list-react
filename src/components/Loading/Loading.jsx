import style from "./Loading.module.css";

const Loading = (props) => {
  const { text = "Loading..." } = props;
  return <span className={style.Loading}>&#8987;{text}</span>;
};

export { Loading };
