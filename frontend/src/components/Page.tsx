import { ReactNode, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { footerHeight, headerHeight } from "@/constants/layout";

interface PageProps {
    content: ReactNode;
  }

export default function Page({ content }: PageProps) {
  const [headerH, setHeaderH] = useState(0);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    const calculateHeights = () => {
      setHeaderH(headerHeight());
      setFooterH(footerHeight());
    };

    calculateHeights();

    // Recalculate on window resize
    window.addEventListener("resize", calculateHeights);

    return () => window.removeEventListener("resize", calculateHeights);
  }, []);
  
  return (
    <div className="relative flex flex-col justify-between h-screen">
      <Header />
      <div className="grow" style={{ marginTop: `${headerH}px`, marginBottom: `${footerH}px` }}>

        {content}

      </div>
      <Footer />
    </div>
  );
}
