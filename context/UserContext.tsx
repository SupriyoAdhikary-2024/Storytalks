import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  return (
    <UserContext.Provider
      value={{
        username,
        setusername,
        password,
        setpassword,
        phone,
        setPhone,
        languages,
        setLanguages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}