import { JoinLine } from './DescHeader';
import { staticMetadata } from '../../utils/portfolio_static'

export const LandingHeader = () => {
  return (
    <header className='h-[50vh] flex items-center justify-center mb-20'>
        <section className="flex flex-col items-start w-full max-w-3xl mx-auto gap-y-2">
            <div className="flex flex-col items-start gap-1 max-w-md">
              <h1 className=' text-5xl md:text-6xl leading-tight tracking-tight font-black'>
                  Hi,
              </h1>
              <p className="font-semibold text-sm">
                Welcome to <span className="text-secondary">{staticMetadata.name}&apos;s</span> website
              </p>
            </div>
            <JoinLine />
            <p className="text-sm md:text-base">
                I write technical blogs, coding solutions, analyze data structures and algorithms, create web/console/mobile etc based projects, UI/UX designs and much more!
            </p>
        </section>
    </header>
  )
}
