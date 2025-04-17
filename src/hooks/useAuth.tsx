import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/lib/supabase-types";
import { useToast } from "@/components/ui/use-toast";
import { User, Session } from "@supabase/supabase-js";

// Extend the User interface to include additional fields like name and phone
declare module "@supabase/supabase-js" {
  export interface User {
    name?: string;
    phone?: string;
  }
}

// Auth context type definition
export interface AuthContextType {
  user: User | null;
  adminUser?: User | null;
  session: Session | null;
  role?: string | null;
  signUp: (
    email: string,
    password: string,
    userData?: { name?: string; phone?: string }
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInAdmin?: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper type for user_roles table (maps table structure to TypeScript)
type UserRoleRow = Database["public"]["Tables"]["user_roles"]["Row"];

// Define missing types for user_roles table
interface UserRoleInsert {
  user_id: string;
  role: string;
}

interface UserRoleUpdate {
  user_id?: string;
  role?: string;
}

// Map Supabase user to custom user object
const mapSupabaseUserToUser = (supabaseUser: User | null): User | null => {
  if (!supabaseUser) return null;
  return {
    ...supabaseUser,
    name: supabaseUser.user_metadata?.name || "",
    phone: supabaseUser.user_metadata?.phone || "",
  };
};

// Helper function to fetch user role
const getUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_roles") // Remove explicit type arguments to simplify and rely on inferred types
    .select("role")
    .eq("user_id", userId)
    .single();

  return { role: data?.role || null, error };
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, newSession) => {
        setSession(newSession);
        const mappedUser = mapSupabaseUserToUser(newSession?.user ?? null);
        setUser(mappedUser);

        if (mappedUser) {
          const { role } = await getUserRole(mappedUser.id);
          setRole(role);
        }

        setLoading(false);
      }
    );

    // Initial session fetch
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      const mappedUser = mapSupabaseUserToUser(currentSession?.user ?? null);
      setUser(mappedUser);

      if (mappedUser) {
        const { role } = await getUserRole(mappedUser.id);
        setRole(role);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    userData?: { name?: string; phone?: string }
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { ...userData },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created successfully!",
        description: "Please check your email for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message || "An unknown error occurred",
          variant: "destructive",
        });
        throw error;
      }

      const signedInUser = data.user;
      setUser(signedInUser);

      if (signedInUser) {
        const { role } = await getUserRole(signedInUser.id);
        setRole(role);
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      console.error("Sign-in error:", error);
    }
  };

  const signInAdmin = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });

      if (error) {
        toast({
          title: "Admin login failed",
          description: error.message || "An unknown error occurred",
          variant: "destructive",
        });
        throw error;
      }

      setAdminUser(data.user ?? null);
      toast({
        title: "Admin login successful",
        description: "You have successfully signed in as an admin.",
      });
    } catch (error: any) {
      console.error("Admin sign-in error:", error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setAdminUser(null);
      toast({ title: "Signed out successfully" });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminUser,
        session,
        role,
        signUp,
        signIn,
        signInAdmin,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
