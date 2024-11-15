import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function Home() {
  return (
    <div className="relative flex flex-col bg-green-200 h-full justify-between h-screen">
      <Header />
      <div className="grow">
        <div className="container mx-auto h-[100px] bg-green-400">

        </div>
      </div>
      <Footer />
    </div>
  );
}
