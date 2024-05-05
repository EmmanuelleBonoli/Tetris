export function Header() {
  return (
    <div style={{ height: "15%", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Logo
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div>Menu</div>
        <div>Paramètres</div>
      </div>
    </div>
  );
}
