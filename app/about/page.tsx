"use client";
import { Skiper19 } from "@/src/components/ui/stroke";

import LineBackground from "@/components/LineBackground";

export default function Home() {
  return (
    <>
    <div className="fixed inset-0 -z-10">
              <LineBackground
                lineColor="rgba(180, 140, 60, 0.75)"
                backgroundColor="#0d0d0d"
                lineCount={14}
                animated={true}
              />
            </div>
      <div>
        <Skiper19 />        
      </div>
    </>
  );
}