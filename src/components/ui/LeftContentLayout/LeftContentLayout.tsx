import { ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useShowMenu } from '../../../core/hooks'

const LeftContentLayout = ({ children }: { children: ReactNode }) => {
  const { scope, animate } = useShowMenu()

  const handleClickClose = () => {
    if (!scope && !animate) return
    // @ts-expect-error - animate
    animate(scope.current, {
      left: '-300px',
    })
  }

  useEffect(() => {
    const element = document.querySelector('.chat-left')

    const handleClickGlobal = (event: MouseEvent) => {
      const properties = element?.getBoundingClientRect()

      if (
        properties &&
        element &&
        !element.contains(event.target as Node) &&
        properties?.x === 0
      ) {
        handleClickClose()
      }
    }

    document.addEventListener('click', handleClickGlobal)
    return () => {
      document.removeEventListener('click', handleClickGlobal)
    }
  }, [])

  return (
    <motion.div
      ref={scope}
      className="chat-left max-lg: z-10 w-[300px] border-r-[1px] border-gray-600 bg-white shadow-gray-500 dark:bg-black max-lg:fixed max-lg:-left-[300px] max-lg:top-0 max-lg:h-full"
    >
      {children}
    </motion.div>
  )
}

export default LeftContentLayout
