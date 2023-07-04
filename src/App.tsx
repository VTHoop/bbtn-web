import { useEffect, useState } from "react";
import "./App.css";
import Field from "./components/Field";
import { Game } from "./models/game";
import { Scoreboard } from "./components/Scoreboard";

interface AtBat {
  pitcherGuess: number;
  batterGuess: number;
}

const App = () => {
  const [game, setGame] = useState<Game | null>(null);

  const [atBat, setAtBat] = useState<AtBat>({
    pitcherGuess: -1,
    batterGuess: -1,
  });

  const handlePlay = (batterGuess: number, pitcherGuess: number) => {
    setAtBat({ pitcherGuess, batterGuess });
  };

  useEffect(() => {
    const url =
      "http://localhost:8000/games/da4b561e-cbfd-4490-a79c-6e03a4cd1ee9";
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
    const { batterGuess, pitcherGuess } = atBat;
    if (batterGuess !== -1 && pitcherGuess !== -1) {
      const url =
        "http://localhost:8000/games/da4b561e-cbfd-4490-a79c-6e03a4cd1ee9/at-bat";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ batterGuess, pitcherGuess }),
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
