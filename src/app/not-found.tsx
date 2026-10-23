import Link from "next/link";

import { TruckArt } from "@/components/truck-art";
import { buttonChili, container } from "@/components/styles";
import { site } from "@/content";

export default function NotFound() {
  return (
    <main id="content" className={`${container} grid items-center gap-8 py-16 sm:py-24 lg:grid-cols-2`}>
      <div>
        <p className="-rotate-2 font-script text-3xl text-pink-deep">Wrong turn</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-none text-chili sign-extrude-sm sm:text-7xl">Page not found</h1>
        <p className="mt-4 max-w-md text-lg font-semibold">That page is not on the route.</p>
        <Link href="/" className={`${buttonChili} mt-8`}>
          Back to {site.name}
        </Link>
      </div>
      <TruckArt compact className="mx-auto max-w-md" />
    </main>
  );
}
