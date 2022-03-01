// import : external
import { IoCheckmarkCircleOutline, IoGameControllerOutline, IoLinkOutline, IoPricetagOutline, IoGitCommitOutline, IoGitBranchOutline } from 'react-icons/io5';


// import : internal
import { DescHeader, JoinLine } from '../public/DescHeader';
import { Signature } from '../public/Signature';
import { PageSegment } from '../public/PageComponents';
import { CLIENT_TYPE } from '../../utils';
import { Step } from '../public/PageStepComponent';


export const ProjectDetailBody = ({project, adminMode=false}) => {
    console.log(project)
    return (
        <main className='px-8 md:px-16 h-auto w-full min-h-screen relative main-light select-text selection:bg-dark selection:text-light'>
            
            <div className="relative h-full w-full max-w-3xl mx-auto">
                <DescHeader 
                    projectMode={true}
                    name={project.title}
                    date={project.date}
                    tags = {project.tags}
                    back={CLIENT_TYPE.project.url}
                    adminMode={adminMode}
                    descType={CLIENT_TYPE.project.name} />

                    <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-2 text-dark mb-10'>
                        <p className='leading-relaxed text-sm first-letter:text-7xl first-letter:leading-7 first-letter:float-left first-letter:mr-1 first-letter:font-special first-letter:uppercase float-left'>
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
            
                    <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-2 text-dark py-16'>
                        <h2 className='text-2xl inline-flex items-center justify-start'>
                            <span className='capitalize font-special font-semibold'>
                                Project Tech stack used
                            </span>
                        </h2>
                        <JoinLine />
                        <ul className="flex flex-col items-start gap-y-4">
                            {project.techStack.map((t, i) => (
                                <li key={i} className="flex items-start justify-start gap-2">
                                    <IoGitCommitOutline />
                                    <span className='text-xs grow block'>
                                        {t.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-2 text-dark py-16'>
                        <h2 className='text-2xl inline-flex items-center justify-start'>
                            <span className='capitalize font-special font-semibold'>
                                Prerequisites
                            </span>
                        </h2>
                        <JoinLine />
                        <ul className="flex flex-col items-start gap-y-4">
                            {project.prerequisites.map((p, i) => (
                                <li key={i} className="flex items-start justify-start gap-x-2">
                                    <IoCheckmarkCircleOutline className='text-secondary text-lg grow block shrink-0' /> 
                                    <span className=' text-xs grow block'>
                                        {p.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
            
            
                    <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-2 text-dark py-16 mb-10'>
                        <h2 className='inline-flex items-center justify-start gap-x-2'>
                            <span className='text-2xl capitalize font-special font-semibold'>
                                Chapters
                            </span>
                            <small className="text-xs opacity-70">
                                ({project.chapters.length})
                            </small>
                        </h2>
                        <JoinLine />
                        <ul className="flex flex-col items-start w-full gap-y-12 relative after:absolute after:h-full after:top-0 after:-left-4 after:w-0.5 after:bg-dark after:bg-opacity-10 after:z-0">
                            {project.chapters.map((chapter, i) => (
                                <li key={i} className="flex items-center justify-start gap-x-1 w-full z-10">
                                    <PageSegment segment={chapter} index={i+1} />
                                </li>
                            ))}
                        </ul>
                    </section>


                    <section className='w-full mx-auto flex flex-col items-start justify-start text-dark gap-y-1'>
                        <h2 className='text-2xl text-dark capitalize font-special font-semibold'>
                            {project?.outro?.heading}
                        </h2>
                        <JoinLine />
                        <section className='text-sm  w-full break-words'>
                            <p className='leading-relaxed text-sm  '>
                                {project.outro?.text}
                            </p>
                                <ul className="flex flex-col gap-y-4 my-4">
                                {project.repo && Object.values(project.repo).every(Boolean) && 
                                    <li className='inline-flex items-start justify-start gap-2 group w-max'>
                                        <IoGitBranchOutline className='text-primary text-xl filter grayscale group-hover:grayscale-0 transition-all' />
                                        <a 
                                            target="_blank"
                                            rel='noopener'
                                            referrerPolicy='no-referrer'
                                            href={project.repo.href} className="capitalize font-semibold text-sm group-hover:border-current pb-0.5 border-transparent border-b-2 transition-all duration-300">
                                            {project.repo.label}
                                        </a>
                                    </li>
                                    }
                                {project.demo && Object.values(project.demo).every(Boolean) && 
                                    <li className='inline-flex items-start justify-start gap-2 group w-max'>
                                        <IoLinkOutline className='text-primary text-xl filter grayscale group-hover:grayscale-0 transition-all' />
                                        <a 
                                            target="_blank"
                                            rel='noopener'
                                            referrerPolicy='no-referrer'
                                            href={project.demo.href} className="capitalize font-semibold text-sm group-hover:border-current pb-0.5 border-transparent border-b-2 transition-all duration-300">
                                            {project.demo.label}
                                        </a>
                                    </li>
                                    }
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
