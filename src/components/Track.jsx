import React from "react";

export default function Track({ track, ...props }) {
  console.log("render Track");
  return (
    <div
      className="item"
      style={{ backgroundImage: `url("${track.album.cover_medium}")` }}
      onMouseEnter={() => props.changeAudio(track.preview)}
      onMouseLeave={() => props.changeAudio("")}
    >
      <div
        onMouseEnter={(e) => (e.target.style.color = "rgb(43, 115, 209)")}
        onMouseLeave={(e) => (e.target.style.color = "white")}
        onClick={() => {
          props.setValue(track.artist.name);
          props.doFetch("q=" + track.artist.name);
        }}
      >
        {track.artist.name}
      </div>
      <div>{track.title}</div>
    </div>
  );
}
