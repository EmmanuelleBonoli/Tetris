import PropTypes from "prop-types";

export function GaugeOxygen({ oxygen }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>{oxygen}</div>
      <img style={{ width: "60%" }} src="/images/Game/oxygen.png" />
    </div>
  );
}

GaugeOxygen.propTypes = {
  oxygen: PropTypes.number,
};
