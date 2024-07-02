import { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputAdornment, IconButton } from "@mui/material";
import { StyledTextField } from "../../Styles/TextField";
import { useService } from "../../assets/ServiceContext";
import { UserService } from "../../services/UserService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GameService } from "../../services/GameService";

export function Signin({setUserConnected, setSigninUser, setGameUser}) {
  const userService = useService(UserService);
  const gameService = useService(GameService)

  const [showPassword, setShowPassword] = useState(false);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inscription, setInscription] = useState("");
  const [formValid, setFormValid] = useState(true);

  const validateForm = () => {
    if (!inputPseudo || !inputEmail || !inputPassword) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };

  const handleSignIn = async (e) => {
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

      if (signinUserSucced === 201) {
        setInscription("Inscription réussie !");
        setUserConnected(true)
        setGameUser(await gameService.getGame());
        setSigninUser(false)
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
          <StyledTextField
            type="text"
            size="small"
            required
            className="pseudo"
            onChange={(event) => setInputPseudo(event.target.value)}
          />

          <p>Entrez votre e-mail</p>
          <StyledTextField
            type="email"
            size="small"
            required
            className="pseudo"
            onChange={(event) => setInputEmail(event.target.value)}
          />

          <p>Choisissez votre mot de passe</p>
          <div className="mdp-container">
            <StyledTextField
              type={showPassword ? "text" : "password"}
              required
              size="small"
              className="motdepasse"
              onChange={(event) => setInputPassword(event.target.value)}
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

          <div className="container-button">
            <Button
              variant="contained"
              type="submit"
              className="btn-inscription"
            >
              {`S'inscrire`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Signin.propTypes={
  setUserConnected: PropTypes.func,
  setSigninUser: PropTypes.func,
  setGameUser: PropTypes.func,
}