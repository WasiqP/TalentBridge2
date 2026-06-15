"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Monitor } from "lucide-react";

import {
  guestHeroProductSlides,
  type GuestHeroProductSlide,
} from "@/constants/guest-hero";
import {
  GuestHeroExtractionPreview,
  GuestHeroProfilePreview,
} from "@/components/guest/guest-hero-product-preview";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 6000;

type GuestHeroProductShowcaseProps = {
  variant?: "default" | "stage";
};

function LivePreview({
  slideId,
  size,
}: {
  slideId: GuestHeroProductSlide["id"];
  size: "default" | "stage";
}) {
  if (slideId === "extraction") {
    return <GuestHeroExtractionPreview size={size} />;
  }
  return <GuestHeroProfilePreview size={size} />;
}

function SlideImage({
  slide,
  onFallback,
}: {
  slide: GuestHeroProductSlide;
  onFallback: () => void;
}) {
  return (
    <Image
      src={slide.imageSrc}
      alt={slide.imageAlt}
      fill
      className="object-cover object-top"
      sizes="(max-width: 1024px) 100vw, 960px"
      priority={slide.id === "extraction"}
      onError={onFallback}
    />
  );
}

export function GuestHeroProductShowcase({
  variant = "default",
}: GuestHeroProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState<Record<string, boolean>>({});

  const activeSlide = guestHeroProductSlides[activeIndex];
  const useLivePreview = imageFailed[activeSlide.id] === true;
  const isStage = variant === "stage";

  const markImageFailed = useCallback((id: string) => {
    setImageFailed((prev) => ({ ...prev, [id]: true }));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % guestHeroProductSlides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.05, delay: 0.35, ease: EASE }}
      className={cn(
        "relative w-full",
        isStage ? "mx-auto max-w-5xl lg:col-start-2" : "mx-auto max-w-lg",
      )}
      style={
        isStage
          ? { perspective: "2200px" }
          : undefined
      }
    >
      <div
        className={cn(
          "relative",
          isStage && "[transform:rotateX(7deg)] lg:[transform:rotateX(5deg)]",
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="pointer-events-none absolute -inset-x-8 bottom-0 top-[18%] -z-10 rounded-[40px] bg-accent-lime/10 blur-3xl"
          aria-hidden
        />

        <div
          className={cn(
            "relative rounded-[26px] border border-paper-50/12 bg-paper-50/[0.04] p-2 shadow-2xl backdrop-blur-xl",
            isStage
              ? "shadow-ink-950/55 sm:rounded-[30px] sm:p-2.5"
              : "shadow-ink-950/40",
          )}
        >
          <div
            className={cn(
              "overflow-hidden rounded-[20px] border border-paper-50/10 bg-ink-900/90",
              isStage && "sm:rounded-[22px]",
            )}
          >
            <div className="flex items-center gap-2 border-b border-paper-50/10 px-4 py-3 sm:px-5">
              <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper-50/20" />
              <span className="ml-2 flex flex-1 items-center justify-center gap-1.5 rounded-md bg-paper-50/5 px-2 py-0.5 font-mono text-[10px] text-paper-100/60 sm:text-[11px]">
                talentdrobe.app/dashboard
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-accent-lime/30 bg-accent-lime/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-accent-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                Live
              </span>
            </div>

            <div className="flex flex-col gap-2 border-b border-paper-50/10 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex gap-1">
                {guestHeroProductSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-medium transition sm:px-3 sm:text-[11px]",
                      index === activeIndex
                        ? "bg-paper-50 text-ink-950"
                        : "text-paper-100/55 hover:bg-paper-50/10 hover:text-paper-50",
                    )}
                  >
                    {slide.tabLabel}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-paper-100/45 sm:text-[11px]">
                {activeSlide.caption}
              </p>
            </div>

            <div
              className={cn(
                "relative overflow-hidden bg-paper-100",
                isStage
                  ? "min-h-[360px] sm:min-h-[440px] lg:min-h-[480px]"
                  : "min-h-[400px] sm:min-h-[440px]",
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSlide.id}-${useLivePreview ? "live" : "image"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0"
                >
                  {useLivePreview ? (
                    <LivePreview slideId={activeSlide.id} size={isStage ? "stage" : "default"} />
                  ) : (
                    <SlideImage
                      slide={activeSlide}
                      onFallback={() => markImageFailed(activeSlide.id)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 sm:px-0.5">
            <p className="inline-flex items-center gap-1.5 text-[11px] text-paper-100/55">
              <Monitor className="h-3.5 w-3.5" aria-hidden />
              {useLivePreview ? "Live dashboard preview" : "Product screenshot"}
            </p>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-paper-100/75">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent-lime" aria-hidden />
              Same UI after you sign up
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
