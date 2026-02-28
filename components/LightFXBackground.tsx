'use client';

import React, { useEffect, useRef } from 'react';

interface LightFXBackgroundProps {
  primaryRayColor?: string;
  secondaryRayColor?: string;
  starColor?: string;
  rayCount?: number;
  starCount?: number;
  rayOpacity?: number;
  raySpeed?: number;
  starBrightness?: number;
  className?: string;
}

const LightFXBackground: React.FC<LightFXBackgroundProps> = ({
  primaryRayColor = 'rgb(255, 163, 0)',
  secondaryRayColor = 'rgba(255, 163, 0, 0.5)',
  starColor = 'rgb(255, 163, 0)',
  rayCount = 3,
  starCount = 150,
  rayOpacity = 0.6,
  raySpeed = 1,
  starBrightness = 0.8,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Star particles
    const stars: Star[] = [];
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5;
        this.baseOpacity = Math.random() * starBrightness + 0.3;
        this.opacity = this.baseOpacity;
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
      }

      update() {
        this.opacity += this.twinkleSpeed;
        if (this.opacity >= this.baseOpacity || this.opacity <= this.baseOpacity * 0.3) {
          this.twinkleSpeed *= -1;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 163, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Light rays
    const rays: Ray[] = [];
    class Ray {
      angle: number;
      speed: number;
      opacity: number;
      width: number;
      maxLength: number;
      currentLength: number;

      constructor(index: number) {
        this.angle = (Math.PI * 2 / rayCount) * index + (Math.random() - 0.5) * 0.5;
        this.speed = raySpeed * (0.5 + Math.random() * 0.5);
        this.opacity = 0;
        this.width = 50 + Math.random() * 100;
        this.maxLength = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
        this.currentLength = this.maxLength * -0.5;
      }

      update() {
        this.currentLength += this.speed * 2;
        if (this.currentLength > this.maxLength) {
          this.currentLength = this.maxLength * -0.5;
        }

        // Fade in and out
        if (this.currentLength < 0) {
          this.opacity = 0;
        } else if (this.currentLength < this.maxLength * 0.2) {
          this.opacity = (this.currentLength / (this.maxLength * 0.2)) * rayOpacity;
        } else if (this.currentLength > this.maxLength * 0.7) {
          this.opacity = ((this.maxLength - this.currentLength) / (this.maxLength * 0.3)) * rayOpacity;
        } else {
          this.opacity = rayOpacity;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;

        const startX = canvas!.width / 2;
        const startY = canvas!.height / 2;

        const endX = startX + Math.cos(this.angle) * this.currentLength;
        const endY = startY + Math.sin(this.angle) * this.currentLength;

        // Create gradient for ray
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `rgba(255, 163, 0, 0)`);
        gradient.addColorStop(0.5, `rgba(255, 163, 0, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 163, 0, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize rays
    for (let i = 0; i < rayCount; i++) {
      rays.push(new Ray(i));
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = 'rgb(5, 5, 15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        star.update();
        star.draw(ctx);
      });

      // Update and draw rays
      rays.forEach((ray) => {
        ray.update();
        ray.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [rayCount, starCount, rayOpacity, raySpeed, starBrightness, primaryRayColor, secondaryRayColor, starColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LightFXBackground;
