import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "./FirebaseProvider";
import { Navigate } from "react-router-dom";

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  currentUser: User | null;
}

export interface AuthProps {
  email: string;
  password: string;
}

const AuthContext = createContext<undefined | AuthContextProps>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Must within the provider");
  }

  return context;
}

interface AuthProviderProps extends PropsWithChildren {}

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      console.log("user", user);
    });

    return () => unsubcribe();
  }, []);

  async function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      setCurrentUser(result.user);
    });
  }

  async function register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      setCurrentUser(result.user);
    });
  }

  async function loginWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      setCurrentUser(result.user);
    });
  }

  async function logout() {
    auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ login, register, loginWithGoogle, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
