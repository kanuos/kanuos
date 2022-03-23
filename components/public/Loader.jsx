import { motion } from 'framer-motion'

export const LoadSpinner = ({text='Loading'}) => {

   
  return (
    <div className="flex flex-col items-center justify-center my-10 gap-y-10">
        <span className="font-semibold text-center">
            {text}
        </span>
        <ul className="flex items-center justify-center gap-4">
            <motion.li 
                animate={{
                    scaleY : [.75, 1.5, .5],
                    backgroundColor : ['rgb(0, 191, 179)', 'rgb(255, 0, 102)', 'rgb(0, 191, 179)'],
                    origin : 'bottom',
                    transition : {
                        stiffness : 1000,
                        repeat : Infinity,
                        type : 'spring',
                        duration : .5,
                    }
                }}
                className="block h-10 w-10"></motion.li>
            <motion.li 
                animate={{
                    scaleY : [.75, 1.5, .5],
                    backgroundColor : ['rgb(0, 191, 179)', 'rgb(255, 0, 102)', 'rgb(0, 191, 179)'],
                    origin : 'top',
                    transition : {
                        stiffness : 1000,
                        repeat : Infinity,
                        type : 'spring',
                        duration : .75,
                        delay : .5
                    }
                }}
                className="block h-10 w-10 "></motion.li>
            <motion.li 
                animate={{
                    scaleY : [.75, 1.5, .5],
                    backgroundColor : ['rgb(0, 191, 179)', 'rgb(255, 0, 102)', 'rgb(0, 191, 179)'],
                    origin : 'bottom',
                    transition : {
                        stiffness : 1000,
                        repeat : Infinity,
                        type : 'spring',
                        duration : .5
                    }
                }}
                className="block h-10 w-10"></motion.li>
            <motion.li 
                animate={{
                    scaleY : [.75, 1.5, .5],
                    backgroundColor : ['rgb(0, 191, 179)', 'rgb(255, 0, 102)', 'rgb(0, 191, 179)'],
                    origin : 'top',
                    transition : {
                        stiffness : 1000,
                        repeat : Infinity,
                        type : 'spring',
                        duration : .75,
                        delay : .5
                    }
                }}
                className="block h-10 w-10"></motion.li>
        </ul>
        <span className="font-semibold text-center">
            Please wait
        </span>
    </div>
  )
}

