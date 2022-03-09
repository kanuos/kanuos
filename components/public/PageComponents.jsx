// built in imports
import { useState } from "react"

// external imports
import { motion } from "framer-motion"
import { IoChevronDownCircleOutline, IoCheckmarkCircleSharp, IoChevronUpCircleOutline, IoRadioButtonOnOutline } from "react-icons/io5"


// internal imports
import { Step } from "./PageStepComponent"



export const PageSegment = ({segment, index}) => {
    const variants = {
        section : {
            show : {
                height: 'auto',
                transition : {
                    when : 'beforeChildren',
                    delayChildren : .5,
                }
            },
            hide : {
                height: '6rem',
                transition : {
                    when : 'afterChildren',
                    type: 'tween'
                }
            }
        },
        wrapper : {
            show : {
                opacity : 1,
                scale: 1,
                position : 'relative',
                pointerEvents : 'all',
                transition : {
                    type: 'tween',
                    origin : 'bottom',
                    delay: .25,
                    delayChildren : .5,
                    when: 'beforeChildren'
                }
            },
            hide : {
                opacity : 0,
                scale: 0,
                position : 'absolute',
                pointerEvents : 'none',
                transition : {
                    type: 'tween',
                    duration : .25,
                    when: 'afterChildren'
                }
            }
        },
        body : {
            show : {
                y : 0,
                opacity : 1,
                pointerEvents : 'all',
                transition : {
                    origin : 'bottom',
                    delay: .5
                }
            },
            hide : {
                y : '100%',
                opacity : 0,
                pointerEvents : 'none',
                transition : {
                    type: 'tween',
                    duration : .25
                }
            }
        },
    }

    const [show, setShow] = useState(false)
    const [isComplete, setIsComplete] = useState(false)

    async function toggleReadStatus() {
        new Promise(res => {
            setIsComplete(prev => !prev)
            return res(true);
        })
        .then(() => {
            if (!isComplete) {
                setShow(false)
            }
        })
    }

    return (
        <motion.section 
            variants={variants.section}
            animate={show ? 'show' : 'hide'}
            className='text-sm md:text-base w-full shadow-lg bg-light text-dark rounded relative ml-6'>
            <ul className="text-xs flex flex-col items-start gap-1 p-4">
                <li>
                    <small className="opacity-50 font-semibold">
                        Chapter {index}
                    </small>
                </li>
                <li className="flex w-full items-center justify-between">
                    <span className="font-semibold text-sm">
                        {segment.heading}
                    </span>
                    <button onClick={() => setShow(prev => !prev)} className="text-lg opacity-50 text-dark hover:opacity-100 hover:scale-105 transition-all">
                        {!show ? <IoChevronDownCircleOutline /> : <IoChevronUpCircleOutline />}
                    </button>
                </li>
            </ul>
            { !isComplete ? 
                <IoRadioButtonOnOutline className="text-xl text-primary absolute -left-8 top-0" />
                :
                <IoCheckmarkCircleSharp className="text-xl text-secondary absolute -left-8 top-0" />
            }
            <motion.section 
                className="p-4 overflow-hidden"
                animate={show ? 'show' : 'hide'}
                variants={variants.wrapper}>

                    <motion.article 
                        animate={show ? 'show' : 'hide'}
                        variants={variants.body}>
                        {segment.steps?.map((step, i) => (
                            <Step step={step} key={i} />
                        ))}
                    </motion.article>

                    <button onClick={toggleReadStatus} className="text-xs border-2 border-current rounded-md capitalize p-2.5 opacity-50 text-dark hover:opacity-100 font-semibold my-6 transition-all">
                        Mark as {isComplete ? 'incomplete' : 'complete'}
                    </button>
            </motion.section>
        </motion.section>
    )
}