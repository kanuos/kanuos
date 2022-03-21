// built in imports
import { useEffect, useState, useContext } from "react"
import Link from "next/link";
import { useRouter } from "next/router";

// external imports
import { AnimatePresence, motion } from "framer-motion"
import { GrSun, GrEject, GrMoon } from 'react-icons/gr'
import axios from "axios";

// internal imports
import { ADMIN_ACCOUNT, ADMIN_URLS, NAV_METADATA, PUBLIC_URLS } from "../../utils";
import { AUTH_ROUTES } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SecondaryHeading } from "../portfolio/SecondaryHeading";
import { VideoBG } from "./VideoBG";





export const NavBar = ({type='public'}) => {
    const [showMenu, setShowMenu] = useState(false);
    const { isDarkMode } = useContext(ThemeContext)

    
    return (
        <motion.nav className="fixed z-40 flex items-center justify-center top-4 right-2">
            <motion.div 
                onClick={() => setShowMenu(prev => !prev)}
                className="z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group rounded-full h-10 w-10 hover:rounded-full">
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
                    className={`w-6 rounded h-[2px] transition-opacity ${showMenu ? "bg-primary" : (type !== 'admin' ? (isDarkMode ? 'bg-light' : 'bg-dark') : 'bg-dark')} opacity-50 group-hover:opacity-100 group-hover:mr-0 mr-1`}></motion.span>
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
                    className={`w-6 rounded h-[2px] transition-opacity ${showMenu ? "bg-primary" : (type !== 'admin' ? (isDarkMode ? 'bg-light' : 'bg-dark') : 'bg-dark')} opacity-50 group-hover:opacity-100 group-hover:ml-0 ml-1`}></motion.span>
            </motion.div>
        <AnimatePresence>
            <NavMenu showMenu={showMenu} type={type} />
        </AnimatePresence>
        </motion.nav>
  )
}


const NavMenu = ({ showMenu, type='public' }) => {
    const currentPath = useRouter().pathname;
    const { isDarkMode } = useContext(ThemeContext)

    const URLS = type in NAV_METADATA ? NAV_METADATA[type] : NAV_METADATA.public


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
            className={"h-screen overflow-hidden w-full fixed inset-0 z-30 " + (isDarkMode ? 'nav-dark' : 'nav-light')}
            variants={variants.section}
            initial={'hide'}
            animate={showMenu ? 'show' : 'hide'} >
            
            <MenuComponent 
                urls={URLS} 
                currentPath={currentPath} 
                type={type} />
        </motion.section>
        </AnimatePresence>
    )
}





const MenuComponent = ({urls, currentPath, type}) => {
    const isAdmin =  type === 'admin';

    const r = useRouter();

    async function handleLogout() {
        try {
            await axios.get(AUTH_ROUTES.logout);    
            r.push(ADMIN_ACCOUNT)
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="w-full max-w-5xl mx-auto grow h-full px-10 pt-20 pb-20 flex flex-col items-start justify-between sm:grid sm:grid-cols-2 sm:grid-rows-6 sm:pt-28">
            <VideoBG />
     
            <ul className="w-max mx-auto flex flex-col justify-center sm:justify-start sm:mx-0 items-center sm:items-start sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-4 h-fit sm:h-full gap-6 sm:gap-10">
            {Object.entries(urls.links).map(([key, valueObj]) => {
                let isActive;
                
                if ([PUBLIC_URLS.home.url, ADMIN_URLS.dashboard.url].includes(valueObj.url)){
                    if (currentPath === valueObj.url){
                        isActive = true;
                    }
                }
                else {
                    isActive = currentPath.startsWith(valueObj.url)
                }
                if (isActive || type === 'portfolio') {
                    return(
                        <li key={key} className="capitalize w-fit">
                            <Link href={valueObj.url}>
                                <a className={"text-3xl md:text-4xl lg:text-5xl flex items-center justify-center gap-x-2 relative group font-black" }>
                                    <span>
                                        {valueObj.name}
                                    </span>
                                    {type === 'portfolio' && 
                                        <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-secondary group-hover:w-6 origin-right transition-all duration-100"></span>
                                    }
                                </a>
                            </Link>  
                        </li>
                    )
                }
                return(
                    <li key={key} className="capitalize w-fit">
                        <Link href={valueObj.url}>
                            <a className="text-3xl md:text-4xl lg:text-5xl flex items-center justify-center gap-x-2 relative group font-black">
                                <span className="opacity-40 group-hover:scale-x-105 origin-left group-hover:opacity-75 transition-all">
                                    {valueObj.name}
                                </span>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-secondary group-hover:w-6 origin-right transition-all duration-100"></span>
                            </a>
                        </Link>
                    </li>
                )
                })}
            </ul>

            <div className="flex w-max mx-auto flex-col items-start justify-start gap-4 sm:mx-0 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:items-end sm:w-full">
                {urls.other?.heading?.toLowerCase() !== 'logout' ?
                <Link href={urls.other.link}>
                    <a>
                        <SecondaryHeading text={urls.other.heading} navMode={true} />
                    </a>
                </Link>
                :
                <button onClick={handleLogout}>
                    <SecondaryHeading text={urls.other.heading} navMode={true} />
                </button>
                }
                {urls.other.sublinks && 
                    <ul className="hidden sm:flex flex-col items-end">
                        {Object.values(urls.other.sublinks).map(link => (
                            <li key={link.name}>
                                <Link href={link.url}>
                                    <a className="text-xs md:text-sm font-semibold capitalize opacity-50 hover:opacity-100 transition-all text-right">
                                        <small>
                                            {link.name}
                                        </small>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                }
            </div>


            { urls.social && 
            <div className="hidden sm:flex flex-col items-end justify-end gap-4 sm:col-start-2 sm:col-end-3 sm:row-start-4 h-full">
                <SecondaryHeading text="social links" navMode={true} />
                {urls.social && 
                    <ul className="hidden sm:flex flex-col items-end">
                        {Object.entries(urls.social)?.map(([name, url]) => (
                            <li key={name}>
                                <Link href={url}>
                                    <a className="text-xs md:text-sm font-semibold capitalize opacity-50 hover:opacity-100 transition-all">
                                        <small className="text-right">
                                            {name}
                                        </small>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                }
            </div>}


            {urls?.contact && <NavContact cred ={urls.contact}/>}
            
            { isAdmin && 
            <button
                onClick={handleLogout}
                className="flex md:hidden items-center gap-2 text-sm"> 
                <small className="capitalize text-primary font-semibold transition-all hover:underline underline-offset-4">
                    Logout
                </small>
            </button>}

            

        </section>
    )
}


const NavContact = ({cred}) => {
    return (
        <section className="flex flex-col w-max mx-auto items-center sm:mx-0 sm:items-start gap-y-2 sm:col-start-1 sm:col-end-2 sm:justify-end sm:h-full sm:row-start-6 sm:row-end-7">
            <strong className="opacity-50 font-semibold capitalize text-xs">
                {cred?.credential}
            </strong>
            <ul className="flex flex-col items-center sm:items-start">
                <li className="font-semibold lowercase text-xs">
                    {cred?.email}
                </li>
                <li className="font-semibold lowercase text-xs">
                    {cred?.phone}
                </li>
            </ul>
        </section>
    )
}

