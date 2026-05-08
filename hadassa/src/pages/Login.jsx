import { useState } from "react";
import "./Login.css";

/* ✏️ MUDE AQUI: defina o usuário e senha corretos */
const USUARIO_CORRETO = "a";
const SENHA_CORRETA = "a";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);

  function handleLogin() {
    if (
      usuario.trim().toLowerCase() === USUARIO_CORRETO &&
      senha === SENHA_CORRETA
    ) {
      onLogin();
    } else {
      setErro("Hmm... não parece que é você! Tenta de novo 🐾");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <div className="login-bg">
      <div className={`login-card ${shake ? "shake" : ""}`}>
        <div className="cat-wrap">
          <img
            src="/gatinhologin.jpg"
            alt="gatinho fofo"
            className="cat-img"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <p className="login-question">
          Espera aí... você é a <span className="highlight">Hadassa</span>{" "}
          mesmo? 🌸
        </p>
        <p className="login-sub">
          Só entram pessoas autorizadas aqui viu! Prova que é você:
        </p>

        <div className="input-group">
          <label>Seu nome</label>
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>

        <div className="input-group">
          <label>Senha secreta</label>
          <input
            type="password"
            placeholder="Só você sabe..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button className="btn-entrar" onClick={handleLogin}>
          Entrar 🌷
        </button>
      </div>
    </div>
  );
}