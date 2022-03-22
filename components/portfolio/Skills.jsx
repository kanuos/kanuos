import { motion } from 'framer-motion';
import { SecondaryHeading } from "./SecondaryHeading"

export const Skills = ({isDarkMode, techStack=[]}) => {
  const listVariant = {
    ul : {
      show : {
        opacity : 1,
        transition : {
          staggerChildren : .5,
          when : 'beforeChildren'
        }
      },
      hide : {
        opacity : 0
      }
    },
    li : {
      show : {
        opacity : 1,
        transition : {
          type : 'spring'
        }
      },
      hide : {
        opacity : 0
      }
    }
  }

  if (techStack.length === 0) {
    return <></>
  } 

  return (
    <motion.section 
      initial={{
        rotate : 5,
        opacity : .5,
        scale : 0.5
      }}
      whileInView={{
        rotate : 0,
        opacity : 1,
        scale : 1
      }}
      transition={{
        type: 'spring'
      }}
      className={"grid place-items-center relative w-full lg:min-h-screen lg:bg-dark lg:bg-opacity-20 lg:mb-40" }>
      <div className={"flex flex-col items-start gap-16 justify-around w-full max-w-xl mx-auto p-16 lg:col-span-3 lg:-mt-20 lg:-rotate-6 lg:shadow-xl " + (isDarkMode ? 'bg-light text-dark lg:after:text-light' : 'bg-dark text-light lg:after:text-dark')}>
        {techStack.map(({heading, items}, i) => (
          <div className="w-full max-w-lg lg:max-w-none lg:w-max flex flex-col items-start gap-y-6" key={i}>
              <SecondaryHeading text={heading} alignLeft={true} />
              <motion.ul 
                variants={listVariant.ul}
                initial="hide"
                whileInView='show'
                className="flex flex-col gap-y-1">
                {items.map((item, index) => (
                  <motion.li variants={listVariant.li} key={index} className="whitespace-pre-line text-xs opacity-50 lg:opacity-90 font-semibold">
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
