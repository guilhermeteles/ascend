import LoginCard from "@/components/LoginCard";
import Page from "@/components/Page";

export default function Login() {
  const content = (
    <div className="flex h-full items-center mx-auto">
      <LoginCard />
    </div>
  );

  return (
    <Page content={content} />
  );
}
