export const PublicHeader = ({data}) => {
    const {title, desc, count, type} = data;
    return (
    <header className="flex flex-col items-start mb-16 text-dark">
        <h1 className="font-special font-semibold text-4xl mb-6 capitalize">
            {title}
        </h1>
        <p className="text-sm whitespace-pre-line break-words opacity-75 max-w-xl">{desc}</p>
        <strong className="capitalize text-xs font-semibold mt-4">
            total {type} : {count}
        </strong>
    </header>
)}