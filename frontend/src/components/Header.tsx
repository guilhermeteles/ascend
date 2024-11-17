import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "./ui/button";
import { paddingX } from "@/constants/layout";
import { LogOut } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home after logout
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div id="header" className={`fixed w-full bg-gray-400 flex justify-between ${paddingX} py-2`}>
      {/* Logo */}
      <Button variant="outline" onClick={() => navigate("/")}>
        Logo
      </Button>

      {/* Right-side buttons */}
      <div className="flex gap-2 items-center">
        {user ? (
          // User is logged in
          <>
            <span className="text-sm">Welcome, {user.email}</span>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut />
            </Button>
          </>
        ) : (
          // User is not logged in
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Signup</Button>
          </>
        )}
      </div>
    </div>
  );
}
