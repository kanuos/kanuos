import { JoinLine } from "../public/DescHeader";
import { PortfolioLink } from "./PortfolioLink";

export const ProjectThumb = ({ project = null, index, total }) => {
  if (!project) {
    return <></>;
  }
  const {thumbnail, title, desc, tags} = project;
  
  function selectModal(id) {
    console.log({id})
  }

  return (
    <article className="h-auto w-full flex flex-col justify-center gap-6 p-10 snap-center group even:items-end odd:items-start lg:odd:flex-row lg:even:flex-row-reverse lg:items-end z-10 selection:bg-secondary">
        <section className="flex flex-col justify-start group-even:items-end group-odd:items-start">
            <p className="text-xs w-max mb-2">
                <small className="text-xs opacity-75">Project {index} of {total}</small>
            </p>

            <h3 className="filter drop-shadow-lg text-5xl md:text-7xl capitalize font-black  w-min group-even:text-right group-odd:text-left">
                {title} 
            </h3>
            <JoinLine />
            

            <p className="text-xs capitalize font-semibold italic max-w-sm group-even:text-right group-odd:text-left">{desc}</p>
            
            <ul className="flex flex-col group-even:items-end group-odd:items-start my-6 gap-y-2 max-w-lg">
                <li className="text-xs font-semibold capitalize text-primary">
                    tags
                </li>
                <li>
                    <ul className="flex flex-wrap gap-x-4 gap-y-2">
                        {tags.map((tag, i) => <li key={i} className="text-xs uppercase font-semibold opacity-75"><small>{tag}</small></li>)}
                    </ul>
                </li>
            </ul>
            <div className="my-4 md:block hidden animate-bounce">
                <PortfolioLink label='view details' btnMode={true} cb={() => selectModal(title)} />
            </div>
        </section>
        <img 
            className="h-[50vh] w-full max-w-lg object-cover block filter md:group-even:hover:rotate-3 md:group-odd:hover:-rotate-3 transition-all md:p-3 md:bg-light md:shadow-lg lg:group-even:-rotate-3 lg:group-odd:rotate-3 lg:group-hover:scale-105 group-hover:shadow-2xl"
            src={thumbnail} 
            alt={`Project ${title}'s thumbnail`} />
        
        <div className="my-4 w-full grid place-content-center md:hidden">
            <PortfolioLink label='view details' btnMode={true} cb={() => selectModal(title)} />
        </div>
    </article>
  );
};
