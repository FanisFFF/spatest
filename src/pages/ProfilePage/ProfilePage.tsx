import { useEffect, useState } from "react";
import { DataType } from "../../types/DataType";
import { fetchProfile } from "../../api/actions";
import { Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import ProfilePost from "../../components/ProfilePost/profile-post.component";
import { useParams } from "react-router-dom";
import "./profile.styles.scss";

function ProfilePage() {
  const [data, setData] = useState([] as DataType[]);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const params = useParams();
  const [username, setUsername] = useState(params.username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProfile(
          token as string,
          username as string
        );
        setData(response);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [username, token]);

  useEffect(() => {
    setUsername(params.username);
  }, [params.username]);
  return (
    <>
      <div className="profile-page">
        <div className="profile-page__header">
          <div className="profile-page__header-container">
            <div className="profile-page__background"></div>
            <div className="profile-page__avatar">
              <img src="/avatar.png" alt="avatar" />
            </div>
          </div>
          <div className="profile-page__text-description">
            <h2>{username}</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
              vitae culpa, recusandae repellat amet omnis nemo. Quae ab
            </p>
          </div>
        </div>
        <div className="profile-page__posts">
          {data.length > 0 ? (
            []
              .concat(data)
              .reverse()
              .map((row: DataType) => <ProfilePost key={row._id} data={row} />)
          ) : (
            <Typography style={{ marginTop: "2rem" }} color="primary">
              Empty
            </Typography>
          )}
          {error && <Typography color="error">{error}</Typography>}
        </div>
      </div>
    </>
  );
}
export default ProfilePage;
{
  /* <div className="main__col-2">
            <h1>Hello</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate rerum voluptatem dicta pariatur accusamus ullam quidem.
              Nam pariatur, similique illo assumenda neque impedit quas quisquam
              sequi ratione nemo dolorem consectetur.
            </p>
          </div>
   

         */
}
