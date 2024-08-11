import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./nav-bar.styles.scss";
import NavBarLink from "../NavBarLink/navBar-link.component";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
const links = [
  {
    text: "Home",
    to: "/home",
    iconOutlined: <HomeOutlinedIcon />,
    iconFilled: <HomeIcon />,
  },
  {
    text: "Notifications",
    to: "/notifications",
    iconOutlined: <NotificationsOutlinedIcon />,
    iconFilled: <NotificationsIcon />,
  },
  {
    text: "Search",
    to: "/search",
    iconOutlined: <SearchOutlinedIcon />,
    iconFilled: <SearchIcon />,
  },
];

function NavBar() {
  const { logout, username } = useAuth();

  return (
    <>
      <header>
        <div className="header__logo">
          <BorderColorIcon />
          <h1>PostIt</h1>
        </div>
        <nav>
          <ul className="nav__links">
            {links.map((el, i) => (
              <NavBarLink data={el} key={i}></NavBarLink>
            ))}
          </ul>
        </nav>
        <div className="logout">
          <div>
            <img src="/avatar.png" alt="" />
          </div>
          <div className="logout__logout-text">
            <Link to={`/${username}`}>
              <h2>{username}</h2>
            </Link>
            <Button onClick={() => logout()}>Logout</Button>
          </div>
        </div>
      </header>
    </>
  );
}
export default NavBar;
