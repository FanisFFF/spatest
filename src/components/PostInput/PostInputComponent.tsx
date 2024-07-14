import "./post-input.styles.scss";
function PostInput({ onHandleChange, onAddPost, valueText }) {
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
          <button onClick={() => onAddPost()} type="button">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostInput;
