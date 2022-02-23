import { JoinLine } from "../public/DescHeader";

export const TagSelector = ({ handleTag, tag, next, allTags, prev }) => {
  return (
    <div className="section h-full w-full flex items-start justify-center">
      <section className="flex flex-col items-start gap-y-2  w-full max-w-2xl">
        <h1 className="font-special text-4xl md:text-5xl capitalize">
          Select Tags
        </h1>
        <JoinLine />
        <ul className="flex flex-wrap gap-4 items-center justify-start">
          {allTags.map(t => {
            let isPresent = tag.find(existingTag => existingTag._id === t._id && existingTag.tag === t.tag)
            return (
            <li key={t._id}
              onClick={() => handleTag(t)} 
              className={(isPresent ? 'bg-dark text-light' : 'text-dark opacity-75 hover:text-primary') + " text-xs py-1 px-4 border-2 border-current font-semibold rounded-md uppercase cursor-pointer transition-all"}>
                <small>
                  {t.tag}
                </small>
            </li>
          )})}
        </ul>

        <ul className="mt-20 flex items-center justify-start gap-x-8">
          <li>
          {prev && (
            <button 
              onClick={prev}
              className="capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer group">
              <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                &larr; Prev 
              </span>
              <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
            </button>
          )}
          </li>
          <li>
          {tag.length > 0 && (
            <button 
              onClick={next}
              className="capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer group">
              <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                Next &rarr;
              </span>
              <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
            </button>
          )}
          </li>
        </ul>

        
      </section>
    </div>
  );
};


