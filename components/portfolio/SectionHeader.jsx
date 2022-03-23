import { AnimatePresence, motion } from 'framer-motion'
import { JoinLine } from '../public/DescHeader'

export const SectionHeader = ({heading, content, cls='', fromLeft=false}) => {
  
  const variants = {
    l_r : {
      hide : {
        opacity : 0.5,
        x : '-200', 
      },
      show : {
        opacity : 1,
        x : 0, 
        transition : {
          type: 'tween',
          staggerChildren : .5,
          when : 'beforeChildren'
        }
      },
    },
    r_l : {
      hide : {
        opacity : 0.5,
        x : '200', 
      },
      show : {
        opacity : 1,
        x : 0, 
        transition : {
          type: 'tween',
          staggerChildren : .5,
          when : 'beforeChildren'
        }
      },
    },
    h2 : {
      hide : {
        opacity : 0.5,
        scaleY : .5
      },
      show : {
        opacity : [.5, 1],
        scaleY : [.5, 1], 
      },
    },
    content : {
      hide : {
        opacity : 0.5,
      },
      show : {
        opacity : 1,
        transition : {
          delay : .5,
          type : 'linear'
        }
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.article
        variants={fromLeft ? variants.l_r : variants.r_l}
        initial='hide' 
        whileInView='show' 
        className={`flex flex-col ${cls}`}>
          <motion.h2 
            variants={variants.h2}
            className='text-4xl font-black capitalize w-min'>
              {heading}
          </motion.h2>
          <JoinLine />
          <motion.div         
            variants={variants.content}>
            {content}
          </motion.div>
      </motion.article>
    </AnimatePresence>
  )
}
