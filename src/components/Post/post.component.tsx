import { Button } from "@mui/material";
import "./post.styles.scss";

function Post({ data, deleteDocument, setEdit }) {
  const { postText, _id, companySigDate } = data;
  const postDate = new Date(companySigDate);
  const month = postDate.toLocaleString("default", { month: "long" });
  const day = postDate.getDate();
  console.log(day);
  return (
    <div className="post-container">
      <div className="post__avatar">
        <img src="/avatar.png" alt="user-avatar" />
      </div>
      <div className="post__main">
        <div className="post__username-date">
          <h2>{"User"}</h2>
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
}
export default Post;
