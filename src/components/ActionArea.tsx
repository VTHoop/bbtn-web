import { useEffect, useState } from "react";
import { Game } from "../models/game";
import { AwayOrHome } from "../models/team";

interface ActionAreaProps {
  game: Game;
  onPlay: (
    batterGuess: number,
    pitcherGuess: number,
    batter: any,
    pitcher: any
  ) => void;
}

export const ActionArea = ({ game, onPlay }: ActionAreaProps) => {
  const [pitchersGuessInput, setPitchersGuessInput] = useState<string>("");
  const [pitchersGuessError, setpitchersGuessError] = useState<string | null>(
    null
  );

  const [battersGuessInput, setBattersGuessInput] = useState<string>("");
  const [battersGuessError, setbattersGuessError] = useState<string | null>(
    null
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleBatterGuessInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setBattersGuessInput(value);
  };

  const handlePitcherGuessInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPitchersGuessInput(value);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      onPlay(
        +battersGuessInput,
        +pitchersGuessInput,
        currentBatter(),
        currentPitcher()
      );
    }
  }, [isFormSubmitted]);

  const currentBatter = () => {
    if (game.batting_team === AwayOrHome.AWAY) {
      console.log(game.away_team.lineup[game.away_team.at_bat]);
      return game.away_team.lineup[game.away_team.at_bat];
    }
    return game.home_team.lineup[game.home_team.at_bat];
  };
  const currentPitcher = () => {
    if (game.batting_team === AwayOrHome.AWAY) {
      console.log(game.home_team.pitcher);
      return game.home_team.pitcher;
    }
    return game.away_team.pitcher;
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
      setBattersGuessInput("");
      setPitchersGuessInput("");
    } else {
      if (pitchersGuessInput === "") {
        if (isUserInputValid(battersGuessInput)) {
          setbattersGuessError(null);
          setPitchersGuessInput(Math.floor(Math.random() * 1001).toString());
          setIsFormSubmitted(true);
        } else {
          setbattersGuessError("Guess must be a number between 0 and 1000");
        }
      } else {
        if (isUserInputValid(pitchersGuessInput)) {
          setpitchersGuessError(null);
          setBattersGuessInput(Math.floor(Math.random() * 1001).toString());
          setIsFormSubmitted(true);
        } else {
          setpitchersGuessError("Guess must be a number between 0 and 1000");
        }
      }
    }
  };

  const isUserInputValid = (input: string): boolean =>
    +input >= 0 && +input <= 1000 ? true : false;

  return (
    <form
      onSubmit={handleSubmit}
      className="action-area flex flex-col space-y-4 mt-6 justify-center"
    >
      {!game.is_over && (
        <>
          <div className="flex">
            <div className="inning flex-auto w-1/2 text-center text-xl font-bold">
              {game.batting_team === AwayOrHome.AWAY ? "TOP" : "BOT"}{" "}
              {game.inning}
            </div>
            <div className="outs flex-auto w-1/2 text-center text-xl font-bold">
              {game.outs} {game.outs === 1 ? "Out" : "Outs"}
            </div>
          </div>
          {(battersGuessInput !== "" ||
            game.batting_team === AwayOrHome.HOME) && (
            <div className="relative z-[1000]">
              <label
                htmlFor="batters-guess"
                className="block mb-2 text-sm font-medium text-gray-900 text-center"
              >
                Batter Guess
              </label>
              <input
                type="text"
                id="batters-guess"
                value={battersGuessInput}
                onChange={handleBatterGuessInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={isFormSubmitted}
              />
              {battersGuessError && (
                <div className="text-red-700 text-xs text-center">
                  {battersGuessError}
                </div>
              )}
            </div>
          )}

          {(pitchersGuessInput !== "" ||
            game.batting_team === AwayOrHome.AWAY) && (
            <div className="relative z-[1000]">
              <label
                htmlFor="pitchers-guess"
                className="block mb-2 text-sm font-medium text-gray-900 text-center"
              >
                Pitchers Guess
              </label>
              <input
                type="text"
                id="pitchers-guess"
                value={pitchersGuessInput}
                onChange={handlePitcherGuessInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={isFormSubmitted}
              />
              {pitchersGuessError && (
                <div className="text-red-700 text-xs text-center">
                  {pitchersGuessError}
                </div>
              )}
            </div>
          )}
          <button
            className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm z-[1000] disabled:bg-gray-300"
            type="submit"
            hidden={game.is_over}
          >
            {!isFormSubmitted ? "Start At-Bat" : "Next At-Bat"}
          </button>
          {isFormSubmitted && (
            <div className="text-xs">
              The result of the last play was: {game.last_play_result}
            </div>
          )}
        </>
      )}
      {game.is_over && (
        <div className="text-center text-xl">
          The{" "}
          {game.away_score > game.home_score
            ? game.away_team.name
            : game.home_team.name}{" "}
          Won!
        </div>
      )}
    </form>
  );
};
