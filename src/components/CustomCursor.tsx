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
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
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
          transition: opacity 0.3s;
          will-change: transform;
        }
        #cursor-dot {
          width: 8px; height: 8px;
          background: var(--accent);
        }
        #cursor-ring {
          width: 32px; height: 32px;
          border: 1.5px solid var(--accent);
          opacity: 0.5;
          transition: width 0.2s, height 0.2s, opacity 0.2s, border-color 0.2s;
        }
        #cursor-dot.cursor-hover {
          background: var(--accent-2);
          transform: scale(2) !important;
        }
        #cursor-ring.cursor-hover {
          width: 48px; height: 48px;
          opacity: 0.3;
          border-color: var(--accent-2);
        }

        @media (pointer: coarse) {
          #cursor-dot, #cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
}
