
// import : external
import {  IoLinkOutline, IoGitBranchOutline } from 'react-icons/io5';


// import : internal
import { DescHeader, JoinLine } from '../public/DescHeader';
import { Signature } from '../public/Signature';
import { CLIENT_TYPE } from '../../utils';
import { Step } from '../public/PageStepComponent';



export const BlogDetailBody = ({blog, adminMode=false}) => {
    return (
    <main className='px-8 md:px-16 h-auto w-full min-h-screen relative main-light select-text selection:bg-dark selection:text-light pb-20'>
        {/* background image */}
        
        <div className="relative h-full w-full max-w-3xl mx-auto">
            <DescHeader 
                adminMode={adminMode}
                name={blog.title}
                date={blog.date}
                tags = {blog.tags}
                back={CLIENT_TYPE.blog.url}
                descType={CLIENT_TYPE.blog.name} />

                <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-2  text-dark'>
                    <p className='leading-relaxed text-sm first-letter:text-7xl first-letter:float-left first-letter:mr-2 first-letter:font-special'>
                        {blog.desc}
                    </p>
                </section>
        
        
                <section className='w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-6 text-dark mt-16'>
                    <ul className="flex flex-col items-start w-full gap-y-12">
                        {blog.page?.map((segment, i) => (
                        <li key={i} className="flex items-center justify-start gap-x-1 my-6 w-full z-10">
                            <section 
                                className='text-sm  w-full rounded relative pb-6'>
                                <h2 className='text-2xl text-dark capitalize opacity-80 font-special font-semibold'>
                                    {segment?.heading}
                                </h2>
                                <div className="ml-2">
                                    <JoinLine />
                                </div>
                                <div className="flex items-stretch flex-col gap-y-2">
                                    {segment.steps?.map((s, k) => (
                                        <Step step={s} key={k}/>
                                    ))}
                                </div>
                            </section>
                        </li>
                        ))}
                    </ul>
                </section>

                <section className='w-full mx-auto flex flex-col items-start justify-start text-dark'>
                    <h2 className='text-2xl text-dark capitalize opacity-80 font-special font-semibold'>
                        {blog?.outro?.heading}
                    </h2>
                    <div className="ml-1">
                        <JoinLine />
                    </div>
                    <section className='text-sm  w-full break-words'>
                        <p className='leading-relaxed text-sm  '>
                            {blog.outro?.text}
                        </p>
                            <ul className="flex flex-col gap-y-4 my-4">
                             {blog.repo && Object.values(blog.repo).every(Boolean) && 
                                <li className='inline-flex items-start justify-start gap-2 group w-max'>
                                    <IoGitBranchOutline className='text-primary text-xl filter grayscale group-hover:grayscale-0 transition-all' />
                                    <a 
                                        target="_blank"
                                        rel='noopener'
                                        referrerPolicy='no-referrer'
                                        href={blog.repo.href} className="capitalize font-semibold text-sm group-hover:border-current pb-0.5 border-transparent border-b-2 transition-all duration-300">
                                        {blog.repo.label}
                                    </a>
                                </li>
                                }
                             {blog.demo && Object.values(blog.demo).every(Boolean) && 
                                <li className='inline-flex items-start justify-start gap-2 group w-max'>
                                    <IoLinkOutline className='text-primary text-xl filter grayscale group-hover:grayscale-0 transition-all' />
                                    <a 
                                        target="_blank"
                                        rel='noopener'
                                        referrerPolicy='no-referrer'
                                        href={blog.demo.href} className="capitalize font-semibold text-sm group-hover:border-current pb-0.5 border-transparent border-b-2 transition-all duration-300">
                                        {blog.demo.label}
                                    </a>
                                </li>
                                }
                            </ul>
                    </section>
                </section>

                <section className="py-10">
                    <Signature meta={blog.user} />
                </section>

            </div>

    </main>
  )
}
