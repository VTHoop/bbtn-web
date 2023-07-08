import "./Lineup.css";

interface LineupProps {
  team: any;
  isTeamBatting: boolean;
}
export const Lineup = ({ team, isTeamBatting }: LineupProps) => {
  return (
    <div className="team__lineup basis-4/5">
      <div className="text-center text-l">Lineup</div>
      <table className="table-auto max-w-[250px] min-w-[250px]">
        <thead>
          <tr>
            <th>Name</th>
            <th>CON</th>
            <th>EYE</th>
            <th>POW</th>
            <th>SPD</th>
          </tr>
        </thead>
        <tbody>
          {team.lineup.map((player: any, i: number) => {
            return (
              <tr
                key={player._id}
                className={team.at_bat === i && isTeamBatting ? "active" : ""}
              >
                <td className="text-xs">{player.name}</td>
                <td className="text-xs">{player.contact}</td>
                <td className="text-xs">{player.eye}</td>
                <td className="text-xs">{player.power}</td>
                <td className="text-xs">{player.speed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center text-l">Pitcher</div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>MOV</th>
            <th>CMD</th>
            <th>VEL</th>
            <th>AWR</th>
          </tr>
        </thead>
        <tbody>
          <tr className={!isTeamBatting ? "active" : ""}>
            <td className="text-xs">{team.pitcher.name}</td>
            <td className="text-xs">{team.pitcher.movement}</td>
            <td className="text-xs">{team.pitcher.command}</td>
            <td className="text-xs">{team.pitcher.velocity}</td>
            <td className="text-xs">{team.pitcher.awareness}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
