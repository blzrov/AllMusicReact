import React from "react";
import { AppContext } from "../App";

export default function Track({ track }) {
  const App = React.useContext(AppContext);

  return (
    <div
      className="item"
      style={{ backgroundImage: `url("${track.album.cover_medium}")` }}
      onMouseEnter={() => App.setAudio(track.preview)}
      onMouseLeave={() => App.setAudio("")}
    >
      <div
        onMouseEnter={(e) => (e.target.style.color = "rgb(43, 115, 209)")}
        onMouseLeave={(e) => (e.target.style.color = "white")}
        onClick={() => {
          App.setValue(track.artist.name);
          App.doFetch("q=" + track.artist.name);
        }}
      >
        {track.artist.name}
      </div>
      <div>{track.title}</div>
    </div>
  );
}
