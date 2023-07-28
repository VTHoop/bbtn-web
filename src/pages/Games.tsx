import { Game } from "../models/game";
import { AwayOrHome } from "../models/team";
import { Link, useLoaderData } from "react-router-dom";

const getGames = (): Promise<Response> => {
  const url = "http://localhost:8000/games";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  return fetch(url, options).then((response) => response.json());
};

export async function loader() {
  const games = await getGames();
  return games;
}

const Games = () => {
  const games = useLoaderData() as Game[];
  //   const [games, setGames] = useState<Game[]>([]);

  //   useEffect(() => {
  //     const url = "http://localhost:8000/games";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json;charset=UTF-8",
  //       },
  //     };
  //     fetch(url, options)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setGames(data);
  //       });
  //   }, []);

  return (
    <div className="mt-5 px-[50px]">
      <h2 className="text-xl font-black text-center">All BBTN Games</h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Home Team</th>
            <th className="px-6 py-3">Home Score</th>
            <th className="px-6 py-3">Away Team</th>
            <th className="px-6 py-3">Away Score</th>
            <th className="px-6 py-3">Inning/Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        {games.map((game: Game) => {
          return (
            <tr
              key={game._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{game.home_team.name}</td>
              <td className="px-6 py-4">{game.home_score}</td>
              <td className="px-6 py-4">{game.away_team.name}</td>
              <td className="px-6 py-4">{game.away_score}</td>
              <td className="px-6 py-4">
                {game.batting_team === AwayOrHome.AWAY ? "TOP" : "BOT"}{" "}
                {game.inning}
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm z-[1000] disabled:bg-gray-300">
                  <Link to={`${game._id}`}>Play</Link>
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Games;
