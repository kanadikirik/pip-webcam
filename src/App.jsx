import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  const [isPip, setIsPip] = useState(false);

  const requestPip = () => {
    const video = document.querySelector("video");
    if (video) {
      if (isPip) {
        document.exitPictureInPicture();
      } else {
        video.requestPictureInPicture();
      }
      setIsPip(!isPip);
    }
  };

  return (
    <>
      <Webcam />
      <button onClick={requestPip}>
        {isPip ? "Exit" : "Request"} Picture in Picture
      </button>
    </>
  );
}

export default App;
