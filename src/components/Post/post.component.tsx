import { Button } from "@mui/material";
import "./post.styles.scss";
import { Link } from "react-router-dom";
import { DataType } from "../../types/DataType";
import { FC } from "react";

type PostProps = {
  data: DataType;
  deleteDocument: (id: string) => void;
  setEdit: (id: string) => void;
};

const Post: FC<PostProps> = ({ data, deleteDocument, setEdit }) => {
  const { postText, _id, companySigDate, username } = data;
  const postDate = new Date(companySigDate);
  const month = postDate.toLocaleString("default", { month: "long" });
  const day = postDate.getDate();
  return (
    <div className="post-container">
      <div className="post__avatar">
        <img src="/avatar.png" alt="user-avatar" />
      </div>
      <div className="post__main">
        <div className="post__username-date">
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
        <div className="post__buttons">
          <Button onClick={() => setEdit(_id as string)}>Edit</Button>
          <Button onClick={() => deleteDocument(_id as string)}>Delete</Button>
        </div>
      </div>
    </div>
  );
};
export default Post;
