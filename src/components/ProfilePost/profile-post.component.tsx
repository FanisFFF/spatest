import { FC, MouseEvent } from "react";
import { DataType } from "../../types/DataType";
import "./profile-post.styles.scss";
import { Link, useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { likeRecord } from "../../api/actions";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ProfilePostProps = {
  data: DataType;
};

const ProfilePost: FC<ProfilePostProps> = ({ data }) => {
  const { token, username: currentUser } = useAuth();
  const { postText, companySigDate, username, _id, replies, likes } = data;
  const postDate = new Date(companySigDate);
  const month = postDate.toLocaleString("default", { month: "long" });
  const day = postDate.getDate();
  const isLiked =
    likes?.filter((user) => user?.username === currentUser)[0]?.username ==
    currentUser;
  const replyCount = replies?.length == 0 ? "" : replies?.length;
  const likesCount = likes?.length == 0 ? "" : likes?.length;
  const queryClient = useQueryClient();

  // Mutations
  const { mutate: likePost } = useMutation({
    mutationFn: handleLike,
    onSuccess: (e) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const navigate = useNavigate();
  const link = `/${username}/${_id}`;
  function handleNavigate() {
    navigate(link);
  }
  async function handleLike(e: MouseEvent<HTMLDivElement>) {
    // Prevent navigation by stopping event propagation
    console.log("clickd");
    if (isLiked) return;
    await likeRecord(token as string, _id as string, data);
  }

  return (
    <>
      <div className="profile-post-container" onClick={handleNavigate}>
        <div className="profile-post__content">
          <div className="profile-post__avatar">
            <img src="/avatar.png" alt="user-avatar" />
          </div>
          <div className="profile-post__main">
            <div className="profile-post__username-date">
              <h2>{username}</h2>
              <span>
                · {day} {month}
              </span>
            </div>
            <div>
              <p>{postText}</p>
            </div>
          </div>
        </div>
        <div className="profile-post__gutter">
          <div>
            <ChatBubbleOutlineIcon />
            <span>{replyCount}</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              return likePost();
            }}
          >
            {isLiked ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon style={{ zIndex: "9999" }} />
            )}
            <span>{likesCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
