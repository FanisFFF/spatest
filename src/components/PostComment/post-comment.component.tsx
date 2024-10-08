import { FC } from "react";
import { DataType } from "../../types/DataType";
// import "./profile-post.styles.scss";
import { Link } from "react-router-dom";

type ProfilePostProps = {
  data: DataType;
};

const PostComment: FC<ProfilePostProps> = ({ data }) => {
  const { postText, companySigDate, username, _id, replies } = data;
  const postDate = new Date(companySigDate);
  const month = postDate.toLocaleString("default", { month: "long" });
  const day = postDate.getDate();
  return (
    <div className="profile-post-container">
      <div className="profile-post__avatar">
        <img src="/avatar.png" alt="user-avatar" />
      </div>
      <div className="profile-post__main">
        <div className="profile-post__username-date">
          <Link to={`/${username}`}>
            <h2>{username}</h2>
          </Link>
          <span>
            · {day} {month}
          </span>
        </div>
        <div>
          <p>{postText}</p>
        </div>
        <div className="profile-post__gutter">
          <span>{replies?.length}</span>
        </div>
      </div>
    </div>
  );
};
export default PostComment;
