import { ChangeEvent, FC, useState } from "react";
import "./post-reply.styles.scss";
import { replyToRecord, updateRecord } from "../../api/actions";
import { useAuth } from "../../context/AuthContext";
import ProfilePost from "../ProfilePost/profile-post.component";
import PostComment from "../PostComment/post-comment.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type PostInputProps = {
  onHandleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddPost: () => void;
  valueText: string;
};

const PostReply: FC<PostInputProps> = ({ data }) =>
  //   {
  //   onHandleChange,
  //   onAddPost,
  //   valueText,
  //   }
  {
    const INITIAL_DATA = {
      companySigDate: new Date(),
      postText: "",
    };
    const { _id, postText, companySigDate, replies } = data;
    console.log(replies);
    const { token } = useAuth();
    const [formData, setFormData] = useState(INITIAL_DATA);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const isDisabled = formData.postText.length < 1;
    const color = isDisabled
      ? "rgba(29, 156, 240, 0.356)"
      : "rgb(29, 155, 240)";
    const cursor = isDisabled ? "" : "pointer";
    const handleApply = async () => {
      await replyToRecord(token as string, _id as string, formData);
    };
    const queryClient = useQueryClient();

    // Mutations
    const { mutate: replyToPost } = useMutation({
      mutationFn: handleApply,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["data"] });
      },
    });

    console.log(formData);
    return (
      <>
        <div className="post-reply-container">
          <div className="post-reply__avatar-container">
            <img src="/avatar.png" alt="user-avatar" />
          </div>
          <div className="post-reply__input-container">
            <div className="post-reply__input">
              <textarea
                value={formData.postText}
                name="postText"
                onChange={handleChange}
                placeholder="Your reply"
              />
              <div className="post-reply__post-button">
                <button
                  style={{ backgroundColor: color, cursor: cursor }}
                  disabled={isDisabled}
                  onClick={() => replyToPost()}
                  type="button"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {replies?.length > 0
            ? replies.map((el) => <PostComment data={el} />)
            : ""}
        </div>
      </>
    );
  };
export default PostReply;
