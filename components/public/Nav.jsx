// built in imports
import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/router";

// external imports
import { AnimatePresence, motion } from "framer-motion"
import { FaQuoteLeft } from 'react-icons/fa'
import { GrHomeRounded, GrCode, GrMailOption, GrGrow, GrCatalog, GrSun, GrArchive, GrClipboard, GrTag, GrGremlin } from 'react-icons/gr'

// internal imports
import { ADMIN_URLS, NAV_LINK_DESCRIPTIONS, PUBLIC_URLS } from "../../utils";





export const NavBar = ({left=false, type='public'}) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
        <motion.nav 
            whileHover={{ scale: 1.1}}
            onClick={() => setShowMenu(prev => !prev)}
            className={"fixed z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group rounded-full top-4 h-10 w-10 " + (left ? 'left-2' : 'right-2') + (showMenu ? ' bg-transparent' : ' hover:bg-light filter hover:drop-shadow-xl')}>
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
                className={"w-6 rounded h-[2px] transition-colors " + (showMenu ? "bg-primary" : "bg-dark group-hover:bg-secondary")}></motion.span>
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
                className={"w-6 rounded h-[2px] transition-colors " + (showMenu ? "bg-primary" : "bg-dark group-hover:bg-secondary")}></motion.span>
        </motion.nav>
        <AnimatePresence>
            <NavMenu showMenu={showMenu} type={type} />
        </AnimatePresence>
        </>
  )
}


