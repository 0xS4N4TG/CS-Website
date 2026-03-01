"use client";
import React, { useEffect, useRef } from "react";
import styles from "@/src/components/common/ScrollGrid.module.css";

const ScrollGrid: React.FC = () => {
  const scrollDriverRef = useRef<HTMLDivElement>(null);
  const heroCellRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollDriver = scrollDriverRef.current!;
    const heroCell = heroCellRef.current!;
    const gridCon = gridContainerRef.current!;
    const heroText = heroTextRef.current!;
    const scrollHint = scrollHintRef.current!;
    const placeholder = gridCon.querySelector(
      `.${styles.placeholder}`
    ) as HTMLDivElement;

    const cells = Array.from(
      gridCon.querySelectorAll(
        `.${styles.cell}:not(.${styles.placeholder})`
      )
    ) as HTMLDivElement[];

    function clamp(v: number, a: number, b: number) {
      return Math.max(a, Math.min(b, v));
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function easeOut3(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function easeInOut3(t: number) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    const staggerMap: Record<number, number> = {
      1: 0.55,
      3: 0.55,
      5: 0.55,
      7: 0.55,
      0: 0.72,
      2: 0.72,
      6: 0.72,
      8: 0.72,
    };

    function tick() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const totalScroll = scrollDriver.offsetHeight - vh;
      const scrolled = window.scrollY;
      const progress = clamp(scrolled / totalScroll, 0, 1);

      const pr = placeholder.getBoundingClientRect();

      let w: number, h: number, left: number, top: number, radius: number;

      if (progress < 0.38) {
        const p = easeOut3(progress / 0.38);

        const sw = vw * 0.78,
          sh = vh * 0.72;
        const ew = vw * 0.78,
          eh = vh * 0.72;

        w = lerp(sw, ew, p);
        h = lerp(sh, eh, p);
        left = vw / 2 - w / 2;
        top = lerp(-sh * 0.6, vh / 2 - h / 2, p);
        radius = 18;

        heroText.style.opacity = String(clamp(1 - p * 2.2, 0, 1));
        scrollHint.style.opacity = String(clamp(1 - p * 3, 0, 1));

        cells.forEach((c) => c.classList.remove(styles.visible));
        heroCell.style.opacity = "1";
        placeholder.style.background = "#1a1a1a";
      } else {
        const p = easeInOut3((progress - 0.38) / 0.62);

        const fw = vw * 0.78,
          fh = vh * 0.72;
        const fleft = vw / 2 - fw / 2;
        const ftop = vh / 2 - fh / 2;

        w = lerp(fw, pr.width, p);
        h = lerp(fh, pr.height, p);
        left = lerp(fleft, pr.left, p);
        top = lerp(ftop, pr.top, p);
        radius = lerp(18, 10, p);

        heroText.style.opacity = "0";
        scrollHint.style.opacity = "0";

        cells.forEach((c) => {
          const i = parseInt(c.dataset.i || "0");
          const threshold = staggerMap[i] ?? 0.6;
          if (p >= threshold) {
            c.classList.add(styles.visible);
          } else {
            c.classList.remove(styles.visible);
          }
        });

        if (progress > 0.98) {
          placeholder.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80')";
          placeholder.style.backgroundSize = "cover";
          placeholder.style.backgroundPosition = "center";
          heroCell.style.opacity = "0";
        } else {
          placeholder.style.backgroundImage = "";
          heroCell.style.opacity = "1";
        }
      }

      heroCell.style.left = left + "px";
      heroCell.style.top = top + "px";
      heroCell.style.width = w + "px";
      heroCell.style.height = h + "px";
      heroCell.style.borderRadius = radius + "px";

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, []);

  return (
    <>
      <div className={styles.heroText} ref={heroTextRef}>
        <h1>
          The
          <br />
          <em>Collection</em>
        </h1>
        <p>scroll to explore</p>
      </div>

      <div className={styles.scrollHint} ref={scrollHintRef}>
        ↓ scroll
      </div>

      <div className={styles.scrollDriver} ref={scrollDriverRef}>
        <div className={styles.sticky}>
          <div className={styles.gridContainer} ref={gridContainerRef}>
            <div className={styles.cell} data-i="0">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" alt="" />
            </div>
            <div className={styles.cell} data-i="1">
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80" alt="" />
            </div>
            <div className={styles.cell} data-i="2">
              <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&q=80" alt="" />
            </div>
            <div className={styles.cell} data-i="3">
              <img src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80" alt="" />
            </div>

            <div
              className={`${styles.cell} ${styles.placeholder}`}
              data-i="4"
            ></div>

            <div className={styles.cell} data-i="5">
              <img src="https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=400&q=80" alt="" />
            </div>
            <div className={styles.cell} data-i="6">
              <img src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80" alt="" />
            </div>
            <div className={styles.cell} data-i="7">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" alt="" />
            </div>
            <div className={styles.cell} data-i="8">
              <img src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&q=80" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cellHero} ref={heroCellRef}>
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85"
          alt="Hero"
        />
      </div>
    </>
  );
};

export default ScrollGrid;