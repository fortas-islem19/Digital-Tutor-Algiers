import { motion } from 'framer-motion'

// Simple fade-up on scroll. No blur or scaling, so text is always sharp.
export function Reveal({ children, delay = 0, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
