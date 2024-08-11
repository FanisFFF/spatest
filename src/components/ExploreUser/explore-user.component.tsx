import { Link } from "react-router-dom";
import "./explore-user.styles.scss";
import { FC } from "react";
import { TUserData } from "../../types/DataType";
type ExploreUserProps = {
  data: TUserData;
};

const ExploreUser: FC<ExploreUserProps> = ({ data }) => {
  const { username } = data;
  return (
    <Link to={`/${username}`}>
      <div className="explore__user">
        <div className="explore__avatar">
          <img src="/avatar.png" alt="user-avatar" />
        </div>
        <div className="explore__text">
          <h2>{username}</h2>
          <p>Lorem ipsum</p>
        </div>
      </div>
    </Link>
  );
};
export default ExploreUser;
