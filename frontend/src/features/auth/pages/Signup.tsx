import SignupCard from "@/features/auth/components/SignupCard";
import Page from "@/components/Page";

export default function Signup () {
  const content = (
    <div className="flex h-full items-center mx-auto">
      <SignupCard />
    </div>
  );

  return (
    <Page content={content} />
  );
}
