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
  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const shuffledUsers = shuffle(users);
  const slicedUsers = shuffledUsers?.slice(0, 3);

  return (
    <>
      <aside>
        <div className="explore">
          <h3>Explore</h3>
          {slicedUsers.map((el, i) => (
            <ExploreUser data={el} key={i} />
          ))}
        </div>
      </aside>
    </>
  );
}
export default Aside;
