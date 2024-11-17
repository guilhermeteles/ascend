import SignupCard from "@/components/SignupCard";
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
