import { Studio } from "./Studio";

export function generateStaticParams() {
  return [{ index: [] }, { index: ["structure"] }];
}

export default function StudioPage() {
  return <Studio />;
}
