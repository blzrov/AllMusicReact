import React from "react";
import Artist from "./Artist";

export default React.memo(
  function ArtistItems({ tracks, ...props }) {
    const artistsID = [];
    const artistsItems = tracks.filter((element) => {
      if (!artistsID.includes(element.artist.id)) {
        artistsID.push(element.artist.id);
        return true;
      }
      return false;
    });

    return (
      <div className="artistItems">
        {artistsItems.map((track, index) => (
          <Artist key={index} track={track} />
        ))}
      </div>
    );
  },
  (prev, next) => {
    return prev.tracks === next.tracks;
  }
);
