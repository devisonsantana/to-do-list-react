import styles from "./AuthButton.module.css";

const AuthButton = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${styles.button} ${
        variant === "secondary" ? styles.secondary : styles.primary
      }`}
    >
      {loading ? <span className={styles.loader}></span> : children}
    </button>
  );
};

export { AuthButton };
