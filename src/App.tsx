import { useEffect, useState } from "react";
import "./App.css";
import Field from "./components/Field";
import { Game } from "./models/game";
import { Scoreboard } from "./components/Scoreboard";

interface AtBat {
  pitcherGuess: number;
  batterGuess: number;
  batter: any;
  pitcher: any;
}

const App = () => {
  const [game, setGame] = useState<Game | null>(null);

  const [atBat, setAtBat] = useState<AtBat>({
    pitcherGuess: -1,
    batterGuess: -1,
    batter: null,
    pitcher: null,
  });

  const handlePlay = (
    batterGuess: number,
    pitcherGuess: number,
    batter: any,
    pitcher: any
  ) => {
    setAtBat({ pitcherGuess, batterGuess, batter, pitcher });
  };

  useEffect(() => {
    const url =
      "http://localhost:8000/games/e7916921-daa0-47ac-a713-57cbea2e7c24";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      });
  }, []);

  useEffect(() => {
    const { batterGuess, pitcherGuess, batter, pitcher } = atBat;
    if (batterGuess !== -1 && pitcherGuess !== -1) {
      const url =
        "http://localhost:8000/games/e7916921-daa0-47ac-a713-57cbea2e7c24/at-bat";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ batterGuess, pitcherGuess, batter, pitcher }),
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          setGame(data);
        });
    }
  }, [atBat]);

  if (game) {
    return (
      <div className="container px-[50px] flex" style={{ maxWidth: "1000px" }}>
        <Scoreboard game={game} onPlay={handlePlay} />
        <div className="field">
          <Field field={game.field} />
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default App;
