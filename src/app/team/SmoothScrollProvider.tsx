'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      // allow touch to be smooth properly
      syncTouch: true,
    })

    lenisRef.current = lenis

    // Proxy ScrollTrigger to use Lenis scroll position (keeps animations moving with scroll)
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis instead of a raw rAF loop
    // This avoids the RAF cleanup leak and keeps both systems on the same clock
    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
      lenisRef.current = null

      // Force remove any overflow locks manually that GSAP or Lenis might have left behind
      document.body.style.removeProperty('overflow')
      document.documentElement.style.removeProperty('overflow')
      document.body.style.removeProperty('height')
      document.documentElement.style.removeProperty('height')

      // Kill all active scroll triggers to prevent them from interfering globally
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
