import "./post.styles.scss";
import { Link, useParams } from "react-router-dom";
import { FC } from "react";
import { fetchPost } from "../../api/actions";
import { useAuth } from "../../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostReply from "../../components/PostReply/post-reply.component";
import ProfilePost from "../../components/ProfilePost/profile-post.component";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../components/LoadinScreen/loading-screen.component";
import { Typography } from "@mui/material";
import PostComment from "../../components/PostComment/post-comment.component";

const PostPage: FC = () => {
  const { token } = useAuth();
  const params = useParams();
  const post = params.post;
  const username = params.post;

  const {
    isLoading,
    data: postData,
    isError,
  } = useQuery({
    queryKey: ["postData", post],
    queryFn: () =>
      fetchPost(token as string, username as string, post as string),
  });

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <Typography color="error">Something wrong. Try to reload</Typography>
    );
  const { replies } = postData;

  return (
    <div className="post__page">
      <div className="post">
        <div className="post__header">
          <Link to={`/${username}`}>
            <ArrowBackIcon />
          </Link>
          <h2>Post</h2>
        </div>
        <ProfilePost data={postData} />
      </div>
      <PostReply data={postData}></PostReply>
      {replies?.length > 0
        ? replies.map((el) => <PostComment data={el} />)
        : ""}
    </div>
  );
};
export default PostPage;
