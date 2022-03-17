
import { useContext } from 'react';
// import : external
import {  IoDiscSharp, IoCalendarOutline, IoPricetagOutline, IoLeafOutline, IoColorFillOutline, IoRocketOutline, IoMapSharp, IoCameraOutline } from 'react-icons/io5';
import { motion } from 'framer-motion'

// import : internal
import { JoinLine } from '../public/DescHeader';
import { Signature } from '../public/Signature';
import Link from 'next/link';
import { PUBLIC_URLS } from '../../utils';
import { ThemeContext } from '../../contexts/ThemeContext'


export const DesignDetailBody = ({design, adminMode=false}) => {
    const { isDarkMode } = useContext(ThemeContext)
    return (
    <main className={'h-auto w-full min-h-screen pb-20 select-text selection:bg-dark selection:text-light ' + (isDarkMode ? 'main-dark' : 'main-light')}>
        <header className='h-auto w-full relative flex flex-col items-start justify-center md:justify-start max-w-4xl mx-auto py-8 px-8 md:px-16'>
            {!adminMode && 
            <Link href={PUBLIC_URLS.designs.url}>
            <a className='text-xs font-semibold opacity-50 focus:opacity-100 hover:opacity-100 capitalize mb-4'>
                <small>
                &lt; back to designs
                </small>
            </a>
            </Link>}
            <div className={"relative h-fit w-fit flex flex-col items-start justify-center " + (adminMode ? '' : 'mt-10')}>
                <p className="mb-4 uppercase text-xs font-semibold text-primary">
                    <small>
                        ui/ux design
                    </small>
                </p>
                <h1 className='text-4xl md:text-6xl font-black capitalize'>         
                    {design.title}
                </h1>
                <JoinLine />
                <p className="text-sm mt-2 leading-relaxed opacity-75">{design.desc}</p>
            </div>
        </header>
        <div className="relative h-full w-full px-8 md:px-16 my-16 max-w-4xl mx-auto">
            
            <ul className={"flex flex-col items-start justify-around gap-y-14 h-full relative before:h-full before:absolute before:w-0.5 before:top-0 before:left-0 " + (isDarkMode ? "before:bg-light before:bg-opacity-20" : "before:bg-dark before:bg-opacity-10")}>

                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                    <p className="flex items-center justify-start gap-x-1">
                        <IoCalendarOutline className='text-xs'/>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            created on
                        </span>
                    </p>
                    <span className='text-xs font-semibold'>
                        {new Date(design.date || Date.now()).toDateString()}
                    </span>
                </li>

                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                    <p className="flex items-center justify-start gap-x-1">
                        <IoPricetagOutline className='text-xs'/>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            tags
                        </span>
                    </p>
                    <p className='text-xs font-semibold flex flex-wrap gap-x-4 gap-y-2'>
                        {design.tags.map(tag => <small key={tag._id} className="uppercase">{tag.tag}</small>)}
                    </p>
                </li>

                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                    <p className="flex items-center justify-start gap-x-1">
                        <IoLeafOutline className='text-sm'/>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            typography
                        </span>
                    </p>
                    <ul className='text-xs w-full flex flex-col items-start gap-y-8 mt-4'>
                        {design.typography.map(({family, desc}, i) => (
                            <li key={i} className="flex flex-col items-start gap-y-4">
                                <span className='text-xs font-semibold capitalize'>
                                    {family}
                                </span>
                                <p className='pl-6 text-sm leading-relaxed opacity-75'>
                                    <small>
                                        {desc}
                                    </small>
                                </p>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                    <p className="flex items-center justify-start gap-x-1">
                        <IoColorFillOutline className='text-sm'/>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            color palette
                        </span>
                    </p>
                    <ul className='text-xs w-full flex flex-col items-start gap-y-8 mt-4 pl-6'>
                        {design.colorPalette.map(({name, hex}, i) => (
                            <li key={i} className="flex items-center gap-4">
                                <span className="w-4 h-4 rounded-full filter drop-shadow-lg" style={{backgroundColor : hex}}></span>
                                <span className='text-xs font-semibold'>
                                    {name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </li>

                
                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2 w-full'>
                    <p className="flex items-center justify-start gap-x-1">
                        <IoMapSharp className='text-sm'/>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            user flow
                        </span>
                    </p>
                    <motion.ul className='text-xs w-full flex flex-col odd:items-start even:items-end h-auto gap-y-20 relative mt-4 overflow-hidden'>
                        {design.userFlowSteps.map(({page, about, title}, i) => (
                            <motion.li 
                                key={i} 
                                className="flex flex-col items-start flex-grow gap-y-4">
                                <figure className="h-auto w-11/12 rounded-md shadow-2xl overflow-hidden mb-2 z-10">
                                    <img src={page} alt={title} className="h-full w-full object-cover block" />
                                </figure>
                                <span className='z-10  text-xl font-semibold capitalize'>
                                    Page {i + 1} : {title}
                                </span>
                                <JoinLine />
                                <p className='w-11/12 z-10 whitespace-pre-line leading-relaxed text-sm'>
                                    {about}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </li>

                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                    <p className="flex items-center justify-start gap-x-1">
                        <IoRocketOutline className='text-sm'/>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            tools used
                        </span>
                    </p>
                    <ul className='text-xs w-full flex flex-col items-start gap-y-3 mt-4 pl-6'>
                        {design.tools.map((tool, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <IoDiscSharp className='text-secondary'/>
                                <span className='text-xs font-semibold capitalize'>
                                    {tool}
                                </span>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                    <p className="flex items-center justify-start gap-x-1">
                        <IoCameraOutline className='text-sm'/>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            external assets &amp; resources
                        </span>
                    </p>
                    <ul className='text-xs w-full flex flex-col items-start mt-10 gap-y-20'>
                        {design.externalResources.map(({poster, courtesy, photographer}, i) => (
                            <li key={i} className="flex flex-col items-center group">
                                <span className=" text-3xl">
                                    #{(i + 1).toString().padStart(2, '0')}
                                </span>
                                <JoinLine />
                                <img src={poster} className="h-auto w-3/4 my-2 object-cover group-even:rotate-6 group-odd:-rotate-6 filter drop-shadow-2xl p-3 bg-light" />
                                <div className="ml-4 flex flex-col w-full items-center gap-y-1">
                                    <JoinLine />
                                    <p className="text-center font-semibold text-xs capitalize opacity-50">
                                        <small>
                                            asset courtesy
                                        </small>
                                    </p>
                                    <a 
                                        title={`Check out ${photographer}'s profile`}
                                        href={courtesy} 
                                        referrerPolicy="no-referrer" 
                                        target="_blank" 
                                        rel="noopener noreferrer nofollow" className='font-semibold hover:underline hover:text-primary  text-lg capitalize tracking-wider'>
                                        {photographer}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'></li>
            </ul>
        
        </div>
        <div className="mt-40 mx-auto w-full max-w-4xl">
            <Signature meta={design.user} />
        </div>

    </main>
  )
}
