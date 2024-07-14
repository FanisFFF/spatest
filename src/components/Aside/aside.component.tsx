import "./aside.styles.scss";
function Aside() {
  return (
    <>
      <aside>
        <div className="explore">
          <h3>Explore</h3>
          <div className="explore__user">
            <div className="explore__avatar">
              <img src="/avatar.png" alt="user-avatar" />
            </div>
            <div className="explore__text">
              <h2>User</h2>
              <p>Lorem ipsum</p>
            </div>
          </div>
          <div className="explore__user">
            <div className="explore__avatar">
              <img src="/avatar.png" alt="user-avatar" />
            </div>
            <div className="explore__text">
              <h2>User</h2>
              <p>Lorem ipsum</p>
            </div>
          </div>
          <div className="explore__user">
            <div className="explore__avatar">
              <img src="/avatar.png" alt="user-avatar" />
            </div>
            <div className="explore__text">
              <h2>User</h2>
              <p>Lorem ipsum</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
export default Aside;
