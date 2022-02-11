// import : external
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import useDragScroll from 'use-drag-scroll'

// import : internal
import { JoinLine } from '../public/DescHeader';
import { SocialLinks } from '../public/SocialLinks';
import { useEffect, useState, useRef } from 'react';

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
            <header className="h-screen p-10 pt-20 w-full flex flex-col items-center justify-center max-w-3xl mx-auto">
                <h1 className='flex flex-col gap-y-2 items-stretch w-fit px-4 mr-auto'>
                    <span className='font-special text-2xl opacity-70'>
                        Hello, I am
                    </span>
                    <strong className='font-special ml-10 text-center font-normal text-7xl capitalize'>
                        {portfolio.user.name.split(' ')[0]}
                    </strong>
                    <p className='text-xs text-right opacity-50'>
                    [<strong>ʃəʊ</strong>-ʊ-<em>nɑ</em>ːk]
                    </p>
                </h1>
                <p className='mt-12 mb-24 text-sm leading-relaxed opacity-70'>
                    {portfolio.desc}
                </p>

                <ul className="flex flex-col items-start mr-auto relative gap-y-16 text-xs before:absolute before:h-full before:top-0 before:left-0 before:bg-dark before:w-0.5 before:bg-opacity-10">
                    <li className='pl-4 relative before:h-4 before:w-4 before:rounded-full before:bg-white before:absolute before:-left-2 before:border-4 before:border-primary before:top-1/2 before:-translate-y-1/2 font-semibold capitalize'>
                        work
                    </li>
                    <li className='pl-4 relative before:h-4 before:w-4 before:rounded-full before:bg-white before:absolute before:-left-2 before:border-4 before:border-primary before:top-1/2 before:-translate-y-1/2 font-semibold capitalize'>
                        about me
                    </li>
                    <li className='pl-4 relative before:h-4 before:w-4 before:rounded-full before:bg-white before:absolute before:-left-2 before:border-4 before:border-primary before:top-1/2 before:-translate-y-1/2 font-semibold capitalize'>
                        get in touch
                    </li>
                </ul>

            </header>
            
            <section className='h-auto min-h-screen py-10 mt-20  max-w-3xl mx-auto'>
                <div className="flex flex-col items-start justify-center">
                    <div className="flex flex-col items-start px-8">
                        <h2 className='font-special text-4xl mb-6'>Some of my works</h2>
                    </div>
                    <ul className="my-4 flex px-8 items-end md:items-center justify-center gap-8">
                        {Object.entries(PORTFOLIO_PROJECT_CATEGORIES).map(([k,v]) => (
                            <li key={k} 
                                className={`text-xs capitalize border-b pb-0.5 ${(v === projectType) ? 'opacity-100 font-semibold border-current' : 'opacity-60 border-transparent'}`}
                                onClick={() => setProjectType(v)}>
                                {v}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="px-8 w-full">
                    {projectList.map(el => <PortfolioProjectThumbnail project={el} key={el._id} />)}
                </div>
            </section>

            <section className='h-auto min-h-screen py-10'>
                <div className="flex flex-col items-start px-8  max-w-3xl mx-auto">
                    <h2 className='font-special text-4xl'>A few words about me</h2>
                    <JoinLine />
                </div>
                <p className='text-sm my-4 opacity-70 px-8 whitespace-pre-line  max-w-3xl mx-auto'>   
                    {portfolio.user.bio}
                </p>
                <div ref={scrollRef} className="overflow-x-auto flex h-max items-stretch justify-start lg:justify-between py-6 snap-x snap-proximity scrollbar-none px-8 cursor-grab md:ml-auto lg:w-full lg:mx-auto max-w-6xl">
                    {portfolio.skills.map(({category, list}) => (
                        <div className="flex items-center justify-center group">
                            <article key={category} className="flex flex-col gap-y-4 bg-light flex-grow h-full w-60 my-4 filter drop-shadow-xl rounded">
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
            </section>

            <section className='h-auto flex flex-col min-h-screen p-10  max-w-3xl mx-auto'>
                <div className="flex flex-col items-start">
                    <h2 className='font-special text-4xl'>Let's work together</h2>
                    <JoinLine />
                </div>
                <p className='text-sm my-4 whitespace-pre-line opacity-70'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi dolorum ratione odit, necessitatibus velit tempora alias exercitationem minus? Ducimus magni dicta nam vel deleniti.
                </p>
                <button className='h-32 w-32 my-20 mx-auto block bg-dark text-light uppercase rounded-full p-8 relative before:absolute before:h-full before:w-full before:inset-0 before:bg-dark before:rounded-full before:opacity-0 hover:before:animate-ping hover:before:opacity-50 before:pointer-events-none z-10 before:z-0'>
                    <span className="w-max text-center text-xs tracking-widest">
                        contact me
                    </span>
                </button>
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
        <article className="my-6 flex flex-col gap-y-2 pb-4 border-b even:items-end odd:items-start group">
            <h6 className='font-semibold tracking-tight opacity-70'>{project.name}</h6>
            <JoinLine />
            <img
                className='h-96 w-4/5 object-cover block filter grayscale drop-shadow-lg' 
                src={project.thumbnail} 
                alt={project.name + ' thumbnail'} />
            <div className="filter grayscale">
                <JoinLine />
            </div>
            <p className='text-sm tracking-tight opacity-90 group-even:text-right group-odd:text-left w-5/6 max-w-screen-md'>
                {project.desc}
            </p>
            <p className="text-xs uppercase opacity-60">
                <small>
                    {project.role}
                </small>
            </p>
        </article>
    )
}