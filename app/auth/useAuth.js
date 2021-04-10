import { useContext } from "react";
import jwtDecode from "jwt-decode";
import AuthContext from "./context";
import storage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    storage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    storage.removeToken();
  };

  return { user, logOut, logIn };
};
