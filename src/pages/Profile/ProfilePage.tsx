import { Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import ProfilePost from "../../components/ProfilePost/profile-post.component";
import { useParams } from "react-router-dom";
import "./profile.styles.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../api/actions";
import { DataType } from "../../types/DataType";
import LoadingScreen from "../../components/LoadinScreen/loading-screen.component";

function ProfilePage() {
  const { token } = useAuth();
  const params = useParams();

  const {
    isLoading,
    data: postData = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["profileData", params.username],
    queryFn: () => fetchProfile(token as string, params.username as string),
    enabled: !!params.username && !!token,
  });

  const reversed: DataType[] = postData.slice().reverse();

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <div className="profile-page__header-container">
          <div className="profile-page__background"></div>
          <div className="profile-page__avatar">
            <img src="/avatar.png" alt="avatar" />
          </div>
        </div>
        <div className="profile-page__text-description">
          <h2>{params.username}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio vitae
            culpa, recusandae repellat amet omnis nemo. Quae ab
          </p>
        </div>
      </div>
      <div className="profile-page__posts">
        {isLoading && <LoadingScreen />}
        {reversed.length > 0 ? (
          reversed.map((row: DataType) => (
            <ProfilePost key={row._id} data={row} />
          ))
        ) : (
          <Typography style={{ marginTop: "2rem" }} color="primary">
            Empty
          </Typography>
        )}
        {isError && <Typography color="error">{error.message}</Typography>}
      </div>
    </div>
  );
}

export default ProfilePage;
