"use client";

import React from "react";
import Image from "next/image";
import { Barlow_Condensed, Barlow } from 'next/font/google';

const barlowCondensed = Barlow_Condensed({
  weight: ['700', '800'],
  subsets: ['latin'],
});

const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
});


interface CardProps {
  image: string;
  title: string;
  description: string;
}


const cards: CardProps[] = [
  {
    title: "Project",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/photo1.svg",
  },
  {
    title: "Project",
    description:
       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/pic2.svg",
  },
  {
    title: "Project",
    description:
       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/pic3.svg",
  },
  {
    title: "Project",
    description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/pic4.svg",
  },
];

//Arrow Icon

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

//Card 

const Card = ({ image, title, description }: CardProps) => {
  return (
    <div className={`w-[280px] h-[440px] rounded-[7px] overflow-hidden bg-[#111] border border-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative transition-colors duration-[250ms] ease-in hover:bg-[#F4A119] hover:border-[#F4A119] cursor-pointer group flex flex-col shrink-0 ${barlow.className}`}>

      <div style={{ padding: "14px 14px 2px 14px" }} className="w-full">
        <div className="relative w-full h-[260px] rounded-[8px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top block transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div style={{ padding: "14px" }} className="flex-1 flex flex-col">

        <div className="flex items-center justify-between mb-[10px]">
          <h2 className={`font-extrabold text-[38px] tracking-[0.03em] uppercase text-white leading-none m-0 flex overflow-hidden ${barlowCondensed.className}`}>
            {title.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block relative transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <span className="inline-block transition-transform duration-[400ms] group-hover:-translate-y-full">
                  {char === " " ? "\u00A0" : char}
                </span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-[400ms] group-hover:-translate-y-full text-white">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h2>
          <div className="flex items-center justify-center text-white shrink-0">
            <span
              className="inline-block relative overflow-hidden transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center"
              style={{ transitionDelay: `${title.length * 30}ms` }}
            >
              <span className="inline-flex transition-transform duration-[400ms] group-hover:-translate-y-full items-center justify-center">
                <ArrowIcon />
              </span>
              <span className="absolute left-0 top-full inline-flex transition-transform duration-[400ms] group-hover:-translate-y-full text-white items-center justify-center">
                <ArrowIcon />
              </span>
            </span>
          </div>
        </div>

        <p className="text-[15px] leading-[1.55] text-white/90 font-normal m-0 p-0 transition-colors duration-[250ms] font-medium">
          {description}
        </p>

      </div>
    </div>
  );
};

// Section

const CascadingCards = () => {
  return (
    <section className="w-full min-h-[100vh] flex items-center justify-center py-[60px] px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-[20px]">
        {cards.map((card, index) => (
          <div
            key={card.title}
            style={{ marginTop: index * 48 }}
            className="flex shrink-0"
          >
            <Card {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CascadingCards;