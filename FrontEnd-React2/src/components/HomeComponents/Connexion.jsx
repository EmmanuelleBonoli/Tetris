import { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputAdornment, IconButton } from "@mui/material";
import { StyledTextField } from "../../Styles/TextField";
import { useService } from "../../assets/ServiceContext";
import { UserService } from "../../services/UserService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GameService } from "../../services/GameService";

export function Connexion({ setUserConnected, setConnectUser, setGameUser }) {
  const userService = useService(UserService);
  const gameService = useService(GameService);

  const [showPassword, setShowPassword] = useState(false);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const handleConnexion = async (e) => {
    e.preventDefault();

    try {
      await userService.login(inputPseudo, inputPassword);
      setUserConnected(true)
      await setGameUser(await gameService.getGame());
      setConnectUser(false)
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
          <StyledTextField
            type="text"
            size="small"
            required
            className="pseudo"
            onInput={(event) => setInputPseudo(event.target.value)}
          />

          <p>Entrez votre mot de passe</p>
          <div className="mdp-container">
            <StyledTextField
              size="small"
              type={showPassword ? "text" : "password"}
              required
              className="motdepasse"
              onInput={(event) => setInputPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button variant="contained" type="submit" className="btn-connexion">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
}

Connexion.propTypes = {
  setUserConnected: PropTypes.func,
  setConnectUser: PropTypes.func,
  setGameUser: PropTypes.func,
};
