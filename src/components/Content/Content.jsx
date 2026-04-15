import style from "./Content.module.css";

const Content = (props) => {
  const { children } = props;
  return <main className={style.Content}>{children}</main>;
};

export { Content };
