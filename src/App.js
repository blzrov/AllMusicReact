import React, { useState } from "react";
import "./App.css";
import TrackItems from "./components/TrackItems";
import ArtistItems from "./components/ArtistItems";

function App() {
  const [value, setValue] = useState("");
  const [audio, setAudio] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const fetchResult = [];

  function doFetch(q) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "ca03dc8b4amsh8fe919ef52202dbp1412f2jsn8b0561de19b7",
      },
    };
    setAudio("");
    setIsLoad(true);
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?" + q, options)
      .then((response) => response.json())
      .then((response) => handleData(response))
      .catch(() => doFetch(q));
  }

  function handleData(data) {
    if (data) {
      fetchResult.push(...data.data);
    }
    if (data.next) {
      doFetch(data.next.split("?")[1]);
    } else {
      setTracks(fetchResult);
      setIsLoad(false);
    }
  }

  const memorizedTrackItems = React.useMemo(
    () => (
      <TrackItems
        tracks={tracks}
        changeAudio={setAudio}
        setValue={setValue}
        doFetch={doFetch}
      />
    ),
    [tracks]
  );

  const memorizedArtistItems = React.useMemo(
    () => (
      <ArtistItems
        tracks={tracks}
        changeAudio={setAudio}
        setValue={setValue}
        doFetch={doFetch}
      />
    ),
    [tracks]
  );

  React.useEffect(() => {
    function fixHeight() {
      console.log("1");
      let items = document.querySelectorAll(".item");
      items.forEach(
        (elem) => (elem.style.height = getComputedStyle(elem).width)
      );
    }
    fixHeight();
    window.addEventListener("resize", fixHeight);
    return window.removeEventListener("resize", fixHeight);
  }, [tracks]);

  console.log("render App");
  return (
    <div className="App">
      <div className="wrapper">
        <div style={{ fontSize: "20px" }}>
          <span>
            Сервис позволяет быстро ознакомиться с самыми популярными треками
            любого артиста с помощью API Deezer, достаточно ввести запрос и
            навести курсор на обложку альбома.
          </span>
        </div>
        <h2>ВВЕДИТЕ ЗАПРОС</h2>
        <div style={{ marginBottom: "15px" }}>
          <input
            className="input"
            type="text"
            style={{ minWidth: "30%" }}
            placeholder="Oxxxymiron"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button
            type="submit"
            onClick={() => {
              doFetch("q=" + value);
            }}
          >
            ОТПРАВИТЬ
          </button>
          <audio
            className="audio"
            style={{ display: "none" }}
            src={audio}
            controls
            autoPlay
            loop
          />
        </div>
        <div className="result">
          {isLoad ? (
            "Подождите..."
          ) : (
            <>
              {memorizedTrackItems}
              {memorizedArtistItems}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
