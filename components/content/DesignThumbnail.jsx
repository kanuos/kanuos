import Link from "next/link"
import { useState } from "react"
import { PUBLIC_URLS } from "../../utils"
import { JoinLine } from "../public/DescHeader"
import { motion } from "framer-motion"

export const DesignThumbnail = ({data}) => {
    const [hovered, setHovered] = useState(false)
    
    return (
        <article 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-dark md:col-span-4 lg:odd:col-span-3 lg:even:col-span-3 lg:odd:row-span-4 lg:even:row-span-5 flex flex-col gap-y-2 relative h-[50vh] min-h-[15rem] md:h-full w-full flex-grow group overflow-hidden rounded-md hover:shadow-2xl max-w-lg">
            <img 
                src={data.thumbnail} 
                alt={data.title + "'s thumbnail"} 
                className="h-full w-full object-cover filter group-hover:blur group-hover:scale-110 transition-all" />
            
            <section className="inset-0 absolute z-10 bg-light -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all transform-gpu duration-300 delay-200">
                <img 
                    src={data.thumbnail} 
                    alt={data.title + "'s thumbnail"} 
                    className="h-1/2 w-full object-cover" />
                <section className="w-full h-1/2 p-10">
                    <h3 className="font-special text-xl">
                        {data.title}
                    </h3>
                    <JoinLine />
                    <Link href={PUBLIC_URLS.designs.url + '/' + data._id}>
                        <motion.a 
                            className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer w-max">
                            <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark peer">
                                go to design
                            </span>
                            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
                        </motion.a>
                    </Link>
                </section>

            </section>
        </article>
    )
}
