import Page from "@/components/Page";
import { paddingX, pagePaddingY } from "@/constants/layout";

export default function Home() {
  const content = (
    <div className={`fixed w-full flex flex-col justify-between ${paddingX} ${pagePaddingY}`}>
      <h1 className="text-xl font-bold">Dynamic Content</h1>
      <p>This is a dynamically passed HTML content with styles!</p>
    </div>
  );

  return (
    <Page content={content} />
  );
}
