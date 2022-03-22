import { motion } from 'framer-motion'

import { PUBLIC_URLS } from "../../utils"
import { PortfolioLink } from "./PortfolioLink"
import { ProjectThumb } from "./ProjectThumb"

export const Showcase = ({portfolio, selectProject}) => {

  const vars = {
    section : {
      hide : { opacity : 0},
      show : { opacity : 1, transition : { type : 'linear', staggerChildren : .5, when : 'beforeChildren'}},
    },
    h2 : {
      hide : { opacity : 0, scaleY : 0, x : '-100%' },
      show : { opacity : 1, scaleY: 1, x : '0', transition : { type : 'spring', stiffness : 200 }},
    },
    showcase : {
      hide : { opacity : 0 },
      show : { opacity : 1, transition : { type : 'tween', delay : .5 }},
    },
    linkBox : {
      hide : { opacity : 0, y : '100%' },
      show : { opacity : 1, y : 0, transition : { type : 'tween', delay : .5 }},
    },
  }

  return (
    <motion.section
      variants={vars.section}
      initial='hide'
      whileInView='show'
      onScroll={e => e.preventDefault()} className='h-auto w-full max-w-5xl mx-auto'>
        <motion.h2 
          variants={vars.h2}
          className='text-6xl font-thin sm:text-8xl lg:text-9xl capitalize w-min px-16 mb-40'>
            selected works
        </motion.h2>
        <motion.div variants={vars.showcase} whileInView='show' className="flex flex-col p-4 items-center justify-start gap-20 lg:gap-y-40 h-auto overflow-y-auto scrollbar-none scrollbar-none snap-y snap-mandatory">
        {portfolio.map((p, i) => (
            <ProjectThumb 
              key={p._id} 
              project={p}
              selectProject={() => selectProject({_id : p._id})} 
              index={i + 1} 
              total={portfolio.length} />
        ))}    
        </motion.div>
        <motion.div variants={vars.linkBox} initial='hide' whileInView='show' className="grid place-items-center mt-20">
            <PortfolioLink label="more work →" href={PUBLIC_URLS.home.url}/>
        </motion.div>
    </motion.section>
  )
}
