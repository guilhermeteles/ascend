import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "./ui/button";
import { paddingX, profileColors } from "@/constants/layout";
import { LogOut } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const { profileColor, setProfileColor, profileLetter, setProfileLetter } = useProfile();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileColor(data.profileColor || "#f87171");
          setProfileLetter(data.profileLetter || "A");
        } else {
          const randomIndex = Math.floor(Math.random() * profileColors.length);
          const randomColor = profileColors[randomIndex];
          setProfileColor(randomColor);
          setProfileLetter(currentUser.email?.[0].toUpperCase() || "A");

          await setDoc(userDocRef, {
            profileColor: randomColor,
            profileLetter: currentUser.email?.[0].toUpperCase() || "A",
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div id="header" className={`fixed w-full bg-white border border-b flex justify-between ${paddingX} py-2 items-center`}>
      <Button variant="link" onClick={() => navigate("/")} className="font-light text-sm p-0 tracking-widest">
        ASCEND
      </Button>
      <div className="flex gap-2 items-center">
        {user ? (
          <>
            <span className="text-sm">Welcome, {user.email}</span>
            {location.pathname !== "/dashboard" && (
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            )}
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-white font-bold"
              style={{ backgroundColor: profileColor }}
              onClick={() => navigate("/profile")}
            >
              {profileLetter}
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut />
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Signup</Button>
          </>
        )}
      </div>
    </div>
  );
}
