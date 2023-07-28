import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  const requestPip = () => {
    const video = document.querySelector("video");
    if (video) {
      video.requestPictureInPicture();
    }
  };

  return (
    <>
      <Webcam />
      <button onClick={requestPip}>Request Picture in Picture</button>
    </>
  );
}

export default App;
