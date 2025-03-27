import { useState } from "react"; // Importa Axios
import "../App.css";
import API from "../api/axiosConfig";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "", // Campo nome aggiunto
    surname: "", // Campo cognome aggiunto
    username: "",
    password: "",
    role: "CLIENTE",
  });
  const [error, setError] = useState(""); // Per gestire eventuali error

  const [successMessage, setSuccessMessage] = useState("");

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
        response = await API.post("http://localhost:8080/api/auth/login", {
          login: formData.username,
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
        response = await API.post("http://localhost:8080/api/auth/register", {
          name: formData.name,
          surname: formData.surname,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          role: formData.role,
        });

        // Mostra un messaggio di successo o redirigi
        console.log("Utente registrato:", response.data);
        setSuccessMessage("Registrazione completata! Ora effettua il login.");
        setFormData({
          name: "",
          surname: "",
          username: "",
          password: "",
          role: "",
          phoneNumber: "",
          email: "",
        });
        setIsLogin(true); //mostra il form login
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
                name="phoneNumber"
                placeholder="number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <input
                className="un"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
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
                <option value="">Seleziona ruolo</option>
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
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
