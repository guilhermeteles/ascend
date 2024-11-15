import Page from "@/components/Page";

export default function Home() {
  const content = (
    <div>
      <h1 className="text-xl font-bold">Dynamic Content</h1>
      <p>This is a dynamically passed HTML content with styles!</p>
    </div>
  );

  return (
    <Page content={content} />
  );
}
