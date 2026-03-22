"use client";

import { useEffect, useRef } from "react";
import type { GalleryImage } from "@/data/gallery";

interface Props {
  images: GalleryImage[];
  direction: "left" | "right";
  speed?: number;
}

export default function GalleryStrip({ images, direction, speed = 0.6 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Double the images for seamless loop
  const doubled = [...images, ...images];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      const half = track.scrollWidth / 2;

      if (!isDraggingRef.current && half > 0) {
        offsetRef.current += direction === "left" ? -speed : speed;
      }

      if (half > 0) {
        // left: 0 → -half → reset to 0
        if (offsetRef.current <= -half) offsetRef.current += half;
        // right: -half → 0 → reset to -half
        if (offsetRef.current >= 0 && direction === "right") offsetRef.current -= half;
      }

      track.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    // Right-scrolling strip starts halfway through so it looks like it starts from the other end
    if (direction === "right") {
      const half = track.scrollWidth / 2;
      offsetRef.current = half > 0 ? -half : 0;
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    offsetRef.current = dragStartOffsetRef.current + (e.clientX - dragStartXRef.current);
  };

  const onMouseUp = () => { isDraggingRef.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    offsetRef.current = dragStartOffsetRef.current + (e.touches[0].clientX - dragStartXRef.current);
  };

  const onTouchEnd = () => { isDraggingRef.current = false; };

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={trackRef}
        className="flex gap-4 w-max"
        style={{ willChange: "transform" }}
      >
        {doubled.map((img, i) => (
          <div key={i} className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.caption ?? ""}
              draggable={false}
              className="rounded-2xl block"
              style={{ height: "320px", width: "auto", objectFit: "cover", userSelect: "none" }}
            />
            {img.caption && (
              <p className="mt-2 text-xs text-[var(--fg-subtle)] font-sans lowercase">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
