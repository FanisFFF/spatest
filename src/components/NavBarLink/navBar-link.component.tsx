import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./navBar-link.styles.scss";

function NavBarLink({ data }) {
  const { to, text, icon } = data;
  const location = useLocation();
  const isCurrent = location.pathname == to;

  return (
    <li style={{ fontWeight: isCurrent ? "700" : "400" }} className="nav__link">
      <Link to={to}>
        {icon}
        <span className="nav__link-text">{text}</span>
      </Link>
    </li>
  );
}
export default NavBarLink;
