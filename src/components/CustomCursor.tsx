// CustomCursor.tsx — React island: cursor personalizado
// Se monta en el cliente. Solo activo en desktop.
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.setProperty("--x", `${mouseX}px`);
      dot.style.setProperty("--y", `${mouseY}px`);
    };

    const animRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.setProperty("--x", `${ringX}px`);
      ring.style.setProperty("--y", `${ringY}px`);
      animId = requestAnimationFrame(animRing);
    };
    animId = requestAnimationFrame(animRing);

    // hover enlargement on interactive elements
    const onEnter = () => {
      dot.classList.add("cursor-hover");
      ring.classList.add("cursor-hover");
    };
    const onLeave = () => {
      dot.classList.remove("cursor-hover");
      ring.classList.remove("cursor-hover");
    };

    const attach = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, label")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    attach();

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Ring follower */}
      <div ref={ringRef} id="cursor-ring" />
      {/* Dot — snaps instantly */}
      <div ref={dotRef} id="cursor-dot" />

      <style>{`
        #cursor-dot,
        #cursor-ring {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          border-radius: 50%;
          will-change: translate, scale;
        }
        #cursor-dot {
          width: 8px; height: 8px;
          background: var(--accent);
          translate: calc(var(--x, -100px) - 50%) calc(var(--y, -100px) - 50%);
          scale: var(--scale, 1);
          transition: background-color 0.2s, scale 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #cursor-ring {
          width: 32px; height: 32px;
          border: 1.5px solid var(--accent);
          opacity: 0.5;
          translate: calc(var(--x, -100px) - 50%) calc(var(--y, -100px) - 50%);
          scale: var(--scale, 1);
          transition: border-color 0.2s, opacity 0.2s, scale 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #cursor-dot.cursor-hover {
          background: var(--accent-2);
          --scale: 2;
        }
        #cursor-ring.cursor-hover {
          opacity: 0.3;
          border-color: var(--accent-2);
          --scale: 1.5;
        }

        @media (pointer: coarse) {
          #cursor-dot, #cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
}
