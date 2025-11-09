import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth, getUserProfile, UserProfile, signIn, signUp, logOut, onAuthChange, signInWithGoogle } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: "admin" | "doctor" | "staff" | "patient") => Promise<void>;
  loginWithGoogle: (role: "admin" | "doctor" | "staff" | "patient") => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setUser(user);
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signIn(email, password);
  };

  const register = async (email: string, password: string, name: string, role: "admin" | "doctor" | "staff" | "patient") => {
    await signUp(email, password, name, role);
  };

  const loginWithGoogle = async (role: "admin" | "doctor" | "staff" | "patient") => {
    await signInWithGoogle(role);
  };

  const logout = async () => {
    await logOut();
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
