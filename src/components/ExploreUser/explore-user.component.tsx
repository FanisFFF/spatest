import { Link } from "react-router-dom";
import "./explore-user.styles.scss";

function ExploreUser({ data }) {
  const { username } = data;
  return (
    <div className="explore__user">
      <div className="explore__avatar">
        <img src="/avatar.png" alt="user-avatar" />
      </div>
      <div className="explore__text">
        <Link to={`/${username}`}>
          <h2>{username}</h2>
        </Link>
        <p>Lorem ipsum</p>
      </div>
    </div>
  );
}
export default ExploreUser;
