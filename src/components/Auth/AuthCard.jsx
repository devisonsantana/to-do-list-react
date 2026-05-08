import styles from "./AuthCard.module.css";

const AuthCard = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export { AuthCard };
