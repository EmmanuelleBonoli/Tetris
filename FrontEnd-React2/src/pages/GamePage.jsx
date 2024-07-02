import { useState, useRef, useEffect } from "react";
import { Header } from "../components/GameComponents/Header/Header";
import { BannerAnimated } from "../components/GameComponents/Header/BannerAnimated";
import { ZoneScore } from "../components/GameComponents/Score&Gauges/ZoneScore";
import { WaitingBubbles } from "../components/GameComponents/Bubbles&Grid/WaitingBubbles";
import { Gauges } from "../components/GameComponents/Score&Gauges/Gauges";
import { Backpack } from "../components/GameComponents/Backpack";
import { useOnMount, useService } from "../assets/ServiceContext";
import { GameService } from "../services/GameService";
import { BubblesGrid } from "../components/GameComponents/Bubbles&Grid/BubblesGrid";

export function GamePage() {
  const gameService = useService(GameService);

  const [startGame, setStartGame] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gameUser, setGameUser] = useState({});
  const [gridBubbles, setGridBubbles] = useState([]);
  const [fallingBubbles, setFallingBubbles] = useState([]);
  const [stopBubbles, setStopBubbles] = useState([]);

  const gridBubblesRef = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);
  const fallingBubblesRef = useRef([]);

  useOnMount(async () => {
    const updatedGameUser = await gameService.getGame();
    setGameUser(updatedGameUser || {});
    setStartGame(false);
    let updatedCountdown = 3;
    setCountdown(updatedCountdown);

    getAllBubbles(updatedGameUser.id);

    const decreaseCounter = () => {
      updatedCountdown--;
      setCountdown(updatedCountdown);

      if (updatedCountdown === 0) {
        clearInterval(intervalId);
        setStartGame(true);
      }
    };
    const intervalId = setInterval(decreaseCounter, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  // à revoir : useEffect pour automatiser la chute des bubbles

    useEffect(()=>{
      let intervalId;
      if(startGame){
        const fallingDownBubbles = async () => {
          let arrayOfUpdatedBubble = [];
          console.log("arrayUpdated start", arrayOfUpdatedBubble);

          const bubblesToIterate = fallingBubblesRef.current.length ? fallingBubblesRef.current : fallingBubbles;

          for (let i = 0; i <  bubblesToIterate.length; i++) {
            let updatedBubble = bubblesToIterate[i];
            console.log("updatedBubble", updatedBubble);
            if (updatedBubble.positionLine < 10) {
              updatedBubble = {
                ...updatedBubble,
                positionLine: updatedBubble.positionLine + 1,
              };
            } else {
              updatedBubble = {
                ...updatedBubble,
                stageLife: "stopped",
              };
            }
            arrayOfUpdatedBubble.push(updatedBubble);
          }
          fallingBubblesRef.current = arrayOfUpdatedBubble
          console.log("arrayUpdated final", arrayOfUpdatedBubble);
          await gameService.updatedBubble(arrayOfUpdatedBubble);
          setFallingBubbles(arrayOfUpdatedBubble);
          // await getAllBubbles(gameUser.id);
          clearInterval(intervalId);
        };
         intervalId = setInterval(fallingDownBubbles, 1000);

      }else{
        clearInterval(intervalId);
      }

  },[startGame])

  const getAllBubbles = async (GameUserId) => {
    const updatedGridBubbles = await gameService.getAllBubbles(GameUserId);
    setGridBubbles(updatedGridBubbles || []);

    setFallingBubbles(updatedGridBubbles.falling || []);
    setStopBubbles(updatedGridBubbles.stopped || []);
  };

  const handleRotateBubble = async () => {
    if (fallingBubbles.length === 2) {
      let updatedPositionBubble = { ...fallingBubbles[0] };

      if (
        updatedPositionBubble.positionColumn ===
        fallingBubbles[1].positionColumn
      ) {
        if (
          updatedPositionBubble.positionLine < fallingBubbles[1].positionLine
        ) {
          updatedPositionBubble = {
            ...updatedPositionBubble,
            positionColumn: updatedPositionBubble.positionColumn + 1,
            positionLine: updatedPositionBubble.positionLine + 1,
          };
        } else {
          updatedPositionBubble = {
            ...updatedPositionBubble,
            positionColumn: updatedPositionBubble.positionColumn - 1,
            positionLine: updatedPositionBubble.positionLine - 1,
          };
        }
      } else {
        if (
          updatedPositionBubble.positionColumn <
          fallingBubbles[1].positionColumn
        ) {
          updatedPositionBubble = {
            ...updatedPositionBubble,
            positionColumn: updatedPositionBubble.positionColumn + 1,
            positionLine: updatedPositionBubble.positionLine - 1,
          };
        } else {
          if (updatedPositionBubble.positionLine + 1 < 11) {
            updatedPositionBubble = {
              ...updatedPositionBubble,
              positionColumn: updatedPositionBubble.positionColumn - 1,
              positionLine: updatedPositionBubble.positionLine + 1,
            };
          }
        }
      }
      let arrayOfUpdatedPositionBubble = [];
      arrayOfUpdatedPositionBubble.push(updatedPositionBubble);
 
      await gameService.updatedBubble(arrayOfUpdatedPositionBubble);
      arrayOfUpdatedPositionBubble.push(fallingBubbles[1])
      fallingBubblesRef.current = arrayOfUpdatedPositionBubble;
      await getAllBubbles(gameUser.id);
    }
  };

  const handleStartMoveBubble = (event) => {
    startX.current = event.clientX || event.touches[0].clientX;
    startY.current = event.clientY || event.touches[0].clientY;

    document.addEventListener("touchmove", handleMove);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchend", handleEnd);
    document.addEventListener("mouseup", handleEnd);
  };

  const handleMove = async (event) => {
    const distanceX =
      (event.clientX || event.touches[0].clientX) - startX.current;
    const distanceY =
      (event.clientY || event.touches[0].clientY) - startY.current;

    let arrayOfUpdatedBubble = [];
    if (distanceY > 0 && Math.abs(distanceY) > Math.abs(distanceX)) {
      for (let i = 0; i < fallingBubbles.length; i++) {
        let updatedBubble = { ...fallingBubbles[i] };
        updatedBubble = {
          ...updatedBubble,
          positionLine: updatedBubble.positionLine + 1,
        };
        arrayOfUpdatedBubble.push(updatedBubble);
      }
      if (
        arrayOfUpdatedBubble[0].positionLine < 11 &&
        arrayOfUpdatedBubble[1].positionLine < 11
      ) {
        fallingBubblesRef.current = arrayOfUpdatedBubble;
        await gameService.updatedBubble(arrayOfUpdatedBubble);
        await getAllBubbles(gameUser.id);
      }
    } else {
      if (distanceX > 0) {
        for (let i = 0; i < fallingBubbles.length; i++) {
          let updatedBubble = { ...fallingBubbles[i] };
          updatedBubble = {
            ...updatedBubble,
            positionColumn: updatedBubble.positionColumn + 1,
          };
          arrayOfUpdatedBubble.push(updatedBubble);
        }
        fallingBubblesRef.current = arrayOfUpdatedBubble;
        await gameService.updatedBubble(arrayOfUpdatedBubble);
        await getAllBubbles(gameUser.id);
      } else {
        for (let i = 0; i < fallingBubbles.length; i++) {
          let updatedBubble = { ...fallingBubbles[i] };
          updatedBubble = {
            ...updatedBubble,
            positionColumn: updatedBubble.positionColumn - 1,
          };
          arrayOfUpdatedBubble.push(updatedBubble);
        }
        fallingBubblesRef.current = arrayOfUpdatedBubble;
        await gameService.updatedBubble(arrayOfUpdatedBubble);
        await getAllBubbles(gameUser.id);
      }
    }
  };

  function handleEnd(event) {
    if (
      startX.current === (event.clientX || event.touches[0].clientX) &&
      startY.current === (event.clientY || event.touches[0].clientY)
    ) {
      handleRotateBubble();
    }

    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("touchend", handleEnd);
    document.removeEventListener("mouseup", handleEnd);
  }

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
          onMouseDown={(event) => handleStartMoveBubble(event)}
          onTouchStart={handleStartMoveBubble}
          // onClick={() => handleRotateBubble()}
        >
          <ZoneScore score={gameUser.score} time={gameUser.timeGame} />
          {startGame ? (
            <BubblesGrid
              ref={gridBubblesRef}
              fallingBubbles={fallingBubbles}
              stoppedBubbles={stopBubbles}
            />
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
