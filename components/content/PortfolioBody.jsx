// import : external
import { IoCheckmarkCircleOutline, IoChevronForward } from 'react-icons/io5';
import useDragScroll from 'use-drag-scroll'

// import : internal
import { JoinLine } from '../public/DescHeader';
import { SocialLinks } from '../public/SocialLinks';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { PUBLIC_URLS } from '../../utils';

const PORTFOLIO_PROJECT_CATEGORIES = {
    all : 'all', front : 'front end', full : 'full stack'
}


export const Portfolio = ({portfolio}) => {

    const scrollRef = useRef(null)
    
    const [projectType, setProjectType] = useState(PORTFOLIO_PROJECT_CATEGORIES.all);
    const [projectList, setProjectList] = useState(portfolio.projects)

    useEffect(() => {
        if (projectType === PORTFOLIO_PROJECT_CATEGORIES.all) {
            setProjectList(portfolio.projects)
            return
        }
        if (projectType === PORTFOLIO_PROJECT_CATEGORIES.front) {
            setProjectList(() => portfolio.projects.filter(p => p.category === PORTFOLIO_PROJECT_CATEGORIES.front))
            return
        }
        if (projectType === PORTFOLIO_PROJECT_CATEGORIES.full) {
            setProjectList(() => portfolio.projects.filter(p => p.category === PORTFOLIO_PROJECT_CATEGORIES.full))
            return
        }
    }, [projectType])


    useDragScroll({
        sliderRef : scrollRef,
        reliants : [portfolio.skills],
        momentumVelocity : .8
    })


    return (
    <main className='h-auto w-full min-h-screen relative text-dark main-light'>
        <div className="relative h-full w-full">
            <header className="h-screen px-10 pt-28 pb-4 w-full flex flex-col items-center justify-center max-w-3xl mx-auto">
                <h1 className='flex flex-col gap-y-2 items-stretch w-fit mr-auto'>
                    <span className=' text-2xl text-primary'>
                        Hello, I am
                    </span>
                    <strong className=' text-center font-normal text-7xl md:text-8xl capitalize'>
                        {portfolio.user.name.split(' ')[0]}
                    </strong>
                    <p className='text-xs text-right opacity-50'>
                    [<strong>ʃəʊ</strong>-ʊ-<em>nɑ</em>ːk]
                    </p>
                </h1>
                <p className='my-6 text-sm leading-relaxed opacity-70'>
                    {portfolio.desc}
                </p>
                <div className="w-full max-w-3xl mx-auto">
                    <button className='px-6 py-1.5 border-2 border-current text-xs rounded relative after:absolute after:left-0 after:top-0 h-full'>
                        <span className='text-xs font-semibold capitalize'>
                            my resume
                        </span>
                    </button>
                </div>

                <span className="text-center bloc mt-auto text-xs tracking-widest uppercase font-semibold animate-pulse">
                    scroll
                </span>
                <JoinLine />

            </header>
            
            <section className='h-auto min-h-screen py-10 mt-20  max-w-3xl mx-auto'>
                <div className="flex flex-col items-start justify-center">
                    <div className="flex flex-col items-start px-10">
                        <h2 className=' font-semibold text-4xl lg:text-5xl mb-6'>Some of my works</h2>
                    </div>
                    <ul className="my-4 flex px-10 items-end md:items-center justify-center gap-8">
                        {Object.entries(PORTFOLIO_PROJECT_CATEGORIES).map(([k,v]) => (
                            <li key={k} 
                                className={`text-xs capitalize border-b pb-0.5 ${(v === projectType) ? 'opacity-100 font-semibold border-current' : 'opacity-60 border-transparent'}`}
                                onClick={() => setProjectType(v)}>
                                {v}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="px-10 w-full my-10">
                    {projectList.map(el => <PortfolioProjectThumbnail project={el} key={el._id} />)}
                </div>
                
                <div className="my-10 px-10 w-full max-w-3xl mx-auto flex items-center justify-center">
                    <button className='px-6 py-1.5 border-2 border-current text-xs rounded'>
                        <span className='text-xs font-semibold capitalize'>
                            show more
                        </span>
                    </button>
                </div>

            </section>

            <section className='h-auto min-h-screen py-10'>
                <div className="flex flex-col items-start px-10  max-w-3xl mx-auto">
                    <h2 className=' text-4xl font-semibold lg:text-5xl'>A few words about me</h2>
                    <JoinLine />
                    <p className='text-sm my-4 opacity-70 whitespace-pre-line'>   
                        {portfolio.user.bio}
                    </p>
                    <strong className="mt-6 text-sm font-semibold">
                        My tech stack
                    </strong>
                    <JoinLine />
                </div>

                <div ref={scrollRef} className="overflow-x-auto flex h-max items-stretch justify-start lg:justify-between py-6 snap-x snap-proximity scrollbar-none px-8 cursor-grab md:ml-auto lg:w-full lg:mx-auto max-w-6xl">
                    {portfolio.skills.map(({category, list}) => (
                        <div key={category} className="flex items-center justify-center group">
                            <article className="flex flex-col gap-y-4 bg-light flex-grow h-full w-60 my-4 filter drop-shadow-xl rounded">
                                <strong className="relative font-semibold px-4 pt-4 capitalize text-sm">
                                    {category}
                                </strong>
                                <ul className="relative flex flex-col items-start p-4 gap-6">
                                    {list.map((item, i) => (
                                        <li key={i} className="text-xs flex items-center gap-x-2">
                                            <IoCheckmarkCircleOutline className='text-xl text-secondary'/>
                                            <span>
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                            <span className="h-0.5 w-12 bg-primary group-last:hidden"></span>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs capitalize  max-w-3xl mx-auto">
                    <small className='opacity-50 tracking-wider'>
                    drag to scroll
                    </small>
                </p>
                <p className='text-sm my-4 opacity-70 px-10 whitespace-pre-line  max-w-3xl mx-auto'>   
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum animi pariatur sequi voluptas repellendus explicabo architecto est distinctio quibusdam consequuntur!
                </p>
            </section>

            <section className='h-auto flex flex-col min-h-screen p-10  max-w-3xl mx-auto'>
                <div className="flex flex-col items-start">
                    <h2 className=' text-4xl font-semibold lg:text-5xl'>Let's work together</h2>
                    <JoinLine />
                </div>
                <p className='text-sm my-4 whitespace-pre-line opacity-70'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi dolorum ratione odit, necessitatibus velit tempora alias exercitationem minus? Ducimus magni dicta nam vel deleniti.
                </p>
                <Link href={PUBLIC_URLS.contact.url}>
                    <a className='h-32 w-32 my-20 mx-auto block text-center bg-dark text-light uppercase rounded-full p-8 relative before:absolute before:h-full before:w-full before:inset-0 before:bg-dark before:rounded-full before:opacity-0 hover:before:animate-ping hover:before:opacity-50 before:pointer-events-none z-10 before:z-0'>
                        <span className="w-max text-center text-xs tracking-widest">
                            contact me
                        </span>
                    </a>
                </Link>
                <div className="mt-auto">
                    <SocialLinks />
                </div>
            </section>

        </div>

    </main>
  )
}




const PortfolioProjectThumbnail = ({project}) => {
    return (
        <article className="my-6 h-screen flex flex-col gap-y-2 py-4 border-b even:items-end odd:items-start group">
            <p className="text-xs capitalize font-semibold"><small>project</small></p>
            <h6 className='tracking-tight  text-4xl text-primary'>{project.name}</h6>
            <div className="flex items-center justify-between gap-x-4 w-full group-even:flex-row-reverse">
                <img
                    className='h-96 w-3/4 md:w-5/6 my-4 object-cover block filter rounded grayscale drop-shadow-lg group-hover:grayscale-0 transition-all' 
                    src={project.thumbnail} 
                    alt={project.name + ' thumbnail'} />
                <Link href={'/'}>
                    <a className='group-even:rotate-180 hover:scale-125 hover:grayscale-0 grayscale filter transition-all relative after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:w-0 after:h-1 after:delay-200 after:transition-all hover:after:w-10 after:bg-primary' title="Open Project">
                        <IoChevronForward className='text-4xl text-primary' />
                    </a>
                </Link>
            </div>
            <JoinLine />
            <div className="flex flex-col group-even:items-end group-odd:items-start gap-y-4">
                <p className="text-xs capitalize font-semibold"><small>About project</small></p>
                <p className='text-sm tracking-tight opacity-90 group-even:text-right group-odd:text-left w-5/6 max-w-screen-md'>
                    {project.desc}
                </p>
            </div>
            <p className="text-xs uppercase opacity-60">
                <small>
                    {project.role}
                </small>
            </p>
        </article>
    )
}