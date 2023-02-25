import { useEffect } from "react";
import Posts from "./Posts";
import { useAuth } from "../context/auth/authContext";

const Home = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const today = new Date();
  const curHr = today.getHours();

  const getGreetingText = () => {
    if (curHr < 12) {
      return "Good Morning";
    } else if (curHr < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  };

  const greetingText = getGreetingText();

  return (
    <div className="component-style">
      {user && (
        <div className="greetings">
          <strong>
            <span className="text-muted">{greetingText},</span>
          </strong>
          <br />
          <span className="h1 text-capitalize">
            <strong>{user.name}</strong>
          </span>
        </div>
      )}

      <Posts />
    </div>
  );
};

export default Home;