const NavMenu = ({ showMenu, type='public' }) => {
    const currentPath = useRouter().pathname;
    const [currentText, setCurrentText] = useState('');
    const [hoverText, setHoverText] = useState('');

    const URLS = type === 'public' ? PUBLIC_URLS : ADMIN_URLS

    useEffect(() => {
        setCurrentText(NAV_LINK_DESCRIPTIONS[currentPath])        
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
            className="h-full min-h-screen overflow-hidden w-screen fixed inset-0 main-light z-30 text-dark"
            variants={variants.section}
            initial={'hide'}
            animate={showMenu ? 'show' : 'hide'} >
            
            <div
            className={"h-full flex flex-col items-center justify-center pt-14 pb-4 md:py-0 " + (type !== 'public' ? '' : 'md:flex-row')}>
                <LeftPanel 
                    key={hoverText}
                    highlightCurrent={!Boolean(hoverText)}
                    isAdmin={type !== 'public'}
                    text={!Boolean(hoverText) ? currentText : hoverText}/>

                <RightPanel 
                    urls={URLS} 
                    currentPath={currentPath} 
                    setText={setHoverText}
                    isAdmin={type !== 'public'} />
                
            </div>
        </motion.section>
        </AnimatePresence>
    )
}



const LeftPanel = ({text, highlightCurrent, isAdmin}) => {
    if (isAdmin) {
        return (

            <h1 className="font-special text-4xl font-semibold capitalize mt-20">
                Admin Mode
            </h1>
        )
    }
    return (
        <section className="w-full grow h-auto flex flex-col p-4 items-center justify-center text-dark md:w-1/2 md:bg-gradient-to-r md:from-transparent md:to-secondary relative md:h-full">
            <img src="/hero.jpg" className="pointer-events-none z-0 hidden md:block h-full w-full absolute inset-0 object-cover opacity-25" />
            <div className="bg-light relative h-full z-10 filter drop-shadow-2xl p-2 md:pt-20 w-full rounded-md flex items-start flex-col justify-center max-w-md md:items-center md:bg-transparent">
                
                {/* user group */}
                <section className="flex items-center w-full justify-start gap-2 md:flex-col md:bg-light md:filter md:drop-shadow-2xl md:rounded-md md:w-fit md:p-4 md:gap-4 relative">
                    <img 
                        className="h-10 w-10 block object-cover rounded-full p-0.5 bg-light drop-shadow-lg md:h-16 md:w-16"
                        src="/sounak.jpg" 
                        alt="Sounak's face!"/>
                    <div className="flex flex-col items-start justify-start md:items-center md:justify-center">
                        <strong className="text-xs">Sounak Mukherjee</strong>
                        <p className="text-xs opacity-50 font-semibold">
                            <small>
                                Full Stack Web Developer
                            </small>
                        </p>
                    </div>
                </section>
                <span className="hidden md:block w-0.5 h-28 bg-dark"></span>
                <p className="text-xs pl-12 py-2 w-full md:bg-light md:filter md:drop-shadow-2xl md:rounded-md md:w-fit md:p-4 md:text-sm h-20 overflow-y-auto md:overflow-hidden md:h-auto scrollbar-thin md:flex md:items-start md:justify-start md:gap-x-3">
                    <FaQuoteLeft className="block md:text-xl mb-1 md:mb-0 text-secondary"/>
                    <motion.small 
                        initial={{ opacity: 0, rotate: -5}}
                        animate={{opacity: 1, rotate : 0 }}
                        className={"font-semibold w-full block selection:bg-dark selection:text-light leading-relaxed " + (highlightCurrent ? "text-secondary" : "text-dark")}>
                        {text} 
                    </motion.small>
                </p>
                <button className="hidden md:flex items-center gap-2 mt-auto bg-light filter drop-shadow-2xl p-4 w-fit rounded-md text-sm group">
                    <GrSun className="group-hover:animate-pulse transition-all opacity-50 group-hover:opacity-100"/> 
                        <small className="capitalize font-semibold transition-all opacity-50 group-hover:opacity-100">
                            Light Mode On
                        </small>
                </button>
            </div>
        </section>
    )
}


const RightPanel = ({urls, currentPath, isAdmin, setText}) => {
    const handleSetText = val => () => setText(val)

    return (
        <section className="w-full grow h-full flex flex-col p-4 items-center justify-center text-dark md:w-1/2">
            <ul className={"h-fit md:h-full mt-10 md:mt-0 w-max mx-auto flex flex-col justify-center gap-6 md:gap-10 px-4 " + (isAdmin ? "items-center" : "items-start")}>
            {Object.entries(urls).map(([key, valueObj]) => {
                let isActive;
                
                if ([PUBLIC_URLS.home.url, ADMIN_URLS.dashboard.url].includes(valueObj.url)){
                    if (currentPath === valueObj.url){
                        isActive = true;
                    }
                }
                else {
                    isActive = currentPath.startsWith(valueObj.url)
                }
                if (isActive) {
                    return(
                        <li key={key} className="capitalize w-fit text-sm md:text-base">
                            <Link href={valueObj.url}>
                                <a className={`flex items-center justify-center gap-x-2 relative before:h-1.5 before:w-1.5 before:rounded-full before:bg-secondary before:absolute before:top-1/2 before:-right-4 font-semibold before:-translate-y-1/2 md:font-normal`}>
                                    <LinkIcon type={valueObj.name} isActive={true} />
                                    <span>
                                        {valueObj.name}
                                    </span>
                                </a>
                            </Link>  
                        </li>
                    )
                }
                return(
                    <li key={key} className="capitalize w-fit text-sm md:text-base">
                        <Link href={valueObj.url}>
                            <a 
                                onMouseEnter={handleSetText(NAV_LINK_DESCRIPTIONS[valueObj.url])}
                                onMouseLeave={handleSetText('')}
                                className="flex items-center justify-center gap-x-2 font-semibold  md:font-normal relative group">
                                <LinkIcon type={valueObj.name}/>
                                <span className="opacity-50 group-hover:scale-x-105 origin-left group-hover:opacity-100 transition-all">
                                    {valueObj.name}
                                </span>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-secondary group-hover:w-6 origin-right transition-all duration-100"></span>
                            </a>
                        </Link>
                    </li>
                )
                })}
            </ul>
            { !isAdmin && 
            <button className="flex md:hidden items-center gap-2 mt-auto text-sm group">
                <GrSun className="transition-all opacity-50 group-hover:opacity-100"/> 
                    <small className="capitalize font-semibold transition-all opacity-50 group-hover:opacity-100">
                        Light Mode On
                    </small>
            </button>}
        </section>
    )
}


const LinkIcon = ({type, isActive}) => {
    let icon;
    switch(type.toLowerCase()) {
        case 'home':
            icon = <GrHomeRounded 
                className={"text-xs " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;
        
        case 'projects':
            icon = <GrCode 
                className={"text-sm " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        case 'blogs':
            icon = <GrCatalog 
                className={"text-xs " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        case 'designs':
            icon = <GrGrow 
                className={"text-sm " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        case 'contact me':
            icon = <GrMailOption 
                className={"text-xs " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        case 'inbox':
            icon = <GrArchive 
                className={"text-xs " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        case 'notes':
            icon = <GrClipboard 
                className={"text-xs " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        case 'tags':
            icon = <GrTag 
                className={"text-xs " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        case 'dashboard':
            icon = <GrGremlin 
                className={"text-xs " + (isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')} />
            break;

        default :
            icon = <></>
    }
    return icon;
}