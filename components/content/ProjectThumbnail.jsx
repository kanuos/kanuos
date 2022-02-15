import Link from "next/link"
import { useState } from "react"
import { PUBLIC_URLS } from "../../utils"
import { JoinLine } from "../public/DescHeader"
import { AnimatePresence, motion } from "framer-motion"
import { IoRemoveOutline, IoAddOutline, IoGameControllerOutline, IoPricetagOutline, IoCodeSlashOutline, IoCubeOutline } from "react-icons/io5"

export const ProjectThumbnail = ({data, index}) => {
    const [hovered, setHovered] = useState(false)
    const [showMD, setShowMD] = useState(false)

    const metadataVariants = {
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

    const btnVariants = {
        show : {
            y : 0, 
            opacity : 1,
            transition : {
                type : 'spring',
                stiffness : 400
            }
        },
        hide : {
            y : '100%', 
            opacity : 0,
        }
    }

    return (
        <article 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-dark flex flex-col gap-y-2 even:items-end odd:items-start group max-w-lg even:ml-auto odd:mr-auto">
            <p className="text-xs font-semibold transition-all group-hover:text-primary opacity-50">
                <small>Project : #{index}</small>
            </p>
            <h3 className="font-special font-semibold group-hover:tracking-wide transition-all text-2xl md:text-3xl group-odd:text-left group-even:text-right">
                {data.title}
            </h3>
            <div className="filter grayscale group-hover:grayscale-0">
                <JoinLine />
            </div>
            <p className="text-sm opacity-70 group-even:text-right group-odd:text-left group-hover:opacity-80 leading-relaxed">
                {data.desc?.slice(0, 150)}
            </p>
            <section className="bg-white rounded-md p-4 w-full mt-4 filter shadow-lg">
                <div className="flex items-center justify-between text-dark">
                    <p className="flex items-center justify-start gap-x-1 pb-2">
                        <IoCubeOutline />
                        <small className="text-sm font-semibold capitalize">Project information</small>
                    </p>
                    <button onClick={() => setShowMD(prev => !prev)}>
                        {!showMD 
                            ? 
                            <IoAddOutline className="text-lg transition-all group-hover:text-primary "/>
                            :
                            <IoRemoveOutline className="text-lg transition-all group-hover:text-primary "/>
                        }
                    </button>
                </div>
                <AnimatePresence>
                <motion.section 
                    variants={metadataVariants.wrapper}
                    animate={showMD ? 'show' : 'hide'}
                    className='w-full'>
                    <motion.ul 
                        variants={metadataVariants.body}     
                        className="text-xs flex mt-2 border-t flex-col items-start gap-4 py-4">
                        <li className="w-full">
                            <ul className="flex flex-col items-start gap-4">
                                <li className="flex items-center justify-start gap-1">
                                    <IoGameControllerOutline />
                                    <span className="capitalize font-semibold text-secondary">
                                        Difficulty 
                                    </span>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <small className="text-xs ml-4">
                                        {data.difficulty}
                                    </small>
                                    
                                </li>
                            </ul>
                        </li>
                        <li className="w-full">
                            <ul className="flex flex-col items-start gap-4">
                                <li className="flex items-center justify-start gap-1.5">
                                    <IoCodeSlashOutline />
                                    <span className="capitalize font-semibold text-secondary">
                                        Tech stack 
                                    </span>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <ul className="flex flex-col ml-4 items-start gap-y-2 list-inside list-disc">
                                    {data.techStack.map((stack, i) => (
                                        <li key={i}>
                                            <small className="text-xs opacity-80">
                                                {stack}
                                            </small>
                                        </li>
                                    ))}
                                    </ul>
                                    
                                </li>
                            </ul>
                        </li>
                        <li className="w-full">
                            <ul className="flex flex-col items-start gap-4">
                            <li className="flex items-center justify-start gap-1">
                                    <IoPricetagOutline />
                                    <span className="capitalize font-semibold text-secondary">
                                        category 
                                    </span>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <small className="text-xs ml-4">
                                        {data.category}
                                    </small>
                                    
                                </li>
                            </ul>
                        </li>
                    </motion.ul>                    
                </motion.section>
                </AnimatePresence>
            </section>
            <ul className="text-sm mt-4 group-even:text-right group-odd:text-left">
                <li className="text-xs font-semibold capitalize opacity-75">
                    <small>
                        Project Date
                    </small>
                </li>
                <li className="text-xs font-semibold text-dark group-hover:text-primary">
                    {data.date}
                </li>
            </ul>
            <Link href={PUBLIC_URLS.projects.url + '/' + data._id}>
                <motion.a 
                    variants={btnVariants}
                    animate={hovered ? 'show' : 'hide'}
                    className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark">
                        go to project
                    </span>
                    <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
                </motion.a>
            </Link>
        </article>
    )
}
