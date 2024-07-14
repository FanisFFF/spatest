import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";

function NavBar() {
  const { logout } = useAuth();

  return (
    <>
      <div className="main-nav-container">
        <div className="main__logo">
          <BorderColorIcon />
          <h1>PostIt</h1>
        </div>
        <div className="main-nav">
          <div className="main__links">
            <div className="main__link">
              <HomeIcon></HomeIcon>
              <a href="#">Home</a>
            </div>
            <div className="main__link">
              <NotificationsNoneIcon />
              <a href="#">Notifications</a>
            </div>
            <div className="main__link">
              <SearchIcon></SearchIcon>
              <a href="#">Search</a>
            </div>
          </div>
          <div className="main__logout">
            <div>
              <img src="/avatar.png" alt="" />
            </div>
            <div className="main__logout-text">
              <h2>User</h2>
              <Button onClick={() => logout()}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
