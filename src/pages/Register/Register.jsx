import styles from "./Register.module.css";
import { useState } from "react";
import { AuthInput, AuthButton, AuthCard } from "../../components";
import { useAppContext } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
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

    if (form.username.length < 3) {
      newErrors.username = "Username deve ter pelo menos 3 caracteres";
    }

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

    const response = await register(form);

    setLoading(false);

    if (!response.success) {
      setErrors(response.error);
      return;
    }

    navigate("/login");
  };

  return (
    <AuthCard title="Criar Conta">
      <form onSubmit={handleSubmit} className={styles.form}>
        <AuthInput
          label="Nome de usuário"
          type="text"
          id="username"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="Seu username"
        />

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
          placeholder="Crie uma senha"
        />

        <AuthButton type="submit" loading={loading}>
          Criar Conta
        </AuthButton>

        <div className={styles.separator}>
          <hr />
        </div>

        <span className={styles.loginText} onClick={() => navigate("/login")}>
          Já possui conta?
        </span>
      </form>
    </AuthCard>
  );
};

export { Register };
