import "./post.styles.scss";
import { Link, useParams } from "react-router-dom";
import { DataType } from "../../types/DataType";
import { FC, useEffect, useState } from "react";
import { fetchPost } from "../../api/actions";
import { useAuth } from "../../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostReply from "../../components/PostReply/post-reply.component";
import ProfilePost from "../../components/ProfilePost/profile-post.component";
import { useQuery } from "@tanstack/react-query";

type PostProps = {
  data: DataType;
  deleteDocument: (id: string) => void;
  setEdit: (id: string) => void;
};

const PostPage: FC<PostProps> = () => {
  // { data, deleteDocument, setEdit }

  const [data, setData] = useState("");
  const { token } = useAuth();
  const params = useParams();
  const post = params.post;
  const fetchData = async () => {
    try {
      const response = await fetchPost(
        token as string,
        username as string,
        post as string
      );
      setData(response);
    } catch (error) {
      //   setError("Failed to fetch data");
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchPost(
  //         token as string,
  //         username as string,
  //         post as string
  //       );
  //       setData(response);
  //     } catch (error) {
  //       //   setError("Failed to fetch data");
  //     }
  //   };

  //   fetchData();
  // }, [post]);
  const {
    isLoading,
    data: postData,
    isError,
  } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  const { postText, _id, companySigDate, username } = data;
  const postDate = new Date(companySigDate);
  const month = postDate.toLocaleString("default", { month: "long" });
  const day = postDate.getDate();
  // console.log(data);
  return (
    <div>
      <div className="post">
        <div className="post__header">
          <Link to={`/${username}`}>
            <ArrowBackIcon />
          </Link>
          <h2>Post</h2>
        </div>
        <ProfilePost data={data} />
        {/* <div className="post__container">
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
            <div className="post__buttons"></div>
          </div>
        </div> */}
      </div>
      <PostReply data={data}></PostReply>
    </div>
  );
};
export default PostPage;
// <Button onClick={() => setEdit(_id as string)}>Edit</Button>

// <Button onClick={() => deleteDocument(_id as string)}>Delete</Button>
