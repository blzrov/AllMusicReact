import React from "react";

export default function Artist({ track, ...props }) {
  console.log("render Artist");
  return (
    <div
      className="item"
      style={{ backgroundImage: `url("${track.artist.picture_medium}")` }}
      onMouseEnter={() => props.changeAudio(track.preview)}
      onMouseLeave={() => props.changeAudio("")}
    ></div>
  );
}
