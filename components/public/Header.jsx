import { JoinLine } from "./DescHeader";

export const PublicHeader = ({data}) => {
    const {title, desc, count, type} = data;
    return (
    <header className="flex flex-col items-start mb-16 gap-y-2 text-dark">
        <h1 className="font-special font-semibold text-4xl capitalize">
            {title}
        </h1>
        <JoinLine />
        <p className="text-sm whitespace-pre-line break-words opacity-75 max-w-xl">{desc}</p>
        {count > 0 &&
        <strong className="capitalize text-xs font-semibold mt-4">
            total {type} : {count}
        </strong>}
    </header>
)}