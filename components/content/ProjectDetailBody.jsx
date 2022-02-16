// import : external
import { IoCheckmarkCircleOutline, IoGameControllerOutline, IoGlassesOutline, IoLinkOutline, IoPricetagOutline } from 'react-icons/io5';


// import : internal
import { DescHeader, JoinLine } from '../public/DescHeader';
import { Signature } from '../public/Signature';
import { PageSegment } from '../public/PageComponents';
import { CLIENT_TYPE } from '../../utils';



export const ProjectDetailBody = ({project}) => {
  return (
    <main className='px-8 md:px-16 h-auto w-full min-h-screen relative main-light select-text selection:bg-dark selection:text-light'>
        
        <div className="relative h-full w-full max-w-3xl mx-auto">
            <DescHeader 
                projectMode={true}
                name={project.name}
                date={project.date}
                tags = {project.tags}
                back={CLIENT_TYPE.project.url}
                descType={CLIENT_TYPE.project.name} />

                <section className='w-full max-w-3xl -mt-8 mx-auto flex flex-col items-start justify-start gap-y-2 text-dark'>
                    <p className='text-sm mt-2 leading-relaxed'>
                        {project.desc}
                    </p>
                    <ul className="flex flex-col items-start gap-y-0.5 mt-4">
                        <li className="inline-flex items-center justify-start gap-x-2 text-dark text-xs">
                            <IoGameControllerOutline className='text-sm' />
                            <small className="capitalize">
                                Difficulty
                            </small>
                        </li>
                        <li className='text-sm'>
                            <small className="font-semibold capitalize text-primary">
                                {project.difficulty}
                            </small>
                        </li>
                    </ul>
                    <JoinLine />
                    <ul className="flex flex-col items-start gap-y-0.5 mb-4">
                        <li className="inline-flex items-center justify-start gap-x-2 text-dark text-xs">
                            <IoPricetagOutline className='text-sm' />
                            <small className="capitalize">
                                Category
                            </small>
                        </li>
                        <li className='text-sm'>
                            <small className="font-semibold capitalize text-primary">
                                {project.category}
                            </small>
                        </li>
                    </ul>
                </section>
        
                <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-6 text-dark pb-10 pt-4 border-b'>
                    <h2 className='text-2xl capitalize font-special mb-4 font-semibold'>
                        prerequisites
                    </h2>
                    <ul className="flex flex-col items-start gap-y-2">
                        {project.prerequisites.map(p => (
                            <li key={p} className="flex items-start justify-start gap-x-1">
                                <IoCheckmarkCircleOutline className='text-secondary text-lg grow block shrink-0' /> 
                                <span className=' text-sm grow block'>
                                    {p}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
        
        
                <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-6 text-dark py-10 border-b'>
                    <h2 className='text-2xl capitalize font-special mb-4 font-semibold'>
                        chapters
                    </h2>
                    <ul className="flex flex-col items-start w-full gap-y-12 relative after:absolute after:h-full after:top-0 after:-left-4 after:w-0.5 after:bg-dark after:bg-opacity-10 after:z-0">
                        {project.chapters.map((chapter, i) => (
                            <li key={i} className="flex items-center justify-start gap-x-1 w-full z-10">
                                <PageSegment segment={chapter} index={i+1} />
                            </li>
                        ))}
                    </ul>
                </section>

                <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-6 text-dark py-10 border-b'>
                    <h2 className='text-2xl capitalize font-special mb-4 font-semibold'>
                        {project.outro.heading}
                    </h2>
                    <section className='text-sm  w-full break-words'>
                        <p className='leading-relaxed text-sm  '>
                            {project.outro.text}
                        </p>
                        <ul className="flex flex-col gap-y-4 my-4">
                            <li className='inline-flex items-start justify-start gap-2 group'>
                                <IoLinkOutline className='text-primary text-xl filter grayscale group-hover:grayscale-0 transition-all' />
                                <a href={project.outro.repo} className="capitalize font-semibold text-sm group-hover:border-current pb-0.5 border-transparent border-b-2 transition-all duration-300">
                                    Source code
                                </a>
                            </li>
                            <li className='inline-flex items-start justify-start gap-2 group'>
                                <IoLinkOutline className='text-primary text-xl filter grayscale group-hover:grayscale-0 transition-all' />
                                <a href={project.outro.demo} className="capitalize font-semibold text-sm group-hover:border-current pb-0.5 border-transparent border-b-2 transition-all duration-300">
                                    Live demo
                                </a>
                            </li>
                        </ul>
                    </section>
                </section>

                <section className="py-10">
                    <Signature meta={project.user} />
                </section>

            </div>

    </main>
  )
}
