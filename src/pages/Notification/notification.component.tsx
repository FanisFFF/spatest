import axios from "axios";
import { BASE_URL } from "../../api/baseUrl";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Notification from "../../components/Notification/notification.component";
import "./notification.styles.scss";
import { CircularProgress } from "@mui/material";
import LoadingScreen from "../../components/LoadinScreen/loading-screen.component";

function NotificationPage() {
  const { token } = useAuth();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchUser = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/user/get/1`, {
        headers: {
          "x-auth": token,
        },
      });
      console.log(response);
      setData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser(token as string);
  }, [token]);
  const notifications = data[0]?.notification;
  const reversed = notifications?.slice().reverse();
  return (
    <>
      <div className="notifications">
        <h2>Notifications</h2>
        <div className="notifications__container">
          {isLoading ? (
            <LoadingScreen />
          ) : (
            reversed?.map((el) => <Notification data={el} />)
          )}
        </div>
      </div>
    </>
  );
}

export default NotificationPage;
