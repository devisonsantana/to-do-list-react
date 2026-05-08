import styles from "./AuthInput.module.css";

const AuthInput = ({ label, type, id, value, onChange, error, placeholder }) => {
  return (
    <div className={styles.group}>
      <label htmlFor={id}>{label}</label>

      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? styles.errorInput : ""}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export { AuthInput };
