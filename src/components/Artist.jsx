import React, { useRef } from "react";

export default function Artist({ track, ...props }) {
  const itemRef = useRef({});
  const nameWrapperRef = useRef({});
  const nameRef = useRef({});

  return (
    <div
      className="item"
      style={{ backgroundImage: `url("${track.artist.picture_medium}")` }}
      ref={itemRef}
      onMouseEnter={() => {
        props.changeAudio(track.preview);
        nameWrapperRef.current.style.backgroundColor = "rgb(0, 0, 0, 60%)";
        nameRef.current.style.display = "inline";
        itemRef.current.style.borderColor = "red";
      }}
      onMouseLeave={() => {
        props.changeAudio("");
        nameWrapperRef.current.style.backgroundColor = "rgb(0, 0, 0, 0%)";
        nameRef.current.style.display = "none";
        itemRef.current.style.borderColor = "gray";
      }}
      onClick={() => {
        props.setValue(track.artist.name);
        props.doFetch("q=" + track.artist.name);
      }}
    >
      <div ref={nameWrapperRef}>
        <span ref={nameRef}>{track.artist.name}</span>
      </div>
    </div>
  );
}
