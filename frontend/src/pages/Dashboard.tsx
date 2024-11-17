import Page from "@/components/Page";
import { paddingX } from "@/constants/layout";

export default function Dashboard () {
  const content = (
    <div className={`h-full w-full ${paddingX} py-8`}>
        
      dashboard
    </div>
  );

  return (
    <Page content={content} />
  );
}
