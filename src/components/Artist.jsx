import React, { useRef } from "react";
import { AppContext } from "../App";

export default function Artist({ track }) {
  const App = React.useContext(AppContext);
  const itemRef = useRef({});
  const nameWrapperRef = useRef({});
  const nameRef = useRef({});

  return (
    <div
      className="item"
      style={{ backgroundImage: `url("${track.artist.picture_medium}")` }}
      ref={itemRef}
      onMouseEnter={() => {
        App.setAudio(track.preview);
        nameWrapperRef.current.style.backgroundColor = "rgb(0, 0, 0, 60%)";
        nameRef.current.style.display = "inline";
        itemRef.current.style.borderColor = "red";
      }}
      onMouseLeave={() => {
        App.setAudio("");
        nameWrapperRef.current.style.backgroundColor = "rgb(0, 0, 0, 0%)";
        nameRef.current.style.display = "none";
        itemRef.current.style.borderColor = "gray";
      }}
      onClick={() => {
        App.setValue(track.artist.name);
        App.doFetch("q=" + track.artist.name);
      }}
    >
      <div ref={nameWrapperRef}>
        <span ref={nameRef}>{track.artist.name}</span>
      </div>
    </div>
  );
}
