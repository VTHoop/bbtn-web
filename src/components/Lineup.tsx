import "./Lineup.css";

interface LineupProps {
  team: any;
  isTeamBatting: boolean;
}
export const Lineup = ({ team, isTeamBatting }: LineupProps) => {
  return (
    <div className="team__lineup flex-1">
      <div className="text-center text-l">Lineup</div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {team.lineup.map((player: any, i: number) => {
            return (
              <tr
                key={player._id}
                className={team.at_bat === i && isTeamBatting ? "active" : ""}
              >
                <td className="text-xs">{player.number}</td>
                <td className="text-xs">{player.name}</td>
                <td className="text-xs">{player.position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center text-l">Pitcher</div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          <tr className={!isTeamBatting ? "active" : ""}>
            <td className="text-xs">{team.pitcher.number}</td>
            <td className="text-xs">{team.pitcher.name}</td>
            <td className="text-xs">{team.pitcher.position}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
