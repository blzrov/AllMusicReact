import React from "react";
import Track from "./Track";

export default function TrackItems({ tracks, ...props }) {
  console.log("render TrackItems");
  return (
    <div className="trackItems">
      {tracks.map((track, index) => (
        <Track
          key={index}
          track={track}
          changeAudio={props.changeAudio}
          setValue={props.setValue}
          doFetch={props.doFetch}
        />
      ))}
    </div>
  );
}
