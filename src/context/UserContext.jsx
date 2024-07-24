import { createContext, useState } from "react";

export const UserContext = createContext(null);

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
