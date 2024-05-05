import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bubblesData } from "../../Common/BubblesData";

export default function StoppedBubbles({ stoppedBubbles }) {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    console.log(stoppedBubbles);
    setBubbles(stoppedBubbles);
  }, [stoppedBubbles]);

  return (
    <>
      {bubbles.map((bubble) => {
        const findUrl = bubblesData.find((bbl) => bbl.color === bubble.color);
        return (
          <div
            key={bubble.id}
            style={{
              width: "100%",
              height: "100%",
              gridColumn: `${bubble.positionColumn} / span 1`,
              gridRow: `${bubble.positionLine} / span 1`,
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "100%",
                objectFit: "cover",
              }}
              src={findUrl.img}
            />
          </div>
        );
      })}
    </>
  );
}

StoppedBubbles.propTypes = {
  stoppedBubbles: PropTypes.array,
};
