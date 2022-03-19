import Link from "next/link"
import { useState, useContext } from "react"
import { PUBLIC_URLS } from "../../utils"
import { JoinLine } from "../public/DescHeader"
import { motion } from "framer-motion"
import { ADMIN_EDIT_URL } from "../../utils/admin"
import { ThemeContext } from "../../contexts/ThemeContext"

export const BlogThumbnail = ({data, index, adminMode=false}) => {
    const [hovered, setHovered] = useState(false)
    const { isDarkMode } = useContext(ThemeContext);

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

    console.log(blogURL)

    return (
        <article 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex flex-col gap-y-2 even:items-end odd:items-start group max-w-lg even:ml-auto odd:mr-auto">
            <p className="text-xs font-semibold transition-all group-hover:text-primary opacity-50 group-hover:opacity-100">
                <small>Blog : #{index}</small>
            </p>
            <h3 className=" font-semibold group-hover:tracking-wide transition-all text-xl md:text-2xl group-odd:text-left group-even:text-right">
                {data.title}
            </h3>
            <div className="filter grayscale group-hover:grayscale-0 transition-all">
                <JoinLine />
            </div>
            <p className="text-sm opacity-70 group-even:text-right group-odd:text-left group-hover:opacity-75 leading-relaxed">
                {data.desc?.slice(0, 250)} <span className="text-primary text-lg font-semibold">.....</span>
            </p>
            <div className="flex group-odd:items-start group-even:items-end flex-col gap-2 justify-start mt-3 w-full">
                <span className="text-xs font-semibold capitalize transition-all group-hover:text-primary">tags</span>
                <ul className="flex flex-wrap pz-2 opacity-50 group-hover:opacity-100 items-start group-odd:justify-start group-even:justify-end flex-grow gap-x-4 gap-y-2 capitalize font-semibold text-xs">
                    {data.tags.map(tag => (
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
                <motion.div 
                    variants={btnVariants}
                    animate={hovered ? 'show' : 'hide'}
                    className="my-6 capitalize text-xs rounded hidden md:flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <Link href={blogURL}>
                        <a className={"py-1.5 px-6 block z-10 peer  transition-all hover:shadow-xl border-2 relative bg-transparent " + (isDarkMode ? "border-secondary hover:text-dark text-secondary font-semibold" : "hover:text-light border-dark")}>
                            {adminMode ? 'Open Blog in Admin Mode' : 'Read blog'}
                        </a>
                    </Link>
                    <span className={"py-1.5 px-6 block  transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300 " + (isDarkMode ? "bg-secondary border-secondary" : "bg-dark border-dark")}></span>
                </motion.div>

                <div
                    className="my-6 capitalize text-xs rounded md:hidden flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <Link href={blogURL}>
                        <a className={"py-1.5 px-6 block z-10 peer  transition-all hover:shadow-xl border-2 relative bg-transparent " + (isDarkMode ? "border-secondary hover:text-dark text-secondary font-semibold" : "hover:text-light border-dark")}>
                            {adminMode ? 'Open Blog in Admin Mode' : 'Read blog'}
                        </a>
                    </Link>
                    <span className={"py-1.5 px-6 block  transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300 " + (isDarkMode ? "bg-secondary border-secondary" : "bg-dark border-dark")}></span>
                </div>
        </article>
    )
}
