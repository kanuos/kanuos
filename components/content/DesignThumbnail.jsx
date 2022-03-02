import Link from "next/link"

import { PUBLIC_URLS } from "../../utils"
import { JoinLine } from "../public/DescHeader"
import { motion } from "framer-motion"
import { ADMIN_EDIT_URL } from "../../utils/admin"


export const DesignThumbnail = ({data, adminMode}) => {
    const designURL = adminMode ? ADMIN_EDIT_URL("design", data._id) : (PUBLIC_URLS.designs.url + '/' + data.title)

    return (
        <article 
            className="text-dark bg-light md:col-span-4 lg:odd:col-span-3 lg:even:col-span-3 lg:odd:row-span-4 lg:even:row-span-5 flex flex-col gap-y-2 relative h-full min-h-[28rem] lg:h-full flex-grow group overflow-hidden rounded-md drop-shadow-lg filter hover:drop-shadow-2xl w-full">
            <img 
                src={data.thumbnail} 
                alt={data.title + "'s thumbnail"} 
                className="h-full w-full object-cover filter group-hover:grayscale transition-all group-hover:h-3/5"/>
            
            <section className="bottom-0 left-0 w-full h-1/2 absolute z-10 bg-light translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all transform-gpu duration-300 delay-200">
                <section className="w-full h-1/2 p-10">
                    <h3 className="font-special text-xl">
                        {data.title}
                    </h3>
                    <JoinLine />
                    <Link href={designURL}>
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
