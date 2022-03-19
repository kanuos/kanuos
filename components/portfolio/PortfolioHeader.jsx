import { JoinLine } from "../public/DescHeader"
import { ScrollIcon } from "./ScrollIcon"

export const PortfolioHeader = ({name='sounak', miniBio}) => {
  return (
    <header className="h-screen  max-w-5xl mx-auto px-16 flex items-center justify-center relative">
      <section className="w-full mx-auto max-w-3xl">
        <h1 className="md:-mt-20 flex flex-col items-start">
          <small className="text-xs">
            Hi, I am
          </small>
          <span className="text-7xl md:text-8xl lg:text-9xl capitalize font-thin tracking-tighter -ml-2 md:-ml-4">
            {name}
          </span>
        </h1>    
        <JoinLine />
        <p className="font-semibold text-sm lg:text-base">
          {miniBio}
        </p>
      </section>

        <ScrollIcon />
    </header>
  )
}
