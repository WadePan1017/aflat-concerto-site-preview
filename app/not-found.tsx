"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const { pathname, search, hash } = window.location;
    const studioIndex = pathname.indexOf("/studio/");

    if (studioIndex !== -1) {
      const basePath = pathname.slice(0, studioIndex);
      window.location.replace(`${basePath}/studio/${search}${hash}`);
    }
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 text-slate-950">
      <div className="text-center">
        <p className="text-3xl font-semibold">404</p>
        <p className="mt-3 text-sm text-slate-600">This page could not be found.</p>
        <a
          href="/aflat-concerto-site-preview/"
          className="mt-6 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium"
        >
          Back to site
        </a>
      </div>
    </main>
  );
}
