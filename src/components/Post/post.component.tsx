import { Button } from "@mui/material";
import "./post.styles.scss";
import { Link } from "react-router-dom";
import { DataType } from "../../types/DataType";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
    <Link to={`/${username}/${_id}`}>
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
            <Button
              style={{ zIndex: "9999" }}
              onClick={() => setEdit(_id as string)}
            >
              <EditIcon />
            </Button>
            <Button
              style={{ zIndex: "9999" }}
              onClick={() => deleteDocument(_id as string)}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Post;
