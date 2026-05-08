import styles from "./Login.module.css";
import { useState } from "react";
import { AuthCard, AuthInput, AuthButton } from "../../components";
import { useAppContext } from "../../hooks";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated } = useAppContext();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "Email inválido";
    }

    if (form.password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    setLoading(true);

    const response = await login(form);

    setLoading(false);

    if (!response.success) {
      setErrors(response.error);
      return;
    }

    navigate("/", { replace: true });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <AuthCard title="Entrar">
      <form onSubmit={handleSubmit} className={styles.form}>
        <AuthInput
          label="Email"
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Digite seu email"
        />

        <AuthInput
          label="Senha"
          type="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Digite sua senha"
        />

        <AuthButton type="submit" loading={loading}>
          Entrar
        </AuthButton>

        <div className={styles.separator}>
          <hr />
          <span>ou</span>
          <hr />
        </div>

        <AuthButton variant="secondary" onClick={() => navigate("/register")}>
          Cadastrar
        </AuthButton>
      </form>
    </AuthCard>
  );
};

export { Login };
