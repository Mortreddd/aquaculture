import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "./FirebaseProvider";
import { useAlert } from "./AlertProvider";

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  currentUser: User | null;
}

export interface AuthProps {
  email: string;
  password: string;
}

// Use null for default context value to handle null checks
const AuthContext = createContext<AuthContextProps | null>(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
}

function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Login function with error handling
  async function login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(result.user);
      showAlert("Successfully logged in", "success");
    } catch (error) {
      console.error("Error logging in:", error);
      // Optionally, show a user-friendly message or use a toast notification
      showAlert("Something went wrong", "error");
      throw error; // You can throw the error if you want to propagate it or handle differently
    }
  }

  // Register function with async/await and error handling
  async function register(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(result.user);
      showAlert("Successfully registered", "success");
    } catch (error) {
      console.error("Error registering user:", error);
      showAlert("Unable to register", "error");

      // Handle registration errors here (e.g., show message like "Email already exists")
      throw error; // Optionally propagate the error
    }
  }

  async function forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      showAlert("Password reset email sent", "success");
    } catch (error) {
      console.error("Error registering user:", error);
      showAlert("Unable to send password reset email", "error");
      // Handle registration errors here (e.g., show message like "Email already exists")
      throw error; // Optionally propagate the error
    }
  }

  // Login with Google with error handling
  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log("Google Login Successful", result.user);
      setCurrentUser(result.user);
      showAlert("Successfully logged in with Google", "success");
    } catch (error) {
      console.error("Google Login Error:", error);
      showAlert("Failed to login with Google", "error");
    }
  }

  // Logout function
  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
      showAlert("Successfully logged out", "success");
    } catch (error) {
      console.error("Error logging out:", error);
      showAlert("Failed to logout", "error");
      // Handle logout error here
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        loginWithGoogle,
        logout,
        forgotPassword,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
