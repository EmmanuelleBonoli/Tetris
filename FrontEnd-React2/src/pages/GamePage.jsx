import { useState } from "react";
import { Header } from "../components/GameComponents/Header";
import { BannerAnimated } from "../components/GameComponents/BannerAnimated";
import { ZoneScore } from "../components/GameComponents/ZoneScore";
import { GameArea } from "../components/GameComponents/GameArea";
import { WaitingBubbles } from "../components/GameComponents/WaitingBubbles";
import { Gauges } from "../components/GameComponents/Gauges";
import { Backpack } from "../components/GameComponents/Backpack";
import { useOnMount, useService } from "../assets/ServiceContext";
import { GameService } from "../services/GameService";

export function GamePage() {
  const gameService = useService(GameService);

  const [startGame, setStartGame] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gameUser, setGameUser] = useState({});
  const [gridBubbles, setGridBubbles] = useState([]);

  useOnMount(async () => {
    const updatedGameUser = await gameService.getGame();
    setGameUser(updatedGameUser || {});
    setStartGame(false);
    let updatedCountdown = 3;
    setCountdown(updatedCountdown);
    setGridBubbles((await gameService.getAllBubbles(updatedGameUser.id)) || []);

    console.log(
      "gridBubbles",
      await gameService.getAllBubbles(updatedGameUser.id)
    );

    const decreaseCounter = () => {
      updatedCountdown--;
      setCountdown(updatedCountdown);

      if (updatedCountdown === 0) {
        clearInterval(intervalId);
        setStartGame(true);
      }
    };
    const intervalId = setInterval(decreaseCounter, 1000);
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282262",
        color: "white",
      }}
    >
      <Header />
      <BannerAnimated />
      <div style={{ width: "100%", height: "70%", display: "flex" }}>
        <div
          style={{
            height: "100%",
            width: "20%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <WaitingBubbles bubblesWaiting={gridBubbles.waiting} />
          <Gauges
            levelOil={gameUser.levelOil}
            levelOxygen={gameUser.levelOxygen}
          />
          <Backpack />
        </div>
        <div
          style={{
            height: "100%",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <ZoneScore score={gameUser.score} time={gameUser.timeGame} />
          {startGame ? (
            <GameArea />
          ) : (
            <div
              style={{
                height: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                fontSize: "8rem",
              }}
            >
              {countdown}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
