import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useService } from "../../../assets/ServiceContext";
// import { GameService } from "../../../services/GameService";
import { bubblesData } from "../../Common/BubblesData";

export function WaitingBubbles({ bubblesWaiting }) {
  // const gameService = useService(GameService);

  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setBubbles(bubblesWaiting || []);
    console.log("bubblesWaiting", bubblesWaiting);
  }, [bubblesWaiting]);

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "80%",
        height: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {bubbles.map((bubble) => {
        const findUrl = bubblesData.find((bbl) => bbl.color === bubble.color);
        return (
          <img
            style={{ height: "35%", padding: "5%" }}
            key={bubble.id}
            src={findUrl.img}
            alt=""
          />
        );
      })}
    </div>
  );
}

WaitingBubbles.propTypes = {
  bubblesWaiting: PropTypes.array,
};
