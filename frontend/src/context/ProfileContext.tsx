import { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextType {
  profileColor: string;
  setProfileColor: (color: string) => void;
  profileLetter: string;
  setProfileLetter: (letter: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileColor, setProfileColor] = useState("#f87171");
  const [profileLetter, setProfileLetter] = useState("A");

  return (
    <ProfileContext.Provider value={{ profileColor, setProfileColor, profileLetter, setProfileLetter }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
