import { useState } from "react";
import { Modal } from "@mui/material";
import { Connexion } from "../components/Connexion";
import { Signin } from "../components/Signin";

Home.propTypes = {};

export function Home() {
  const [connectUser, setConnectUser] = useState(false);
  const [signinUser, setSigninUser] = useState(false);

  const renderModalConnexion = () => {
    return (
      <Modal open={connectUser} onClose={() => setConnectUser(false)}>
        <div>
          <Connexion />
        </div>
      </Modal>
    );
  };

  const renderModalSignin = () => {
    return (
      <Modal open={signinUser} onClose={() => setSigninUser(false)}>
        <div>
          <Signin />
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setConnectUser(true)}>Connexion</button>
      <button onClick={() => setSigninUser(true)}>S'inscrire</button>
      {renderModalConnexion()}
      {renderModalSignin()}
    </div>
  );
}
