"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Logo3D = dynamic(() => import("@/src/components/common/Logo3D"), {
    ssr: false,
});


export default function LogoScrollWrapper() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const vw = () => window.innerWidth;
        const vh = () => window.innerHeight;
        const logoW = () => el.offsetWidth;
        const logoH = () => el.offsetHeight;

        const xShift = () => vw() < 768 ? vw() * 0.10 : 0;

        const startX = () => vw() - logoW() - 70 + xShift();
        const startY = () => vh() * 0.5 - logoH() * 0.5;

        const dropX = () => vw() - logoW() - 66 + xShift();
        const dropY = () => vh() * 0.58 - logoH() * 0.5;

        const sweepX = () => vw() * 0.46 - logoW() * 0.5 + xShift();
        const sweepY = () => vh() * 0.64 - logoH() * 0.5;

        const hookX = () => vw() * 0.18 - logoW() * 0.5 + xShift();
        const hookY = () => vh() * 0.74 - logoH() * 0.5;

        const endX = () => vw() * 0.10 - logoW() * 0.5 + xShift();
        const endY = () => vh() * 0.88 - logoH() * 0.5;

        gsap.set(el, { x: startX(), y: startY(), autoAlpha: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about-scroll-canvas",
                start: "top top",
                end: "bottom bottom",   
                scrub: 1.5,
                invalidateOnRefresh: true,
            },
        });

        tl.to(el, {
            motionPath: {
                path: [
                    { x: startX(), y: startY() },   // right-middle start
                    { x: dropX(), y: dropY() },     // short drop first on right
                    { x: sweepX(), y: sweepY() },   // wide sweep towards left
                    { x: hookX(), y: hookY() },     // tighten into left-side curve
                    { x: endX(), y: endY() },       // final downward segment on left
                ],
                curviness: 1.45,
                autoRotate: false,
            },
            ease: "power1.inOut",
            duration: 1,
        });

        //Hide when ChairpersonSection starts
        const hideTrigger = ScrollTrigger.create({
            trigger: "#about-content-section",
            start: "bottom 85%",
            onEnter: () => gsap.to(el, { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" }),
            onLeaveBack: () => gsap.to(el, { autoAlpha: 1, duration: 0.4, ease: "power1.inOut" }),
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            hideTrigger.kill();
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            id="logo-mover"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "clamp(240px, 30vw, 440px)",
                height: "clamp(240px, 30vw, 440px)",
                pointerEvents: "none",
                zIndex: 10,
                willChange: "transform",
            }}
        >
            <Logo3D />
        </div>
    );
}
