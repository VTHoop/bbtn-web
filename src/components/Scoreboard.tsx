import { Game } from "../models/game";
import { AwayOrHome } from "../models/team";
import { Lineup } from "./Lineup";
import { ActionArea } from "./ActionArea";

interface ScoreboardProps {
  game: Game;
  onPlay: (
    batterGuess: number,
    pitcherGuess: number,
    batter: any,
    pitcher: any
  ) => void;
}

export const Scoreboard = ({ game, onPlay }: ScoreboardProps) => {
  return (
    <>
      <div className="game-details flex-[0_0_100%]">
        <div className="teams flex">
          <div className="team flex-auto basis-2/5 text-center p-4">
            <div className="text-xl font-bold team__text">AWAY</div>
            <div className="team__status flex space-x-8 basis-4/5">
              <Lineup
                team={game.away_team}
                isTeamBatting={AwayOrHome.AWAY === game.batting_team}
              />
              <div className="team__score">
                <div className="text-l team__name">{game?.away_team?.name}</div>
                <div className="text-7xl font-black away-team__name">
                  {game?.away_score}
                </div>
              </div>
            </div>
          </div>
          <ActionArea game={game} onPlay={onPlay} />
          <div className="team flex-auto basis-2/5 text-center p-4">
            <div className="text-xl font-bold team__text">HOME</div>
            <div className="team__status flex space-x-8">
              <div className="team__score">
                <div className="text-l team__name">{game.home_team?.name}</div>
                <div className="text-7xl font-black away-team__name">
                  {game.home_score}
                </div>
              </div>
              <Lineup
                team={game.home_team}
                isTeamBatting={AwayOrHome.HOME === game.batting_team}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
