import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, APP_NAME } from "./globals";
import '../style/Login.css'; // Or './Login.scss' if not using CSS modules

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_API_URL + "/login", {
        email_mem: email,
        password_mem: password,
      });
      alert("🎉 Login Successful");
      navigate("/search", {
        state: { user: response.data.user },
      });
    } catch (error) {
      alert(error.response?.data || "❌ Login Failed");
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <h2>🔑 Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
