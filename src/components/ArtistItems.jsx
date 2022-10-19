import React from "react";
import Artist from "./Artist";

export default function ArtistItems({ tracks, ...props }) {
  const artistsID = [];
  const artistsItems = tracks.filter((element) => {
    if (!artistsID.includes(element.artist.id)) {
      artistsID.push(element.artist.id);
      return true;
    }
    return false;
  });

  console.log("render ArtistItems");
  return (
    <div className="artistItems">
      {artistsItems.map((track, index) => (
        <Artist
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
