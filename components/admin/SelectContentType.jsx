import { JoinLine } from "../public/DescHeader";
import { CONTENT_TYPE } from "../../utils/admin";

export const SelectContentType = ({ setType, type, next }) => {
  return (
    <div className="section h-full w-full flex items-start justify-center select-none">
      <section className="flex flex-col items-start gap-y-2">
        <h1 className="font-special text-4xl md:text-5xl capitalize mb-10">
          create content
        </h1>
        <section className="flex flex-col items-start justify-start gap-y-1">
          <small className="font-special text-sm font-semibold text-dark">
            Select type
          </small>
        <JoinLine />
          <div className="flex items-center justify-around gap-x-8 mb-10">
            {Object.entries(CONTENT_TYPE).map(([k, { name }]) => (
              <label
                key={k}
                className="inline-flex flex-row-reverse items-center justify-start gap-x-1 opacity-75 hover:opacity-100 cursor-pointer transition-opacity peer-focus:opacity-100"
              >
                <span className="text-sm capitalize font-semibold">{name}</span>
                <input
                  checked={type === name}
                  type="radio"
                  onChange={() => setType(name)}
                  name="type"
                  value={name}
                  className="accent-primary cursor-pointer outline-none focus:outline-none peer"
                />
              </label>
            ))}
          </div>
        </section>
        {Boolean(type) && (
          <button 
            onClick={next}
            className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer group">
            <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
              New {type} &rarr;
            </span>
            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
          </button>
        )}
      </section>
    </div>
  );
};
