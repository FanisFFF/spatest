import { Link } from "react-router-dom";
import "./notification.styles.scss";

function Notification({ data }) {
  const { type, username, link } = data;
  const message = type === "reply" ? " replied to" : " liked";
  return (
    <div className="notification">
      <p>
        <Link style={{ fontWeight: 700 }} to={`/${username}`}>
          {username}
        </Link>
        {message}
        <Link to={link}>
          <span style={{ fontWeight: 700 }}> post</span>
        </Link>
      </p>
    </div>
  );
}
export default Notification;
