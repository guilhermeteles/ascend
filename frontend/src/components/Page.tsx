import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface PageProps {
    content: ReactNode;
  }

export default function Page({ content }: PageProps) {
  return (
    <div className="relative flex flex-col bg-green-200 h-full justify-between h-screen">
      <Header />
      <div className="grow">
        <div className="container mx-auto h-[100px] bg-green-400 my-16">
        {content}
        </div>
      </div>
      <Footer />
    </div>
  );
}
