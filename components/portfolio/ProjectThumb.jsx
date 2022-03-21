import { JoinLine } from "../public/DescHeader";
import { PortfolioLink } from "./PortfolioLink";
import Image from 'next/image';

export const ProjectThumb = ({ project = null, index, total, selectProject }) => {
  if (!project) {
    return <></>;
  }
  const {title, desc} = project;

  const portfolioProject = project.project;
  const portfolioDesign = project.design;

  const tags = [... new Set([...portfolioProject.tags.map(({tag}) => tag), ...portfolioDesign.tags.map(({tag}) => tag)])];
  
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
                <PortfolioLink label='view details' btnMode={true} cb={() => selectProject({_id : project._id})} />
            </div>
        </section>
        <div className="w-full block bg-light filter md:group-even:hover:rotate-3 md:group-odd:hover:-rotate-3 transition-all md:p-3 md:bg-light md:shadow-lg lg:group-even:-rotate-3 lg:group-odd:rotate-3 lg:group-hover:scale-105 group-hover:shadow-2xl max-w-lg h-[75vh] md:h-[50vh]">
            <figure 
                className="h-full w-full object-cover block relative"
            >
                <Image 
                    loader={({src, width}) => `${src}?w=${width}&q=100`}
                    src={portfolioDesign.thumbnail} 
                    layout='fill'
                    objectFit="cover"
                    alt={`Project ${title}'s thumbnail`} />
            </figure>
        </div>
        
        <div className="my-4 w-full grid place-content-center md:hidden">
            <PortfolioLink label='view details' btnMode={true} cb={() => selectProject(project)} />
        </div>
    </article>
  );
};
