"use client";

import React from "react";
import TiltedPhotoGrid from "@/src/components/common/TiltedPhotoGrid";
import Eventcard from "@/src/components/common/Eventcard";

function TornEdge() {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
      <img
        src="/images/events/tear.svg"
        alt="tear divider"
        className="w-full translate-y-1/4 opacity-100"
      />
    </div>
  );
}

export default function Event() {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-gray-500 to-black overflow-hidden">

        <div className="absolute inset-0 z-0">
          <TiltedPhotoGrid />
        </div>

        <TornEdge />

      </section>

      <section className="relative bg-black overflow-hidden">
        <Eventcard />
      </section>
    </>
  );
}