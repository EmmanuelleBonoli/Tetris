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
      }}
    >
      <style>
        {`
            @keyframes flying {
                from { background-position: 0% 0; }
                to { background-position: 100% 0; }
           
             
            }
        `}
      </style>
    </div>
  );
}
