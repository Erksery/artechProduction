import { motion } from 'framer-motion'

import styles from './SubmitButton.module.scss'

interface Props {
  text: string
  className?: string | undefined
  event?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const SubmitButton = ({
  text,
  className,
  type,
  disabled,
  event,
  ...props
}: Props) => {
  return (
    <motion.button
      onClick={event}
      className={`${styles.button} ${className}`}
      type={type}
      disabled={disabled}
      whileHover={{
        scale: 0.95
      }}
      whileTap={{
        scale: 0.9
      }}
      {...props}>
      {text}
    </motion.button>
  )
}
