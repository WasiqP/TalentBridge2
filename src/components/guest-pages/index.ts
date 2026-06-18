export { Guest1Page } from "@/components/guest-pages/guest-1";
export { Guest2Page } from "@/components/guest-pages/guest-2";
export { Guest3Page } from "@/components/guest-pages/guest-3";
export { Guest4Page } from "@/components/guest-pages/guest-4";
export { Guest5Page } from "@/components/guest-pages/guest-5";
export { GuestSideOrbit } from "@/components/guest-pages/guest-side-orbit";

export const guestPageRoutes = [
  { id: "guest-1", href: "/guest-1", label: "Option 1" },
  { id: "guest-2", href: "/guest-2", label: "Option 2" },
  { id: "guest-3", href: "/guest-3", label: "Option 3" },
  { id: "guest-4", href: "/guest-4", label: "Option 4" },
  { id: "guest-5", href: "/guest-5", label: "Option 5" },
] as const;
