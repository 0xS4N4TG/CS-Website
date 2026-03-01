"use client";
import { useEffect, useState } from "react";
import styles from "@/src/components/common/CardStack.module.css";

const images = [
  "/images/events/1.png",
  "/images/events/2.png",
  "/images/events/3.png",
  "/images/events/4.png",
  "/images/events/5.png",
  "/images/events/6.png",
  "/images/events/7.png",
];

export default function CardStack() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Wait for paint, then start timer
    const raf = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className={styles.container}>
     {/* <h1 className={styles.heading}>IEEE CS</h1> */}
      <div className={`${styles.cards} ${open ? styles.open : ""}`}>
        {images.map((src, index) => (
          <div key={index} className={styles.card}>
            <img
              src={src}
              alt={`card-${index}`}
              loading="eager"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}