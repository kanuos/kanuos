// built-in imports
import Link from "next/link";

// external imports
import {IoCalendarOutline, IoPricetagOutline} from 'react-icons/io5'


/**
 * @param name string
 * @param tags array of tags => [{ label : text, link : ''}]
 * @param date date of item created
 * @param back string back to list url
 * @param descType string header type : blogs or projects or designs
 */

export const DescHeader = props => {
    const {name, tags, date, back='/', descType} = props;
    return (
            <header className='flex flex-col items-start justify-start gap-1.5 pt-16 pb-10 w-full max-w-4xl mx-auto'>
                <Link href={back}>
                    <a className='text-xs font-semibold text-dark opacity-50 focus:opacity-100 hover:opacity-100 capitalize'>
                        <small>
                        &lt; back to {descType}
                        </small>
                    </a>
                </Link>
    
                <h1 className="font-special text-4xl md:text-5xl mt-6 text-dark">{name}</h1>

                <JoinLine />

                <ul className="flex flex-col items-start text-xs gap-y-0.5">
                    <li className="inline-flex items-center justify-start gap-x-0.5 text-dark opacity-60">
                        <IoCalendarOutline />
                        <small className="capitalize">
                            Created on
                        </small>
                    </li>
                    <li>
                        <small className="font-semibold capitalize text-dark opacity-70">
                            {new Date(date).toDateString()}
                        </small>
                    </li>
                </ul>

                <JoinLine />

                <ul className="flex flex-col items-start gap-y-0.5">
                    <li className="inline-flex items-center justify-start gap-x-0.5 text-dark opacity-60 text-xs">
                        <IoPricetagOutline />
                        <small className="capitalize">
                            Tags
                        </small>
                    </li>
                    <li className="text-xs sm:text-sm">
                        <ul className="flex flex-wrap gap-x-4 gap-y-1 items-start justify-start">
                            {tags.map(tag => (
                                <li key={tag}>
                                    <small className="font-semibold text-dark opacity-70">
                                        {tag}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>


            </header>
    )
}

const JoinLine = () => (
    <span className="h-8 w-0.5 bg-primary ml-0.5"></span>
)