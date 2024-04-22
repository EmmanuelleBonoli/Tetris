import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../services/Injection";
import { UserService } from "../services/UserService";

export function Connexion() {
  const userService = useService(UserService);

  const navigate = useNavigate();

  const [motDePasseVisible, setMotDePasseVisible] = useState<boolean>(false);
  const [inputPseudo, setInputPseudo] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [errorLogin, setErrorLogin] = useState<string>("");

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleConnexion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await userService.login(inputPseudo, inputPassword);
      navigate("/game");
    } catch (error) {
      setErrorLogin("Identifiants incorrects, veuillez réessayer.");
    }
  };

  return (
    <div className="container-connexion">
      <div
        className="connexion-form"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header-container">
          <h1>Connexion</h1>
          {errorLogin && (
            <p
              style={{
                color: "red",
                fontSize: "17px",
                fontFamily: "var(--secondary-font)",
                fontWeight: "bold",
              }}
            >
              {errorLogin}
            </p>
          )}
        </div>
        <form onSubmit={handleConnexion} className="login-container">
          <p>Entrez votre Pseudo</p>
          <input
            type="text"
            className="pseudo"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputPseudo(event.target.value)
            }
          />

          <p>Entrez votre mot de passe</p>
          <div className="mdp-container">
            <input
              type={motDePasseVisible ? "text" : "password"}
              className="motdepasse"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInputPassword(event.target.value)
              }
            />
            <img
              src={
                motDePasseVisible
                  ? "/images/Mdp_unsee.png"
                  : "/images/Mdp_see.png"
              }
              alt="eye"
              className="mdp"
              onClick={toggleMotDePasseVisibility}
              role="presentation"
            />
          </div>
          <button type="submit" className="btn-connexion">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
