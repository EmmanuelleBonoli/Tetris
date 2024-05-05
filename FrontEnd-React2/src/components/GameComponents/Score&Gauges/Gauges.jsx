import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GaugeFuel } from "./GaugeFuel";
import { GaugeOxygen } from "./GaugeOxygen";

export function Gauges({ levelOil, levelOxygen }) {
  const [oil, setOil] = useState(100);
  const [oxygen, setOxygen] = useState(100);

  useEffect(() => {
    setOil(levelOil);
    setOxygen(levelOxygen);
  }, [levelOil, levelOxygen]);

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "50%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <GaugeFuel oil={oil}/>
      <GaugeOxygen oxygen={oxygen}/>
    </div>
  );
}

Gauges.propTypes = {
  levelOil: PropTypes.number,
  levelOxygen: PropTypes.number,
};
