import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Page from "@/components/Page";
import { paddingX } from "@/constants/layout";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const content = loading ? (
    <p>Loading...</p>
  ) : user ? (
    <div className={`h-full w-full ${paddingX} py-8`}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>UID:</strong> {user.uid}
          </p>
          <p>
            <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
          </p>
        </div>
        <button
          onClick={() => auth.signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <p>You are not logged in. Please log in to view your profile.</p>
  );

  return <Page content={content} />;
}
