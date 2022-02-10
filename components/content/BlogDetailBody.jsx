// import : built in
import Image from 'next/image';


// import : external
import { IoCheckmarkCircleOutline, IoGlassesOutline, IoLinkOutline } from 'react-icons/io5';


// import : internal
import { DescHeader, JoinLine } from '../public/DescHeader';
import { Signature } from '../public/Signature';
import { PageSegment } from '../public/PageComponents';
import { CLIENT_TYPE } from '../../utils';
import { Step } from '../public/PageStepComponent';



export const BlogDetailBody = ({blog}) => {
  return (
    <main className='px-8 md:px-16 h-auto w-full min-h-screen relative'>
        {/* background image */}
        <Image layout='fill' src="/hero.jpg" className='fixed left-0 top-0 h-screen w-screen object-cover pointer-events-none opacity-30' />
        
        <div className="relative h-full w-full max-w-4xl mx-auto">
            <DescHeader 
                projectMode={false}
                name={blog.name}
                date={blog.date}
                tags = {blog.tags}
                back={CLIENT_TYPE.blog.url}
                descType={CLIENT_TYPE.blog.name} />

                <section className='w-full max-w-2xl mr-auto flex flex-col items-start justify-start gap-y-2 opacity-70 text-dark'>
                    <p className='leading-relaxed text-sm md:text-base'>
                        {blog.desc}
                    </p>
                </section>
        
        
                <section className='w-full max-w-3xl mr-auto flex flex-col items-start justify-start gap-y-6 text-dark py-10 border-b'>
                    <ul className="flex flex-col items-start w-full gap-y-12">
                        {blog.page.map((segment, i) => (
                        <li key={i} className="flex items-center justify-start gap-x-1 w-full z-10">
                            <section 
                                className='text-sm md:text-base w-full text-dark rounded relative pb-6 border-b'>
                                <h2 className='text-2xl font-semibold capitalize font-special mb-4'>
                                    {segment.segmentHeading}
                                </h2>
                                <div className="opacity-70">
                                    {segment.content.map((s, k) => (
                                        <Step step={s} key={k}/>
                                    ))}
                                </div>
                            </section>
                        </li>
                        ))}
                    </ul>
                </section>

                <section className='w-full max-w-2xl mr-auto flex flex-col items-start justify-start gap-y-6 text-dark py-10 border-b'>
                    <h2 className='text-2xl font-semibold capitalize font-special'>
                        {blog.outro.heading}
                    </h2>
                    <JoinLine />
                    <section className='text-sm md:text-base w-full break-words'>
                        <p className='leading-relaxed text-sm md:text-base opacity-70'>
                            {blog.outro.text}
                        </p>
                        <ul className="flex flex-col gap-y-4 my-4">
                            <li className='inline-flex items-start justify-start gap-2 group'>
                                <IoLinkOutline className='text-primary text-xl filter grayscale group-hover:grayscale-0 transition-all' />
                                <a href={blog.outro.demo} className="capitalize font-semibold text-sm group-hover:border-current pb-0.5 border-transparent border-b-2 transition-all duration-300">
                                    Live demo / Code Repo
                                </a>
                            </li>
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
