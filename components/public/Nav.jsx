import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { SocialLinks } from "./SocialLinks";

import { JoinLine } from "./DescHeader";
import { ADMIN_URLS, PUBLIC_URLS } from "../../utils";
import { useRouter } from "next/router";
import Link from "next/link";


export const NavBar = ({left=false, type='public'}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
        <motion.nav 
            whileHover={{ scale: 1.1}}
            onClick={() => setShowMenu(prev => !prev)}
            className={"fixed z-40 flex flex-col items-center justify-center gap-y-1 cursor-pointer group rounded-full top-4 " + (left ? 'left-4' : 'right-4')}>
            <motion.span 
                animate={showMenu ? {
                    rotate: 45,
                    y: 3,
                    transition : { type : 'spring', stiffness : 400}
                } : 
                {
                    rotate: 0,
                    y: 0,
                    transition : { type : 'spring', stiffness : 400}
                    
                }}
                className={"w-6 rounded h-1 group-hover:bg-primary transition-colors " + (showMenu ? "bg-primary" : "bg-dark")}></motion.span>
            <motion.span 
                animate={showMenu ? {
                    rotate: -45,
                    y: -5,
                    transition : { type : 'spring', stiffness : 400}
                } : 
                {
                    rotate: 0,
                    y: 0,
                    transition : { type : 'spring', stiffness : 400}
                }}
                className={"w-6 rounded h-1 group-hover:bg-primary transition-colors " + (showMenu ? "bg-primary" : "bg-dark")}></motion.span>
        </motion.nav>
        <AnimatePresence>
            <NavMenu showMenu={showMenu} type={type} />
        </AnimatePresence>
        </>
  )
}


