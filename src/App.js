import React, { useState } from "react";
import "./App.css";
import TrackItems from "./components/TrackItems";
import ArtistItems from "./components/ArtistItems";

export const AppContext = React.createContext();

function App() {
  const [value, setValue] = useState("");
  const [audio, setAudio] = useState("");
  const [tracks, setTracks] = useState([]);
  const [context] = React.useState({ setValue, setAudio, doFetch });
  const [isLoad, setIsLoad] = useState(false);
  const fetchResult = [];

  function doFetch(query) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "ca03dc8b4amsh8fe919ef52202dbp1412f2jsn8b0561de19b7",
      },
    };
    setAudio("");
    setIsLoad(true);
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?" + query, options)
      .then((response) => response.json())
      .then((response) => handleData(response))
      .catch(() => doFetch(query));
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

  React.useEffect(() => {
    function fixHeight() {
      const items = document.querySelectorAll(".item");
      items.forEach(
        (item) => (item.style.height = getComputedStyle(item).width)
      );
    }
    fixHeight();
    window.addEventListener("resize", fixHeight);
    return () => window.removeEventListener("resize", fixHeight);
  }, [tracks]);

  return (
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
          type="text"
          style={{ minWidth: "30%", marginRight: "5px" }}
          placeholder="Oxxxymiron"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyDown={(event) => {
            if (event.key === "Enter" && value !== "") {
              doFetch("q=" + value);
            }
          }}
        />
        <button
          type="submit"
          onClick={() => {
            if (value !== "") doFetch("q=" + value);
          }}
          disabled={!value}
        >
          ОТПРАВИТЬ
        </button>
        <audio style={{ display: "none" }} src={audio} controls autoPlay loop />
      </div>
      <div className="result">
        {isLoad ? (
          "Подождите..."
        ) : (
          <AppContext.Provider value={context}>
            <TrackItems tracks={tracks} />
            <ArtistItems tracks={tracks} />
          </AppContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
