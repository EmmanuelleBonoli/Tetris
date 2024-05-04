import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function CreateStars({ startX, startY }) {
  const location = useLocation();

  const [addAnim, setAddAnim] = useState("");

  useEffect(() => {
    if (location.pathname.includes("game")) {
      setAddAnim("flyingStars 3s infinite");
    }
  }, []);

  const numStars = 250;
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const randomX = Math.random() * startX;
    const randomY = Math.random() * startY;
    const delay = Math.random() * 5;
    const size = Math.random() * 4;

    stars.push(
      <div
        key={i}
        className="star"
        style={{
          position: "absolute",
          left: `${randomX}%`,
          top: `${randomY}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "#FEDA24",
          borderRadius: "50%",
          animation: `twinkle 1s infinite ease-in-out ${delay}s, ${addAnim}`,
        }}
      />
    );
  }
  return (
    <>
      {stars}

      <style>
        {`
             @keyframes twinkle {
             0%, 100% { opacity: 0.5; }
             50% { opacity: 1; }
            }
        `}
        {/* {`
             @keyframes flyingStars {
                0% { transform: translateX(100vw); }
                100% { transform: translateX(-100vw); }
            }
        `} */}
      </style>
    </>
  );
}

CreateStars.propTypes = {
  startX: PropTypes.number,
  startY: PropTypes.number,
};
