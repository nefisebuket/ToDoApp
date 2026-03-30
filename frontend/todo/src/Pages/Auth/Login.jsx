import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Services";

import "./auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await login(loginData);
      localStorage.setItem("token", response.token);
      navigate("/tasks");
    } catch (error) {
      alert("Giriş başarısız!");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <input
          type="text"
          placeholder="Email Adres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleLogin}>Giriş Yap</button>
          <button onClick={() => navigate("/register")}>Kayıt Ol</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
