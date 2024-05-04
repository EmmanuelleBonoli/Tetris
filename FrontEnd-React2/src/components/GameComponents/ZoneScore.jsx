import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function ZoneScore({ score, time }) {
  const [scoreGame, setScoreGame] = useState(0);
  const [timeGame, setTimeGame] = useState("00:00:00");

  useEffect(() => {
    setScoreGame(score);
    setTimeGame(time);
  }, [score, time]);

  return (
    <div
      style={{
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "80%",
          width: "80%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>Score :</div>
          {scoreGame}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>Time :</div>
          {timeGame}
        </div>
      </div>
    </div>
  );
}

ZoneScore.propTypes = {
  score: PropTypes.number,
  time: PropTypes.string,
};
