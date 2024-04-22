import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../services/Injection";
import { UserService } from "../services/UserService";

export function Signin() {
  const navigate = useNavigate();
  const userService = useService(UserService);

  const [motDePasseVisible, setMotDePasseVisible] = useState<boolean>(false);
  const [inputPseudo, setInputPseudo] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inscription, setInscription] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(true);

  const validateForm = () => {
    if (!inputPseudo || !inputEmail || !inputPassword) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  useEffect(() => {
    validateForm();
  }, [inputPseudo, inputEmail, inputPassword]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();

    if (formValid) {
      const userSignin = {
        pseudo: inputPseudo,
        email: inputEmail,
        password: inputPassword,
        profileActive: true,
      };

      const signinUserSucced = await userService.signIn(userSignin);

      if (signinUserSucced.status === 201) {
        setInscription("Inscription réussie !");
        navigate("/");
      } else {
        setInscription("Veuillez remplir tous les champs.");
      }
    }
  };

  return (
    <div className="container-inscription ">
      <div className="inscription-form">
        <div className="header-container">
          <h1>Inscription</h1>
          <img
            src="/images/Login/GhostLogin.png"
            alt="GhostLogin"
            className="GhostLogin"
          />
          {inscription && (
            <p
              style={{
                color: "#fbb169",
                fontSize: "17px",
                fontFamily: "var(--secondary-font)",
                fontWeight: "bold",
              }}
            >
              {inscription}
            </p>
          )}
        </div>
        <form onSubmit={handleSignIn} className="login-container">
          <p>Choisissez votre pseudo</p>
          <input
            type="text"
            className="pseudo"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputPseudo(event.target.value)
            }
          />

          <p>Entrez votre e-mail</p>
          <input
            type="email"
            className="pseudo"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputEmail(event.target.value)
            }
          />

          <p>Choisissez votre mot de passe</p>
          <div className="mdp-container">
            <input
              type={motDePasseVisible ? "text" : "password"}
              className="motdepasse"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInputPassword(event.target.value)
              }
            />
            <img
              src={
                motDePasseVisible
                  ? "/images/Login/Mdp_unsee.png"
                  : "/images/Login/Mdp_see.png"
              }
              alt="eye"
              className="mdp"
              onClick={toggleMotDePasseVisibility}
              role="presentation"
            />
          </div>

          <div className="container-button">
            <button type="submit" className="btn-inscription">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
