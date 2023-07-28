import { useState } from "react";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  const [isInPip, setIsInPip] = useState(false);

  const requestPip = async () => {
    const video = document.querySelector("video");

    if (checkIsInPip()) return;
    if (checkOldSafariPipSupport())
      await video.webkitSetPresentationMode("picture-in-picture");
    if (checkModernPipSupport()) await video.requestPictureInPicture();
    syncPipState();
  };

  const exitPip = async () => {
    const video = document.querySelector("video");

    if (!checkIsInPip()) return;
    if (checkOldSafariPipSupport())
      await video.webkitSetPresentationMode("inline");
    if (checkModernPipSupport()) await document?.exitPictureInPicture();
    syncPipState();
  };

  const onPress = async () => {
    return checkIsInPip() ? exitPip() : requestPip();
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

  const syncPipState = () => setIsInPip(checkIsInPip());
  const checkIsInPip = () => Boolean(document.pictureInPictureElement);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Webcam style={{ width: "100%", maxWidth: "768px" }} />
      <button onClick={onPress} style={{ marginTop: "2rem" }}>
        {isInPip ? "Exit" : "Request"} Picture in Picture
      </button>
    </div>
  );
}

export default App;
