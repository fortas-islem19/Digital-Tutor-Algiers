import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'

export const spring = { type: 'spring', stiffness: 260, damping: 18 }

// Fades and lifts children into view once, the way captions pop in the video.
export function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Pops an element in with an overshoot, like the stickers/badges in the video.
export function Pop({ children, delay = 0, rotate = 0, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.3, rotate: rotate - 12 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  )
}

// Counts up from `from` to `to` when scrolled into view.
export function Counter({ from = 0, to, duration = 1.6, className, format = (v) => v }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  )
}
