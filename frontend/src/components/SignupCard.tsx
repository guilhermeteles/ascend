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
          {/* Full Name Input */}
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              required
            />
          </div>
          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          {/* Password Input */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              required
            />
          </div>
          {/* Confirm Password Input */}
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                terms and conditions
              </a>
            </Label>
          </div>
          {/* Sign Up Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          {/* Social Sign Up */}
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign Up with Facebook
          </Button>
        </div>
        {/* Login Redirect */}
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
