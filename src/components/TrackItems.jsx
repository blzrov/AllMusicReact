import React from "react";
import Track from "./Track";

export default function TrackItems({ tracks, ...props }) {
  console.log("render TrackItems");
  return (
    <div className="trackItems">
      {tracks.map((e) => (
        <Track
          key={e.id}
          track={e}
          changeAudio={props.changeAudio}
          setValue={props.setValue}
          doFetch={props.doFetch}
        />
      ))}
    </div>
  );
}
