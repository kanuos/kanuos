import Image from 'next/image'

import { JoinLine } from '../public/DescHeader'

// TODO: generate dynamic data

const PortfolioProjectDetail = ({isDarkMode=false, isOpen, project, close, prev, next, selectProject}) => {

  return (
    <article className={`z-50 w-full h-screen fixed overflow-y-auto overflow-x-hidden top-0 left-0 scrollbar-none ${isDarkMode ? 'main-dark' : 'main-light'}`}>
        <button
            onClick={close}
            className="fixed inline-block top-2 right-4 z-50 text-5xl hover:rotate-90 hover:text-primary transition-all origin-center"
            >
            &times;
        </button>

        {/* content */}
        <div className="w-full min-h-screen h-auto max-w-5xl mx-auto">
            <header className='gap-y-2 p-12 pt-28 grid grid-cols-1 md:grid-cols-6 gap-x-4'>
                <h2 className={`font-black z-10 text-5xl md:text-6xl lg:text-7xl w-min max-w-sm md:col-start-1 md:col-end-3 md:row-start-2 md:mt-16 break-words md:pr-2 filter drop-shadow-xl h-auto text-transparent bg-clip-text bg-gradient-to-r to-primary ${isDarkMode ? 'from-light via-light' : 'from-dark via-dark'}`}>
                    {project.title}
                </h2>
                <div className="md:row-start-3 h-full">
                    <JoinLine />
                </div>
                <p className="text-sm italic opacity-75 md:row-start-4 md:col-span-full md:max-w-lg h-full">{project.desc}</p>
                <figure className='relative h-72 w-full hidden md:block md:col-start-3 md:col-end-7 md:row-start-1 md:row-end-3 md:rounded-md md:shadow-xl md:overflow-hidden filter brightness-75'>
                    <Image 
                        loader={({src, width}) => `${src}?w=${width}&q=100`}
                        src={project.thumbnail} 
                        priority
                        objectFit='cover'
                        layout='fill' />
                </figure>
            </header>
            
            <figure className='relative h-[45vh] w-full block md:hidden'>
                <Image 
                    loader={({src, width}) => `${src}?w=${width}&q=100`}
                    src={project.thumbnail} 
                    priority
                    objectFit='cover'
                    layout='fill' />
            </figure>

            <section className='flex flex-col w-full items-start gap-y-20 p-12 md:grid'>
                {/* tags */}
                <div className="flex flex-col gap-y-6 w-11/12 mr-auto">
                    <PortfolioProjectSubHeading text='tech stack' />
                    <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {Array.isArray(project.tags) && [...new Set(project.tags)].map(tag => (
                        <li key={tag} className='text-xs md:text-sm uppercase'>
                            <small className="font-semibold opacity-75">
                                {tag}
                            </small>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* project category */}
                <div className="flex flex-col gap-y-6 w-11/12 mr-auto">
                    <PortfolioProjectSubHeading text='category' />
                    <p className="text-xs md:text-sm font-semibold opacity-75">
                        Full stack web app
                    </p>
                </div>

                {/* my role */}
                <div className="flex flex-col gap-y-6 w-11/12 mr-auto">
                    <PortfolioProjectSubHeading text='my role' />
                    <p className="text-xs md:text-sm font-semibold opacity-75 md:max-w-lg">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                    </p>
                </div>

                {/* typography */}
                <div className="flex flex-col gap-y-6 w-11/12 ml-auto">
                    <PortfolioProjectSubHeading text='typography' />
                    <ul className="flex flex-col items-start gap-y-4">
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                montserrat
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                raleway
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                    </ul>
                </div>

                {/* colors */}
                <div className="flex flex-col gap-y-6 w-11/12 ml-auto">
                    <PortfolioProjectSubHeading text='colors' />
                    <ul className="flex flex-col justify-start items-start gap-4">
                        {['#FF6600', '#45cae9', '#3f8ac3', '#178d6a'].map(color => (
                            <li key={color} className='flex items-center justify-start gap-4 group'>
                                <span className='w-8 h-8 inline-block rounded-md shadow-xl group-hover:group-even:rotate-12 group-hover:group-odd:-rotate-12 transition-all' style={{backgroundColor : color}}></span>
                                <small className='text-xs md:text-sm uppercase font-semibold opacity-75 group-hover:opacity-90'>{color}</small>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* uiux */}
                <div className="flex flex-col gap-y-6 w-11/12 ml-auto">
                    <PortfolioProjectSubHeading text='UI-UX' />
                    <ul className="flex flex-col items-start gap-y-4">
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                react
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                tailwind css
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                server side rendering
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                    </ul>
                </div>
                
                {/* dev */}
                <div className="flex flex-col gap-y-6 w-11/12 ml-auto">
                    <PortfolioProjectSubHeading text='development' />
                    <ul className="flex flex-col items-start gap-y-4">
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                server
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                database
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                auth
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quisquam eius vitae!
                            </p>
                        </li>
                    </ul>
                </div>

                
                {/* dev */}
                <div className="flex flex-col gap-y-6 w-11/12 mr-auto">
                    <PortfolioProjectSubHeading text='links' />
                    <ul className="flex flex-col items-start gap-y-4">
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                live demo
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50">
                                Lorem ipsum 
                            </p>
                        </li>
                        <li className='flex flex-col gap-y-1 items-start'>
                            <strong className='capitalize font-semibold text-sm md:text-base opacity-90'>
                                code repository
                            </strong>
                            <p className="text-xs md:text-sm font-semibold opacity-50">
                                Lorem ipsum 
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="my-16 w-11/12 mx-auto flex flex-col gap-y-10">
                    {prev && 
                        <PageNavigator title={prev.title} next={false} selectProject={selectProject}
                        _id={prev._id} />}

                    {next && 
                        <PageNavigator title={next.title} next={true} selectProject={selectProject}
                        _id={next._id} />}
                </div>

            </section>


        </div>


    </article>
  )
}

export default PortfolioProjectDetail



const PortfolioProjectSubHeading = ({text}) => {
    return (
        <strong className='font-black capitalize block text-primary'>
            {text}
        </strong>
    )
}


const PageNavigator = ({title, _id, next=true, selectProject}) => {
    return (
        <div className={`relative group flex flex-col ${next ? 'items-end ml-auto' : 'items-start mr-auto'} w-max`}>
            <p className='text-xs md:text-sm text-primary font-semibold opacity-50 group-hover:opacity-100 transition-all'>
                
                {next && <small>
                    Next &rarr;
                </small>}

                {!next && <small>
                    &larr; Previous
                </small>}
            </p>
            <button onClick={() => selectProject({_id})} className={"font-black text-4xl w-min opacity-50 hover:opacity-100 scale-y-90 origin-top hover:scale-y-100 break-words max-w-sm transition-all " + (next ? 'text-right' : 'text-left')}>
                {title}
            </button>
        </div>
    )
}