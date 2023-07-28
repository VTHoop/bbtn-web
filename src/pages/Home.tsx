import { Nav } from "../components/Nav";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <Nav></Nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};
