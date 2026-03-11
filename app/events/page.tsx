"use client";

import React from 'react'
import LineBackground from "@/components/LineBackground";
import TiltedPhotoGrid from "@/src/components/common/TiltedPhotoGrid";

export default function Event() {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-500 to-black overflow-hidden">
            <div className="fixed inset-0 z-0">
                <LineBackground
                    lineColor="rgba(180, 140, 60, 0.75)"
                    backgroundColor="transparent"
                    lineCount={14}
                    animated={true}
                />
            </div>

            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <TiltedPhotoGrid />
            </div>
        </div>
    )
}
