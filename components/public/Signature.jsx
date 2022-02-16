import { JoinLine } from "./DescHeader"

export const Signature = ({meta}) => {
    return (
        <div className="flex flex-col items-center justify-center text-dark gap-4 md:gap-2 p-4">
            <figure className="col-start-1 grid place-items-center">
                <img src="/sounak.jpg" className="h-24 w-24 rounded-full md:h-16 md:w-16 object-cover p-0.5 bg-white filter drop-shadow-lg mb-2" />
            </figure>

            <div className="flex flex-col items-center gap-y-1 col-start-2 col-end-7">
                <span className="text-sm capitalize font-semibold">
                    {meta.name}
                </span>
                <a href={meta.link.url} className="text-xs lowercase opacity-50">
                    {meta.link.text}
                </a>
            </div>
            <JoinLine />
            <p className="col-start-2 col-end-7 mt-2 text-sm w-full max-w-sm italic text-center">
                {meta.about}
            </p>
        </div>
    )
}