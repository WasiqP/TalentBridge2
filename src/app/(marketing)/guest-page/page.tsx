import { redirect } from "next/navigation";

/** Legacy URL — job seeker home now lives at `/`. */
export default function GuestPageRedirect() {
  redirect("/");
}
