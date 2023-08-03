import { ReactNode, createContext, useState } from "react";

export const storage = (props: string) => {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(props);
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data);
    }
  }
};

interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});

const AuthContexProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(
    storage("access_token").access_token
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContexProvider;
