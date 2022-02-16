// imports : built-in
import { useState } from 'react';

// import : external
import {  IoDiscOutline, IoChevronForwardCircleOutline, IoChevronBackCircleOutline } from 'react-icons/io5';
import { motion } from 'framer-motion'

// import : internal
import { JoinLine } from '../public/DescHeader';
import { Signature } from '../public/Signature';
import Link from 'next/link';
import { PUBLIC_URLS } from '../../utils';



export const DesignDetailBody = ({design}) => {
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageTransition(pageIndex) {
        setCurrentPage(_ => pageIndex)
    }
    
    return (
    <main className='h-auto w-full min-h-screen main-light text-dark pb-20 select-text selection:bg-dark selection:text-light'>
        <header className='h-auto w-full relative flex flex-col items-start justify-center md:justify-start max-w-4xl mx-auto pt-16 pb-8 px-8 md:px-16'>
            <Link href={PUBLIC_URLS.designs.url}>
            <a className='text-xs font-semibold text-dark opacity-50 focus:opacity-100 hover:opacity-100 capitalize mb-4'>
                <small>
                &lt; back to designs
                </small>
            </a>
            </Link>
            <div className="relative h-fit w-fit flex flex-col items-start justify-center">
                <p className="mb-4 uppercase text-xs font-semibold text-primary">
                    <small>
                        ui/ux design
                    </small>
                </p>
                <h1 className='text-4xl md:text-5xl font-special'>         
                    {design.name}
                </h1>
                <JoinLine />
                <p className="text-sm mt-2 leading-relaxed">{design.desc}</p>
            </div>
        </header>
        <div className="relative h-full w-full px-8 md:px-16 my-16 max-w-4xl mx-auto text-dark">
            
                <ul className="flex flex-col items-start justify-around gap-y-14 h-full relative before:h-full before:absolute before:w-0.5 before:bg-dark before:top-0 before:left-0 before:bg-opacity-10 ">

                    <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            created on
                        </span>
                        <p className='text-xs font-semibold'>
                            {design.date}
                        </p>
                    </li>

                    <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            tags
                        </span>
                        <p className='text-xs font-semibold flex flex-wrap gap-x-4 gap-y-2'>
                            {design.tags.map(tag => <span key={tag}>{tag}</span>)}
                        </p>
                    </li>

                    <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            typography
                        </span>
                        <ul className='text-xs w-full flex flex-col items-start gap-y-8 mt-4'>
                            {design.typography.map(({family, desc}, i) => (
                                <li key={i} className="flex flex-col items-start gap-y-4">
                                    <span className='text-xs font-semibold'>
                                        {family}
                                    </span>
                                    <p className='pl-6 text-sm leading-relaxed opacity-75'>
                                        {desc}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            color palette
                        </span>
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
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            user flow
                        </span>
                        <motion.ul className='text-xs w-full h-auto relative mt-4 overflow-hidden'>
                            {design.userFlowSteps.map(({page, about, title}, i) => (
                                <motion.li 
                                    key={i} 
                                    animate={(currentPage === i) ? 
                                            {
                                                opacity : 1,
                                                scale: 1,
                                                display : 'flex',
                                                transition : {
                                                    type : 'tween',
                                                    stiffness : 400
                                                }
                                            } 
                                            : 
                                            {
                                                scale: 0,
                                                display : 'none',
                                                opacity: 0
                                            }
                                        }
                                    className="flex flex-col items-start flex-grow gap-y-4">
                                    <figure className="h-[50vh] w-11/12 rounded-md shadow-2xl overflow-hidden mb-2 z-10">
                                        <img src={page} alt={title} className="h-full w-full object-cover block" />
                                    </figure>
                                    <ul className="flex justify-between items-center text-primary w-11/12">
                                        <li>
                                        {currentPage > 0 && 
                                        <button 
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className="text-xl">
                                            <IoChevronBackCircleOutline />
                                        </button>}
                                        </li>
                                        <li>
                                        {((currentPage + 1) < design.userFlowSteps.length) && <button 
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="text-xl">
                                            <IoChevronForwardCircleOutline />
                                        </button>}
                                        </li>
                                    </ul>
                                    <span className='z-10 font-special text-xl font-semibold'>
                                        Page {i + 1} : {title}
                                    </span>
                                    <JoinLine />
                                    <p className='w-11/12 z-10 whitespace-pre-line leading-relaxed text-sm'>
                                        {about}
                                    </p>
                                </motion.li>
                            ))}
                        </motion.ul>
                        <motion.ul className="flex items-center justify-center gap-1.5 my-8 w-full">
                            {design.userFlowSteps.map((_, i) => (
                                <motion.li 
                                onClick={() => handlePageTransition(i)}
                                key={i} 
                                className={"w-2.5 h-2.5 rounded-full bg-dark transition-all " + (currentPage === i ? 'opacity-100 scale-105' : 'opacity-40 scale-75 hover:scale-100 cursor-pointer')}></motion.li>
                            ))}
                        </motion.ul>
                    </li>

                    <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            tools used
                        </span>
                        <ul className='text-xs w-full flex flex-col items-start gap-y-3 mt-4 pl-6'>
                            {design.tools.map((tool, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <IoDiscOutline className='text-secondary'/>
                                    <span className='text-xs font-semibold'>
                                        {tool}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className='pl-8 relative before:h-4 before:w-4 before:bg-light before:border-4 before:border-primary before:rounded-full before:absolute before:-left-1.5 before:top-0 flex flex-col items-start gap-2'>
                        <span className='font-semibold text-xs opacity-70 capitalize'>
                            external assets &amp; resources
                        </span>
                        <ul className='text-xs w-full flex flex-col items-start mt-10 gap-y-20'>
                            {design.externalResources.map(({poster, courtesy, photographer}, i) => (
                                <li key={i} className="flex flex-col items-center group">
                                    <span className="text-dark font-special text-3xl">
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
                                            rel="noopener noreferrer nofollow" className='font-semibold hover:underline hover:text-primary font-special text-lg capitalize tracking-wider'>
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
