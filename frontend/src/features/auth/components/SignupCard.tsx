import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully");
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (err) {
      setError("Failed to create an account");
      console.error(err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Signed up with Google");
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (err) {
      setError("Failed to sign up with Google");
      console.error(err);
    }
  };

  return (
    <Card className="mx-auto bg-white w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create an account to access all features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                terms and conditions
              </a>
            </Label>
          </div>
          <Button onClick={handleSignup} className="w-full">
            Sign Up
          </Button>
          <Button onClick={handleGoogleSignup} variant="outline" className="w-full">
            Sign Up with Google
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
