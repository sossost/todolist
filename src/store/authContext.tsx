import { ReactNode, createContext, useState } from "react";

export const storage = (props: string) => {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(props);
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data).access_token;
    }
  }
};

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setTokenInLocalStorage: (token: string) => void;
  removeTokenInLocalStorage: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  setTokenInLocalStorage: () => {},
  removeTokenInLocalStorage: () => {},
});

const AuthContexProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(storage("access_token"));

  const setTokenInLocalStorage = (token: string) => {
    localStorage.setItem(
      "access_token",
      JSON.stringify({ access_token: token })
    );
    setToken(token);
  };

  const removeTokenInLocalStorage = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        setTokenInLocalStorage,
        removeTokenInLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContexProvider;
