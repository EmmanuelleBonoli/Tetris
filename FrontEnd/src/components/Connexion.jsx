import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

export default function Connexion({ onClose }) {
  const navigate = useNavigate();
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleConnexion = async (e) => {
    e.preventDefault();
    const userlogin = {
      email: inputEmail,
      password: inputPassword,
    };

    try {
      const dataUser = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        userlogin,
      );

      const userLocal = {
        token: dataUser.data.token,
      };

      document.cookie = `token=${dataUser.data.token}; expires=${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toUTCString()}; path=/`; // Expiration après 7 jours

      onClose();
      navigate("/game");
    } catch (error) {
      setErrorLogin("Identifiants incorrects, veuillez réessayer.");
    }
  };

  return (
    <div className="container-connexion" onClick={onClose} role="presentation">
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
          <p>Entrez votre Email</p>
          <input
            type="text"
            className="pseudo"
            onInput={(event) => setInputEmail(event.target.value)}
          />

          <p>Entrez votre mot de passe</p>
          <div className="mdp-container">
            <input
              type={motDePasseVisible ? "text" : "password"}
              className="motdepasse"
              onInput={(event) => setInputPassword(event.target.value)}
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

Connexion.propTypes = {
  onClose: PropTypes.func.isRequired,
};
