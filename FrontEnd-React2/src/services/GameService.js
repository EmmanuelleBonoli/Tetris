import axios from "axios";

const token = localStorage.getItem("tetrisGame");

export function GameService() {
  const getGame = async () => {
    try {
      const gameUser = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/game/getGameUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return gameUser.data;
    } catch (err) {
      console.error(err);
    }
  };

  const newGame = async (gameUser) => {
    try {
      const gameUserData = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/game/newGame`,
        gameUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return gameUserData.data;
    } catch (err) {
      console.error(err);
    }
  };

  // const continueGame = async ()=>{

  // }

  const getAllBubbles = async (gameId) => {
    try {
      const allBubbles = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/game/allBubbles/${gameId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return allBubbles.data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getGame,
    newGame,
    // continueGame,
    getAllBubbles,
  };
}
