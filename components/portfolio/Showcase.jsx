import { PUBLIC_URLS } from "../../utils"
import { PortfolioLink } from "./PortfolioLink"
import { ProjectThumb } from "./ProjectThumb"

export const Showcase = ({portfolio}) => {


  return (
    <section onScroll={e => e.preventDefault()} className='h-auto w-full max-w-5xl mx-auto'>
        <h2 className='text-6xl font-thin sm:text-8xl lg:text-9xl capitalize w-min px-16 mb-10'>
            selected works
        </h2>
        <div className="flex flex-col p-4 items-center justify-start gap-20 lg:gap-y-40 h-auto overflow-y-auto scrollbar-none scrollbar-none snap-y snap-mandatory">
        {portfolio.map((p, i) => (
            <ProjectThumb key={p._id} project={p} index={i + 1} total={portfolio.length} />
        ))}    
        </div>
        <div className="grid place-items-center mt-20">
            <PortfolioLink label="more work →" href={PUBLIC_URLS.home.url}/>
        </div>
    </section>
  )
}
