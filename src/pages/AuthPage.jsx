import { useState } from "react";
import axios from "axios"; // Importa Axios
import "../App.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "", // Campo nome aggiunto
    surname: "", // Campo cognome aggiunto
    username: "",
    password: "",
    role: "CLIENTE",
  });
  const [error, setError] = useState(""); // Per gestire eventuali errori

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (isLogin) {
        console.log("Login con:", formData);
        // Chiamata API per il login
        response = await axios.post("http://localhost:8080/auth/login", {
          username: formData.username,
          password: formData.password,
        });

        // Salva il token JWT nel localStorage
        localStorage.setItem("jwtToken", response.data.token);

        console.log("Token JWT salvato:", response.data.token);
        // Dopo il login, redirigi l'utente (ad esempio alla home)
        window.location.href = "/home"; // Puoi usare un router se necessario
      } else {
        console.log("Registrazione con:", formData);
        // Chiamata API per la registrazione (includi nome e cognome)
        response = await axios.post("http://localhost:8080/auth/register", {
          username: formData.username,
          password: formData.password,
          role: formData.role,
          name: formData.name, // Invia nome
          surname: formData.surname, // Invia cognome
        });

        // Mostra un messaggio di successo o redirigi
        console.log("Utente registrato:", response.data);
        window.location.href = "/login"; // Oppure dove vuoi redirigere
      }
    } catch (err) {
      console.error("Errore API:", err);
      setError("Errore durante il login/registrazione. Riprova.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="mainLogin">
        <p className="sign" align="center">
          {isLogin ? "Sign In" : "Sign Up"}
        </p>
        <form className="form1" onSubmit={handleSubmit}>
          <input
            className="un"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="pass"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <>
              <input
                className="un"
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="un"
                type="text"
                name="surname"
                placeholder="Cognome"
                value={formData.surname}
                onChange={handleChange}
              />
              <select
                className="un"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="CLIENTE">Cliente</option>
                <option value="NOLEGGIATORE">Noleggiatore</option>
              </select>
            </>
          )}
          <button type="submit" className="submit">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
          {isLogin && (
            <p className="forgot" align="center">
              <a href="#">Forgot Password?</a>
            </p>
          )}
          <p className="forgot" align="center">
            <a href="#" onClick={toggleMode}>
              {isLogin
                ? "Non hai un account? Registrati"
                : "Hai già un account? Accedi"}
            </a>
          </p>
        </form>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Mostra eventuali errori */}
      </div>
    </div>
  );
};

export default AuthPage;
