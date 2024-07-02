// import { CreateStars } from "../Common/CreateStars";

export function BannerAnimated() {
  return (
    <div
      style={{
        background: "url(/images/Game/flyingsStars.png) repeat 0 0",
        animation: "flying 7s infinite",
        animationTimingFunction: "linear",
        height: "15%",
        width: "100%",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <img
        src="/images/Home/astro.png"
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          height: "60%",
          animation: "astroFlying 3s infinite",
        }}
      />
      <style>
        {`
            @keyframes flying {
                from { background-position: 0% 0; }
                to { background-position: 100% 0; }
           
             
            }
        `}
             {`
             @keyframes astroFlying {
                0% { transform: rotate(20deg) }
                50% { transform:  translateX(5vw) rotate(50deg)}
                100% { transform: rotate(20deg); }
            }
        `} 
      </style>
    </div>
  );
}
