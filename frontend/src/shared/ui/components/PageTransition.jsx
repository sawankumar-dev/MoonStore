import { motion } from "framer-motion"

// 8 animation variants — jo bhi chahiye woh pass kar do
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 }
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
  slideLeft: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  slideRight: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  flip: {
    initial: { opacity: 0, rotateX: -8, y: 20 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
    exit: { opacity: 0, rotateX: 5, y: -10 },
    transition: { duration: 0.6 }
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)", y: 10 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(4px)", y: -5 },
    transition: { duration: 0.6 }
  }
}

const PageTransition = ({ children, variant = "flip", className = "" }) => {
  const v = variants[variant] || variants.blur

  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={v.transition}
      style={{ perspective: variant === "flip" ? 600 : undefined }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition