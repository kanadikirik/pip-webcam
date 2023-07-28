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
      if (checkPipSupport()) {
        if (isPip) {
          document.exitPictureInPicture();
        } else {
          video.requestPictureInPicture();
        }
        setIsPip(!isPip);
      } else {
        alert("Picture in Picture is not supported in your browser");
      }
    }
  };

  const checkPip = () =>
    "pictureInPictureEnabled" in document && document.pictureInPictureEnabled;

  const checkOldSafariPipSupport = () => {
    const video = document.createElement("video");

    return (
      checkPip() &&
      video.webkitSupportsPresentationMode &&
      typeof video.webkitSetPresentationMode === "function"
    );
  };

  const checkModernPipSupport = () => {
    const video = document.createElement("video");

    return (
      checkPip() &&
      video.requestPictureInPicture &&
      typeof video.requestPictureInPicture === "function"
    );
  };

  const checkPipSupport = () =>
    checkOldSafariPipSupport() || checkModernPipSupport();

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
