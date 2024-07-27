import { FC } from "react";
import "./post-input.styles.scss";
type PostInputProps = {
  onHandleChange: () => void;
  onAddPost: () => void;
  valueText: string;
};

const PostInput: FC<PostInputProps> = ({
  onHandleChange,
  onAddPost,
  valueText,
}) => {
  const isDisabled = valueText.length < 1;
  const color = isDisabled ? "rgba(29, 156, 240, 0.356)" : "rgb(29, 155, 240)";
  const cursor = isDisabled ? "" : "pointer";

  return (
    <div className="post-input-container">
      <div className="post-input__avatar-container">
        <img src="./avatar.png" alt="user-avatar" />
      </div>
      <div className="post-input__input-container">
        <div className="post-input__input">
          <textarea
            value={valueText}
            name="postText"
            onChange={onHandleChange}
            placeholder="What is happening..."
          />
        </div>
        <div className="post-input__post-button">
          <button
            style={{ backgroundColor: color, cursor: cursor }}
            disabled={isDisabled}
            onClick={() => onAddPost()}
            type="button"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostInput;
