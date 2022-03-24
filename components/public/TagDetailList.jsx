import { useEffect, useState, useContext } from "react";

import { IoCloseOutline, IoPricetagOutline } from "react-icons/io5"

import { BlogThumbnail } from "../content/BlogThumbnail"
import { ProjectThumbnail } from "../content/ProjectThumbnail"
import { DesignThumbnail } from "../content/DesignThumbnail"
import { JoinLine } from "./DescHeader";

import { CONTENT_TYPE } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";



export const TagDetailList = props => {
    const {tag, project, blog, design, close} = props;
    const [active, setActive] = useState('');

    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (project.length > 0) {
            setActive(CONTENT_TYPE.project.name)
            return;
        }
        if (blog.length > 0) {
            setActive(CONTENT_TYPE.blog.name)
            return;
        }
        if (design.length > 0) {
            setActive(CONTENT_TYPE.design.name)
            return;
        }
    }, [project.length, blog.length, design.length])


    return (
    <section className='flex flex-col items-start gap-4'>
        <div className={`p-4 rounded-md flex items-center justify-between filter drop-shadow-xl mt-10 max-w-3xl mx-auto w-full ${isDarkMode ? 'nav-light' : 'nav-dark'}`}>
            <p className="font-semibold text-xs">
                Searching for <span className="text-primary capitalize text-sm ml-1">{tag}</span>
            </p>
            <button onClick={close} className="hover:rotate-90 hover:text-primary hover:scale-110 transition-all">
                <IoCloseOutline />
            </button>
        </div>
        <ul className="max-w-3xl mx-auto w-full flex items-center mt-10 justify-center gap-4">
            {blog.length > 0 && 
            <li className={(active === CONTENT_TYPE.blog.name ? "opacity-100 underline underline-offset-4" : "opacity-40")}>
                <button 
                    className="font-semibold text-xs capitalize" 
                    onClick={() => setActive(CONTENT_TYPE.blog.name)}>
                    {CONTENT_TYPE.blog.name}
                </button>
            </li>}
            {project.length > 0 &&
            <li className={(active === CONTENT_TYPE.project.name ? "opacity-100 underline underline-offset-4" : "opacity-40")}>
                <button 
                    className="font-semibold text-xs capitalize" 
                    onClick={() => setActive(CONTENT_TYPE.project.name)}>
                    {CONTENT_TYPE.project.name}
                </button>
            </li>}
            {design.length > 0 && 
            <li className={(active === CONTENT_TYPE.design.name ? "opacity-100 underline underline-offset-4" : "opacity-40")}>
                <button 
                    className="font-semibold text-xs capitalize" 
                    onClick={() => setActive(CONTENT_TYPE.design.name)}>
                    {CONTENT_TYPE.design.name}
                </button>
            </li>}
        </ul>
        {(active === CONTENT_TYPE.project.name) && <GroupList type={CONTENT_TYPE.project.name} list={project} tag={tag} />}
        {(active === CONTENT_TYPE.blog.name) && <GroupList type={CONTENT_TYPE.blog.name} list={blog} tag={tag} />}
        {(active === CONTENT_TYPE.design.name) && <GroupList type={CONTENT_TYPE.design.name} list={design} tag={tag} />}

        {!Boolean(project.length || blog.length || design.length) && (
            <p className="text-center flex items-start justify-center gap-1 w-full my-10">
                <span>
                No content found for 
                </span>
                <strong className="text-primary capitalize underline underline-offset-4 font-semibold text-sm">{tag}</strong>
            </p>
        )}
    </section>
    
  )
}



const GroupList = ({type, list, tag}) => {
    return (
        <section className="my-10 w-full">
            <div className="my-10 flex flex-col items-center justify-center gap-2">
                <p className="flex items-center justify-center gap-1 opacity-50">
                    <IoPricetagOutline />
                    <span className="capitalize font-semibold text-xs">{tag}</span>
                </p>
                <h3 className="capitalize font-black text-center text-3xl md:text-5xl">{type}</h3>
                <p className="text-xs text-primary font-semibold ml-1">
                    <small>
                    Total {type} : {list.length}
                    </small>
                </p> 
                <JoinLine />
            </div>
            {(type === CONTENT_TYPE.project.name) && 
                <div className="flex flex-col items-stretch w-11/12 gap-y-20 max-w-3xl mx-auto">
                {list?.map((project, index) => (
                    <ProjectThumbnail 
                        key={project._id} 
                        data={project} 
                        index={index + 1} />
                ))}
                </div>
            }
            
            {(type === CONTENT_TYPE.blog.name) && 
                <div className="flex flex-col items-stretch w-11/12 gap-y-20 max-w-3xl mx-auto">
                    {list?.map((blog, index) => (
                    <BlogThumbnail 
                        key={blog._id} 
                        data={blog} 
                        index={index + 1} />
                ))}
                </div>
            }

            {(type === CONTENT_TYPE.design.name) && 
                <>
                {list.length < 4 && (
                <div className="grid grid-flow-row grid-cols-1 place-items-center gap-20 p-4 w-full mb-20 max-w-5xl mx-auto">
                  {list.map((design, i) => (
                    <DesignThumbnail
                      key={design._id}
                      data={design}
                      index = {i}
                      center={list.length < 4}
                    />
                  ))}
                </div>
                )}
                {list.length >= 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-9 grid-flow-row gap-20 p-4 w-full mb-20 max-w-5xl mx-auto">
                {list.map((design, i) => (
                    <DesignThumbnail
                    key={design._id}
                    data={design}
                    index = {i}
                    center={list.length >= 4}
                    />
                ))}
                </div>
            )}
                </>
            }

        </section>
    )
}