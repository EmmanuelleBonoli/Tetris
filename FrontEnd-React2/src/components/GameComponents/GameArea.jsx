export function GameArea() {

  // à revoir, à supprimer quand plus besoin
  const generateGridCells = () => {
    const cells = [];
    // Boucler pour créer 10 lignes
    for (let i = 0; i < 10; i++) {
      // Boucler pour créer 6 cellules par ligne
      for (let j = 0; j < 7; j++) {
        // Ajouter chaque cellule à la liste des cellules
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
          border: "1px solid red",
        }}
      >
        {generateGridCells()}
      </div>
    </div>
  );
}
