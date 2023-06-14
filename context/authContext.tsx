import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

const AuthContext = createContext({});

const AuthContextPovider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] === "(Auth)";

    if (!authToken && !isAuthGroup) {
      router.replace("/signin");
    }

    if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync("authToken");

      if (res) {
        setAuthToken(res);
      }
    };
    loadAuthToken();
  }, []);

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync("authToken", newToken);
    setAuthToken(newToken);
  };

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, updateAuthToken, removeAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextPovider;

export const useAuth = () => useContext(AuthContext);
