import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Page from "@/components/Page";
import { paddingX, pagePaddingY, profileColors } from "@/constants/layout";
import { useProfile } from "@/context/ProfileContext";

export default function Profile() {
  const { profileColor, setProfileColor, profileLetter, setProfileLetter } = useProfile();
  const [userEmail, setUserEmail] = useState("");
  const [userUID, setUserUID] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Set basic user info
      setUserEmail(user.email || "N/A");
      setUserUID(user.uid);
      setEmailVerified(user.emailVerified);

      // Fetch Firestore profile data
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfileColor(data.profileColor || "#f87171");
        setProfileLetter(data.profileLetter || "A");
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          profileColor,
          profileLetter,
        },
        { merge: true }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  const content = loading ? (
    <div className={`h-full w-full ${paddingX} flex items-center justify-center`}>
      <p>Loading...</p>
    </div>
  ) : (
    <div className={`h-full w-full ${paddingX} ${pagePaddingY}`}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        {/* User Information */}
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {userEmail}
          </p>
          <p>
            <strong>UID:</strong> {userUID}
          </p>
          <p>
            <strong>Email Verified:</strong> {emailVerified ? "Yes" : "No"}
          </p>
        </div>
        {/* Profile Customization */}
        <div>
          <h2 className="text-lg font-semibold">Profile Color</h2>
          <div className="flex gap-2 mt-2">
            {profileColors.map((color) => (
              <div
                key={color}
                className={`w-10 h-10 rounded-full cursor-pointer ${profileColor === color ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                style={{ backgroundColor: color }}
                onClick={() => setProfileColor(color)}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Profile Letter</h2>
          <input
            type="text"
            value={profileLetter}
            onChange={(e) => setProfileLetter(e.target.value.charAt(0).toUpperCase())}
            maxLength={1}
            className="border px-4 py-2 w-20 text-center"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  return <Page content={content} />;
}
