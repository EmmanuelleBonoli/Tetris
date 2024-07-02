import { forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import FallingBubbles from "./FallingBubbles";
import StoppedBubbles from "./StoppedBubbles";

export const BubblesGrid = forwardRef(function BubblesGrid({ fallingBubbles, stoppedBubbles }, ref) {
  // à revoir, à supprimer quand plus besoin
  const generateGridCells = () => {
    const cells = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 7; j++) {
        cells.push(
          <div
            key={`${i}-${j}`}
            className="cell"
            style={{
              border: "1px solid red",
            }}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div
      style={{
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        className="grid"
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
          gridColumnGap: "0px",
          gridRowGap: "0px",
          position: "relative",
        }}
    
      >
        {generateGridCells()}
        <FallingBubbles fallingBubbles={fallingBubbles || []} />
        <StoppedBubbles stoppedBubbles={stoppedBubbles || []} />
      </div>
    </div>
  );
})

BubblesGrid.propTypes = {
  fallingBubbles: PropTypes.array,
  stoppedBubbles: PropTypes.array,
};
