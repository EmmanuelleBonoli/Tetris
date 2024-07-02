import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "@mui/material";
import { useOnMount } from "../assets/ServiceContext";
import { Connexion } from "../components/HomeComponents/Connexion";
import { Signin } from "../components/HomeComponents/Signin";
import { CreateStars } from "../components/Common/CreateStars";
import { useService } from "../assets/ServiceContext";
import { GameService } from "../services/GameService";
import { UserService } from "../services/UserService";

export function Home() {
  const navigate = useNavigate();
  const gameService = useService(GameService);
  const userService = useService(UserService);

  const [connectUser, setConnectUser] = useState(false);
  const [signinUser, setSigninUser] = useState(false);

  const [userConnected, setUserConnected] = useState(false);
  const [gameUser, setGameUser] = useState({});

  const token = localStorage.getItem("tetrisGame");

  useOnMount(async () => {
    const updatedUserConnected = await userService.checkValidityToken(token);

    if (updatedUserConnected) {
      setUserConnected(true);
      setGameUser(await gameService.getGame());
      console.log("gameUserConnected", await gameService.getGame());
    }
  });

  const renderModalConnexion = () => {
    return (
      <Modal
        sx={{
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={connectUser}
        onClose={() => setConnectUser(false)}
      >
        <div
          style={{
            padding: "10%",
            width: "80%",
            backgroundColor: "#282262",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Connexion
            setGameUser={setGameUser}
            setConnectUser={setConnectUser}
            setUserConnected={setUserConnected}
          />
        </div>
      </Modal>
    );
  };

  const renderModalSignin = () => {
    return (
      <Modal
        sx={{
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={signinUser}
        onClose={() => setSigninUser(false)}
      >
        <div
          style={{
            padding: "10%",
            width: "80%",
            backgroundColor: "#282262",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Signin
            setGameUser={setGameUser}
            setSigninUser={setSigninUser}
            setUserConnected={setUserConnected}
          />
        </div>
      </Modal>
    );
  };

  const handleNewGame = async () => {
    try {
      setGameUser(await gameService.newGame(gameUser));
      navigate("/game");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#282262",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CreateStars startX={100} startY={100} />
      <h1
        style={{
          fontSize: "4rem",
          fontFamily: "Sedgwick Ave Display, cursive",
          zIndex: "1",
          color: "white",
          paddingBottom: "20%",
        }}
      >
        SpaceNaute
      </h1>
      {!userConnected ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Button
            sx={{ zIndex: "1" }}
            variant="outlined"
            onClick={() => setSigninUser(true)}
          >{`S'inscrire`}</Button>
          <Button
            sx={{ zIndex: "1" }}
            variant="contained"
            onClick={() => setConnectUser(true)}
          >
            Connexion
          </Button>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            disabled={
              gameUser &&
              gameUser.score === 0 &&
              gameUser.timeGame === "00:00:00"
            }
            sx={{ zIndex: "1", width: "60%", marginBottom: "2%" }}
            variant="contained"
            onClick={() => navigate("/game")}
          >
            Reprendre la partie
          </Button>
          <Button
            sx={{ zIndex: "3", width: "60%", marginBottom: "2%" }}
            variant="contained"
            onClick={() => handleNewGame()}
          >
            Démarrer une partie
          </Button>
          <Button
            sx={{ zIndex: "3", width: "60%", marginBottom: "2%" }}
            variant="contained"
          >
            Mon profil
          </Button>
        </div>
      )}
      <img
        style={{ position: "absolute", bottom: "-50px", width: "150%" }}
        src="images/Home/planet.png"
      />
      <img
        style={{
          zIndex: "2",
          position: "absolute",
          height: "20%",
          top: "12%",
          left: "0",
          animation: "navigate 12s linear infinite",
        }}
        src="images/Home/astro.png"
      />
      {renderModalConnexion()}
      {renderModalSignin()}
      <style>
        {`
             @keyframes navigate {
                0% { transform: translateX(-50vw) translateY(0); }
                25% { transform: translateX(-50vw) translateY(0); }
                55% { transform: translateX(10vh) translateY(-20vw); }
                90% { transform: translateX(120vw) translateY(0) rotate(50deg); }
                100% { transform: translateX(120vw) translateY(0) rotate(50deg); }
            }
        `}
      </style>
      ;
    </div>
  );
}
