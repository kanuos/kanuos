import Link from "next/link"
import { useState } from "react"
import { PUBLIC_URLS } from "../../utils"
import { JoinLine } from "../public/DescHeader"
import { motion } from "framer-motion"
import { ADMIN_EDIT_URL } from "../../utils/admin"

export const BlogThumbnail = ({data, index, adminMode=false}) => {
    const [hovered, setHovered] = useState(false)

    const btnVariants = {
        show : {
            y : 0, 
            opacity : 1,
            transition : {
                type : 'spring',
                stiffness : 400
            }
        },
        hide : {
            y : '100%', 
            opacity : 0,
        }
    }

    const blogURL = adminMode ? ADMIN_EDIT_URL("blog", data._id) : (PUBLIC_URLS.blogs.url + '/' + data.slug)

    return (
        <article 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-dark flex flex-col gap-y-2 even:items-end odd:items-start group max-w-lg even:ml-auto odd:mr-auto">
            <p className="text-xs font-semibold transition-all group-hover:text-primary opacity-50">
                <small>Blog : #{index}</small>
            </p>
            <h3 className="font-special font-semibold group-hover:tracking-wide transition-all text-xl md:text-2xl group-odd:text-left group-even:text-right">
                {data.title}
            </h3>
            <div className="filter grayscale group-hover:grayscale-0 transition-all">
                <JoinLine />
            </div>
            <p className="text-sm opacity-70 group-even:text-right group-odd:text-left group-hover:opacity-80 leading-relaxed">
                {data.desc?.slice(0, 250)} <span className="text-primary text-lg font-semibold">.....</span>
            </p>
            <div className="flex group-odd:items-start group-even:items-end flex-col gap-2 justify-start mt-3 w-full">
                <span className="text-xs font-semibold capitalize transition-all group-hover:text-primary">tags</span>
                <ul className="flex flex-wrap pz-2 opacity-50 group-hover:opacity-100 items-start group-odd:justify-start group-even:justify-end flex-grow gap-x-4 gap-y-2 capitalize font-semibold text-xs">
                    {data.tags.map(tag => (
                        // TODO: !adminMode => search blogs by tag name 
                        <li key={tag._id}>
                            {tag.tag}
                        </li>
                    ))}
                </ul>
            </div>
            <ul className="text-sm mt-2 group-even:text-right group-odd:text-left">
                <li>
                    <span className="text-xs font-semibold capitalize transition-all group-hover:text-primary">
                        published on
                    </span>
                </li>
                <li className="text-xs font-semibold opacity-75">
                    <small>
                        {new Date(data.date).toDateString()}
                    </small>
                </li>
            </ul>
            <Link href={blogURL}>
                <motion.a 
                    variants={btnVariants}
                    animate={hovered ? 'show' : 'hide'}
                    className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark">
                        {adminMode ? 'Open Blog in Admin Mode' : 'Read blog'}
                    </span>
                    <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
                </motion.a>
            </Link>
        </article>
    )
}
