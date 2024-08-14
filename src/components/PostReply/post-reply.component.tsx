import { ChangeEvent, FC, useState } from "react";
import "./post-reply.styles.scss";
import { replyToRecord } from "../../api/actions";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type PostInputProps = {
  onHandleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddPost: () => void;
  valueText: string;
};

const PostReply: FC<PostInputProps> = ({ data }) => {
  const INITIAL_DATA = {
    companySigDate: new Date(),
    postText: "",
  };
  const { _id } = data;
  const { token } = useAuth();
  const [formData, setFormData] = useState(INITIAL_DATA);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const isDisabled = formData.postText.length < 1;
  const color = isDisabled ? "rgba(29, 156, 240, 0.356)" : "rgb(29, 155, 240)";
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
      queryClient.invalidateQueries({ queryKey: ["postData"] });
    },
  });

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
    </>
  );
};
export default PostReply;