const NavMenu = ({ showMenu, type='public' }) => {
    const currentPath = useRouter().pathname;
    const [currentPathDesc, setCurrentPathDesc] = useState('');
    const [hoverText, setHoverText] = useState('');

    const URLS = type === 'public' ? PUBLIC_URLS : ADMIN_URLS

    
    function handleMouseIn(key) {
        setHoverText(_ => URLS[key])
    }

    function handleMouseOut() {
        setHoverText(prev => ({...prev, desc : ''}))
    }
    
    useEffect(() => {
        const k =  Object.entries(URLS).find(([_, v]) => v.url === currentPath)?.[0]
        if (k) {
            setCurrentPathDesc(_ => URLS[k])
            setHoverText(_ => URLS[k])
        }
    }, [currentPath])

    const variants = {
        section : {
            show : {
                y : 0,
                transition : {
                    type: 'tween'
                }
            },
            hide : {
                y : '-100vh',
                transition : {
                    type: 'tween',
                    duration : .5
                }
            }
        }
    }
    return (
        <AnimatePresence>
        <motion.section
            className="h-screen w-screen fixed top-0 left-0 main-light z-30 text-dark"
            variants={variants.section}
            initial={'hide'}
            animate={showMenu ? 'show' : 'hide'} >
            
            <div
            className="h-full p-4 flex flex-col items-center justify-center">
                {/* message section */}
                {type === 'public' ? <div className="px-10 pt-8 md:pt-16 h-fit max-w-xl md:max-w-lg mx-auto">
                    <section className="w-full h-fit flex flex-col items-center justify-center md:bg-light md:filter md:drop-shadow-2xl md:rounded-md md:items-start">
                        <div className="bg-light filter drop-shadow-2xl py-3 px-6 w-fit rounded-md flex items-center flex-col justify-center gap-2.5 md:flex-row md:bg-transparent md:p-2 md:gap-x-4">
                            <img 
                                className="h-14 w-14 object-cover rounded-full p-0.5 bg-light drop-shadow-lg"
                                src="/sounak.jpg" 
                                alt="Sounak's face!"/>
                            <div className="flex flex-col items-center justify-center md:items-start">
                                <strong className="text-sm">Sounak Mukherjee</strong>
                                <p className="text-xs opacity-50 font-semibold">
                                    <small>
                                        Full Stack Web Developer
                                    </small>
                                </p>
                            </div>
                        </div>
                        <div className="block md:hidden">
                            <JoinLine />
                        </div>
                        <div className="w-full bg-light filter drop-shadow-2xl h-24 p-4 md:px-6 md:pt-2 rounded-md md:bg-transparent">
                            <motion.p 
                                animate={hoverText?.desc?.length > 0 ? {x : 0, opacity: 1} : { x : '100%', opacity: 0}}
                                className="italic text-xs w-full md:hidden">
                                {hoverText.desc}
                            </motion.p>
                            <motion.p 
                                animate={hoverText?.desc?.length === 0 ? {x : 0, opacity: 1} : { x : '100%', opacity: 0}}
                                className="italic text-xs w-full md:hidden">
                                {currentPathDesc.desc}
                            </motion.p>
                            <p className="italic text-xs w-full hidden md:block">
                                {currentPathDesc.desc}
                            </p>
                        </div>
                    </section>
                </div>
                : 
                <h2 className="text-5xl mb-5 font-special font-semibold">
                    Admin Menu
                </h2>
                }           

                {/* list items */}
                <div className="py-8 md:py-0 w-full text-dark">
                    <ul className="h-full w-full flex flex-col items-center justify-start gap-y-8 md:max-w-sm md:mx-auto md:pt-12 md:border-l-2 md:border-dark md:border-opacity-20 md:items-start">
                        {Object.entries(URLS).map(([key, valueObj]) => {
                        let isActive;
                        console.log(valueObj.url, currentPath)
                        if (valueObj.url === '/'){
                            if (currentPath === valueObj.url){
                                isActive = true;
                            }
                        }
                        else {
                            isActive = currentPath.startsWith(valueObj.url)
                        }
                        if (isActive) {
                            return(
                                <li key={key} className="capitalize flex items-center gap-4 justify-center w-full md:w-fit text-primary md:pl-2">
                                    <p className="flex-grow flex justify-end peer">
                                    <Link href={valueObj.url}>
                                        <a className="text-right font-special w-max ml-auto md:w-full md:text-left text-xl relative before:h-1.5 before:w-1.5 before:rounded-full md:before:w-4 md:before:h-4 md:before:border-4 md:before:border-primary before:bg-primary md:before:bg-light before:absolute before:top-1/2 before:-left-4 font-semibold before:-translate-y-1/2 md:pl-4">
                                            {valueObj.name}
                                        </a>
                                    </Link>
                                    </p>
                                    <span className="flex-grow bg-primary h-0.5 md:hidden"></span>
                                    
                                </li>
                            )
                        }
                        return(
                            <li key={key} className="capitalize flex items-center justify-center w-full md:w-fit md:pl-2 md:relative md:flex-col md:items-start group">
                                <Link href={valueObj.url}>
                                    <a 
                                        onMouseEnter={() => handleMouseIn(key)}
                                        onMouseLeave={handleMouseOut}
                                        className="font-special text-xl transition-all hover:underline hover:tracking-widest peer md:hover:no-underline md:pl-4">{valueObj.name}</a>
                                </Link>
                                <p className="hidden md:group-hover:block font-semibold md:w-full opacity-60 md:ml-8 md:mt-2 md:text-xs">
                                    {valueObj.desc}
                                </p>
                            </li>
                        )
                        })}
                    </ul>
                </div>

                
                {/* social section */}
                {type === 'public' && <section className="flex flex-col items-center justify-center gap-2 mt-auto bg-light filter drop-shadow-2xl py-2 px-6 w-fit rounded-md ">
                    <p className="text-xs uppercase"><small>follow me</small></p>
                    <SocialLinks />
                </section>}
            </div>
        </motion.section>
        </AnimatePresence>
    )
}


// TODO: nav for desktop