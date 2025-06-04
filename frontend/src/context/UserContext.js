import { createContext, useState } from "react";

// dummy user for testing
const dummyUser = {
  _id: "665cbcd1f3b5871234567890",
  name: "Alice",
  instrument: "Guitar",
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(dummyUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
