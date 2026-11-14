import { GoogleTagManager } from "@next/third-parties/google";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleTagManagerScripts() {
  return <GoogleTagManager gtmId={GTM_ID ?? ""} />;
}
