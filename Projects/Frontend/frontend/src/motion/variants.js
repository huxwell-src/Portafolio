// 1. Page transitions
export const pageVariants = {
  initial:  { opacity: 0, y: 10 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.25,0.1,0.25,1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

// 2. Stagger listas
export const listContainer = { 
  hidden: {}, 
  visible: { 
    transition: { staggerChildren: 0.06 } 
  } 
}
export const listItem = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } }
}

// 3. StatCard contador se maneja con useSpring en el componente

// 4. JobCard hover reveal
export const cardHoverReveal = {
  initial: { opacity: 0, x: 8 },
  hover:   { opacity: 1, x: 0, transition: { duration: 0.18 } }
}

// 5. StatusPill swap (AnimatePresence mode="wait", key={status})
export const pillSwap = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, scale: 1.08, transition: { duration: 0.1 } }
}

// 6. Modal
export const overlayVariants = {
  initial: { opacity: 0 }, 
  animate: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } }
}
export const modalVariants = {
  initial: { opacity: 0, scale: 0.95, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: [0.16,1,0.3,1] } },
  exit:    { opacity: 0, scale: 0.97, y: 10, transition: { duration: 0.15 } }
}

// 7. Botón
export const buttonTap = { 
  whileTap: { y: 1, scale: 0.99 } 
}

// 8. Navbar active → layoutId="nav-active" con spring { stiffness: 300, damping: 30 }
export const navActiveSpring = { 
  type: "spring", 
  stiffness: 300, 
  damping: 30 
}

// 9. Toast
export const toastVariants = {
  initial: { opacity: 0, y: -16, scale: 0.95 },
  animate: { opacity: 1, y: 0,   scale: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.15 } }
}

// 10. Skeleton → contenido: AnimatePresence fade 150ms/200ms
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } }
}
