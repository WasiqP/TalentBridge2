"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const TILE_COUNT = 5;
const DURATION = 64;
const DEG = Math.PI / 180;

const CONTAINER_W = 160;
const CONTAINER_H = 200;
const HALF_W = CONTAINER_W / 2;
const HALF_H = CONTAINER_H / 2;

const PAD_OUTER = 20;
const PAD_INNER = 28;
/** Vertical clearance for taller tiles at the top/bottom of the arc. */
const PAD_Y = 40;
/** Pulls the orbit inward for a tighter, more concise arc. */
const ORBIT_RADIUS_INSET = 56;
const MIN_ORBIT_RADIUS = 242;
/** Target gap between tile edges along the orbit path (px). */
const TILE_ARC_GAP = 28;

type GuestSideOrbitProps = {
  side: "left" | "right";
};

function OrbitContainer() {
  return (
    <div
      style={{ width: CONTAINER_W, height: CONTAINER_H }}
      className={cn(
        "rounded-[12px] border-2 border-ink-900/20 bg-paper-50/40",
        "shadow-[0_16px_40px_-24px_rgba(8,8,12,0.2)]",
      )}
      aria-hidden
    />
  );
}

type OrbitLayout = {
  cx: number;
  cy: number;
  radius: number;
  stageWidth: number;
  tileAngleStep: number;
  isLeft: boolean;
};

/** Even tile spacing from container size + orbit radius so the arc stays balanced on resize. */
function getTileAngleStep(radius: number): number {
  const evenStep = 360 / TILE_COUNT;
  const minStep =
    ((CONTAINER_H + TILE_ARC_GAP) / radius) * (180 / Math.PI);
  return Math.max(evenStep, minStep);
}

/** Full-height arc — radius from viewport height, not narrowed by strip width. */
function getOrbitLayout(stageHeight: number, isLeft: boolean): OrbitLayout {
  const cy = stageHeight / 2;
  const radius = Math.max(
    MIN_ORBIT_RADIUS,
    cy - PAD_Y - HALF_H - ORBIT_RADIUS_INSET,
  );
  const stageWidth = radius + CONTAINER_W + PAD_OUTER + PAD_INNER;
  const cx = isLeft ? HALF_W + PAD_OUTER : stageWidth - HALF_W - PAD_OUTER;

  return {
    cx,
    cy,
    radius,
    stageWidth,
    tileAngleStep: getTileAngleStep(radius),
    isLeft,
  };
}

function layoutTile(
  outer: HTMLElement,
  index: number,
  rotationDeg: number,
  layout: OrbitLayout,
) {
  const offset = layout.tileAngleStep * index;
  const angle = (rotationDeg + offset) * DEG;
  const x = layout.cx + Math.cos(angle) * layout.radius;
  const y = layout.cy + Math.sin(angle) * layout.radius;

  outer.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  outer.style.opacity = "1";
  outer.style.zIndex = String(
    200 +
      Math.round(
        (layout.isLeft ? Math.cos(angle) : -Math.cos(angle)) * 50 + 50,
      ),
  );
}

/** Edge half-wheel — wide strip grows to fit the full orbit path. */
export function GuestSideOrbit({ side }: GuestSideOrbitProps) {
  const isLeft = side === "left";
  const clipRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    const clip = clipRef.current;
    if (!stage || !clip) return;

    const { gsap } = registerGsap();
    const outers = outerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!outers.length) return;

    const paint = (rotationDeg: number) => {
      const { height } = stage.getBoundingClientRect();
      const layout = getOrbitLayout(height, isLeft);

      clip.style.width = `${layout.stageWidth}px`;

      outers.forEach((outer, index) => {
        layoutTile(outer, index, rotationDeg, layout);
      });
    };

    if (prefersReducedMotion) {
      paint(0);
      return;
    }

    paint(0);

    const state = { rotation: 0 };
    const tween = gsap.to(state, {
      rotation: isLeft ? 360 : -360,
      duration: DURATION,
      ease: "none",
      repeat: -1,
      onUpdate: () => paint(state.rotation),
    });

    const onResize = () => paint(state.rotation);
    const observer = new ResizeObserver(onResize);
    observer.observe(stage);
    window.addEventListener("resize", onResize);

    return () => {
      tween.kill();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [isLeft, prefersReducedMotion]);

  return (
    <div
      ref={clipRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 z-[2] hidden overflow-hidden lg:block",
        isLeft ? "left-0" : "right-0",
      )}
    >
      <div ref={stageRef} className="relative h-full w-full">
        {Array.from({ length: TILE_COUNT }, (_, index) => (
          <div
            key={index}
            ref={(el) => {
              outerRefs.current[index] = el;
            }}
            className="absolute left-0 top-0 will-change-transform"
          >
            <OrbitContainer />
          </div>
        ))}
      </div>
    </div>
  );
}
