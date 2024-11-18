import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully");
      navigate("/dashboard"); // Redirect to Dashboard after login
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Logged in with Google");
      navigate("/dashboard"); // Redirect to Dashboard after Google login
    } catch (err) {
      setError("Failed to log in with Google");
      console.error(err);
    }
  };

  return (
    <Card className="mx-auto bg-white w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
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
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
