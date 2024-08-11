import NavBar from "../../components/NavBar/nav-bar.component";
import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside/aside.component";

const Layout = () => {
  return (
    <div className="main">
      <NavBar />
      <Outlet />
      <Aside />
    </div>
  );
};

export default Layout;
