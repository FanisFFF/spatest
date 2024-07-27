import axios from "axios";
import "./aside.styles.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ExploreUser from "../ExploreUser/explore-user.component";
import { BASE_URL } from "../../api/baseUrl";

function Aside() {
  const { token } = useAuth();
  const [users, setUser] = useState([]);
  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get`, {
        headers: {
          "x-auth": token,
        },
      });
      setUser(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser(token as string);
  }, [token]);

  return (
    <>
      <aside>
        <div className="explore">
          <h3>Explore</h3>
          {users.map((el) => (
            <ExploreUser data={el} />
          ))}
        </div>
      </aside>
    </>
  );
}
export default Aside;
