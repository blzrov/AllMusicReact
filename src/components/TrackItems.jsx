import React from "react";
import Track from "./Track";

export default React.memo(
  function TrackItems({ tracks }) {
    return (
      <div className="trackItems">
        {tracks.map((track, index) => (
          <Track key={index} track={track} />
        ))}
      </div>
    );
  },
  (prev, next) => {
    return prev.tracks === next.tracks;
  }
);
