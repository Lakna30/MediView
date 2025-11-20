import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth, getUserProfile, UserProfile, signIn, signUp, logOut, onAuthChange, signInWithGoogle } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: "admin" | "doctor" | "staff" | "patient") => Promise<boolean>;
  loginWithGoogle: (role?: "admin" | "doctor" | "staff" | "patient") => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const handleAuthChange = async (user: User | null) => {
      try {
        if (user) {
          const profile = await getUserProfile(user.uid);
          if (isMounted) {
            setUser(user);
            setUserProfile(profile);
            
            // If we just signed up, don't redirect, just update the state
            if (justSignedUp) {
              setJustSignedUp(false);
              setLoading(false);
              return;
            }
          }
        } else {
          if (isMounted) {
            setUser(null);
            setUserProfile(null);
          }
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        // Ensure we don't get stuck in loading state on error
        if (isMounted) {
          setUser(null);
          setUserProfile(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Set up the auth state listener
    const unsubscribe = onAuthChange(handleAuthChange);

    // Cleanup function
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [justSignedUp]);

  const login = async (email: string, password: string) => {
    await signIn(email, password);
  };

  const register = async (email: string, password: string, name: string, role: "admin" | "doctor" | "staff" | "patient") => {
    setJustSignedUp(true);
    await signUp(email, password, name, role);
    return true;
  };

  const loginWithGoogle = async (role?: "admin" | "doctor" | "staff" | "patient") => {
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
