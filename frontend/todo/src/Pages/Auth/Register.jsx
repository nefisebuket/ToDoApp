import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/Services";
import "./auth.css";

function Register() {
  const [registerData, setRegisterData] = useState({
    FullName: "",
    UserName: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(registerData);
      alert("Kayıt başarılı!");
      navigate("/login");
    } catch (err) {
      alert("Kayıt başarısız!");
      console.error(err.response.data);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <input
          type="text"
          placeholder="İsim Soyisim"
          value={registerData.FullName}
          onChange={(e) =>
            setRegisterData({ ...registerData, FullName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={registerData.UserName}
          onChange={(e) =>
            setRegisterData({ ...registerData, UserName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={registerData.Email}
          onChange={(e) =>
            setRegisterData({ ...registerData, Email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Şifre"
          value={registerData.Password}
          onChange={(e) =>
            setRegisterData({ ...registerData, Password: e.target.value })
          }
        />
        <div className="button-group">
          <button onClick={handleRegister}>Kayıt Ol</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
