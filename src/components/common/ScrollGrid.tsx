'use client';

import { useRef } from 'react';
import {
    useScroll,
    useTransform,
    motion,
    MotionValue,
} from 'framer-motion';

const IMAGES = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=600&q=80',
    'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80',
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&q=80',
    // index 7 = HERO (center of 5×3 grid)
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=90',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80',
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80',
    'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=600&q=80',
];

const HERO_INDEX = 7;
const COLS = 5;

interface CellProps {
    index: number;
    scrollProgress: MotionValue<number>;
}

function GridCell({ index, scrollProgress }: CellProps) {
    const isHero = index === HERO_INDEX;

    const col = index % COLS;
    const row = Math.floor(index / COLS);
    const heroCOL = HERO_INDEX % COLS; // 2
    const heroROW = Math.floor(HERO_INDEX / COLS); // 1
    const dx = col - heroCOL;
    const dy = row - heroROW;
    const dist = Math.max(Math.abs(dx), Math.abs(dy));

    // Stagger: closer images appear first during scroll
    const delay = dist * 0.07;
    const enterStart = 0.25 + delay;
    const enterEnd = Math.min(enterStart + 0.35, 0.95);

    // Hero: big and centered early, scales down to full grid at progress=0.5
    const heroScale = useTransform(scrollProgress, [0, 0.6], [3.2, 1]);
    const heroBorderRadius = useTransform(scrollProgress, [0, 0.5], [20, 8]);

    // Non-hero: completely invisible until scroll starts, then fade + slide in
    // Start at opacity 0 always, begin fading in only once scrolled
    const siblingOpacity = useTransform(scrollProgress, [enterStart, enterEnd], [0, 1]);
    const siblingY = useTransform(scrollProgress, [enterStart, enterEnd], [dy * 80 + 40, 0]);
    const siblingX = useTransform(scrollProgress, [enterStart, enterEnd], [dx * 25, 0]);
    const siblingScale = useTransform(scrollProgress, [enterStart, enterEnd], [0.82, 1]);

    if (isHero) {
        return (
            <motion.div
                className="relative overflow-hidden"
                style={{
                    scale: heroScale,
                    borderRadius: heroBorderRadius,
                    aspectRatio: '3/4',
                    zIndex: 10,
                    willChange: 'transform',
                }}
            >
                <img src={IMAGES[index]} alt="" className="w-full h-full object-cover" loading="eager" />
            </motion.div>
        );
    }

    return (
        // Key: initial style ensures they're invisible before Framer Motion takes over
        <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            style={{
                opacity: siblingOpacity,
                y: siblingY,
                x: siblingX,
                scale: siblingScale,
                borderRadius: 8,
                aspectRatio: '3/4',
                willChange: 'transform, opacity',
            }}
        >
            <img src={IMAGES[index]} alt="" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
    );
}

function ScrollHint({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
            style={{ opacity }}
        >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">scroll to reveal</p>
            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/30">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </motion.div>
    );
}

export default function ScrollGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <div ref={containerRef} style={{ height: '350vh', position: 'relative' }}>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        perspective: '1200px',
                        perspectiveOrigin: '50% 50%',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* 5×3 grid with larger gaps */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gridTemplateRows: 'repeat(3, 1fr)',
                            gap: '16px',
                            width: 'min(94vw, 960px)',
                            height: 'min(84vh, 680px)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {Array.from({ length: 15 }).map((_, i) => (
                            <GridCell key={i} index={i} scrollProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>

                <ScrollHint scrollProgress={scrollYProgress} />
            </div>
        </div>
    );
}
