import { useEffect, useState, useContext } from "react";
import dynamic from "next/dynamic";

import { BsXLg, BsSearch } from "react-icons/bs";

const BlogThumbnail = dynamic(() =>
  import("../content/BlogThumbnail").then((m) => m.BlogThumbnail)
);
const ProjectThumbnail = dynamic(() =>
  import("../content/ProjectThumbnail").then((m) => m.ProjectThumbnail)
);
const DesignThumbnail = dynamic(() =>
  import("../content/DesignThumbnail").then((m) => m.DesignThumbnail)
);

import { CONTENT_TYPE } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";

export const TagDetailList = (props) => {
  const { tag, project, blog, design, close } = props;
  const [active, setActive] = useState("");

  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (project.length > 0) {
      setActive(CONTENT_TYPE.project.name);
      return;
    }
    if (blog.length > 0) {
      setActive(CONTENT_TYPE.blog.name);
      return;
    }
    if (design.length > 0) {
      setActive(CONTENT_TYPE.design.name);
      return;
    }
  }, [project.length, blog.length, design.length]);

  return (
    <section className="flex flex-col items-start gap-4 pb-20">
      <div
        className={`p-4 rounded-md flex items-center gap-4 justify-between filter drop-shadow-xl mt-10 max-w-3xl mx-auto w-full ${
          !isDarkMode ? "nav-light" : "nav-dark"
        }`}
      >
        <BsSearch className="shrink-0 opacity-50" />
        <p className="text-sm grow shrink-0">
          <span className="font-bold capitalize">{tag}</span>
        </p>
        <button
          onClick={close}
          title="Click to reset filter"
          className="hover:opacity-100 opacity-50 hover:text-primary hover:scale-110 transition-all shrink-0"
        >
          <BsXLg />
        </button>
      </div>
      <ul className="max-w-3xl mx-auto w-full flex items-center mt-10 justify-center gap-4">
        {blog.length > 0 && (
          <li
            className={
              active === CONTENT_TYPE.blog.name
                ? "opacity-100 underline underline-offset-4"
                : "opacity-40"
            }
          >
            <button
              className="font-bold text-xs capitalize"
              onClick={() => setActive(CONTENT_TYPE.blog.name)}
            >
              {CONTENT_TYPE.blog.name}{" "}
              <sup className="text-primary font-bold">{blog.length}</sup>
            </button>
          </li>
        )}
        {project.length > 0 && (
          <li
            className={
              active === CONTENT_TYPE.project.name
                ? "opacity-100 underline underline-offset-4"
                : "opacity-40"
            }
          >
            <button
              className="font-bold text-xs capitalize"
              onClick={() => setActive(CONTENT_TYPE.project.name)}
            >
              {CONTENT_TYPE.project.name}{" "}
              <sup className="text-primary font-bold">{project.length}</sup>
            </button>
          </li>
        )}
        {design.length > 0 && (
          <li
            className={
              active === CONTENT_TYPE.design.name
                ? "opacity-100 underline underline-offset-4"
                : "opacity-40"
            }
          >
            <button
              className="font-bold text-xs capitalize"
              onClick={() => setActive(CONTENT_TYPE.design.name)}
            >
              {CONTENT_TYPE.design.name}{" "}
              <sup className="text-primary font-bold">{design.length}</sup>
            </button>
          </li>
        )}
      </ul>
      {active === CONTENT_TYPE.project.name && (
        <GroupList type={CONTENT_TYPE.project.name} list={project} tag={tag} />
      )}
      {active === CONTENT_TYPE.blog.name && (
        <GroupList type={CONTENT_TYPE.blog.name} list={blog} tag={tag} />
      )}
      {active === CONTENT_TYPE.design.name && (
        <GroupList type={CONTENT_TYPE.design.name} list={design} tag={tag} />
      )}

      {!Boolean(project.length || blog.length || design.length) && (
        <p className="text-center flex items-start justify-center gap-1 w-full my-10">
          <span>No public content found for</span>
          <strong className="text-primary capitalize underline underline-offset-4 font-bold text-sm">
            {tag}
          </strong>
        </p>
      )}
    </section>
  );
};

const GroupList = ({ type, list }) => {
  return (
    <section className="w-full">
      <div className="mb-10 w-full grid place-items-center">
        <h3 className="heading--primary capitalize">{type}</h3>
      </div>
      {type === CONTENT_TYPE.project.name && (
        <div className="flex flex-col items-stretch w-11/12 gap-y-20 max-w-4xl mx-auto">
          {list?.map((project, index) => (
            <ProjectThumbnail
              key={project._id}
              data={project}
              index={index + 1}
            />
          ))}
        </div>
      )}

      {type === CONTENT_TYPE.blog.name && (
        <div className="flex flex-col items-stretch w-11/12 gap-y-20 max-w-4xl mx-auto">
          {list?.map((blog, index) => (
            <BlogThumbnail key={blog._id} data={blog} index={index + 1} />
          ))}
        </div>
      )}

      {type === CONTENT_TYPE.design.name && (
        <>
          {list.length < 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-20 p-4 w-full mb-20 max-w-6xl mx-auto justify-center items-center">
              {list.map((design, i) => (
                <DesignThumbnail
                  key={design._id}
                  data={design}
                  index={i}
                  center={list.length < 4}
                />
              ))}
            </div>
          )}
          {list.length >= 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-9 grid-flow-row gap-20 p-4 w-full mb-20 max-w-4xl mx-auto">
              {list.map((design, i) => (
                <DesignThumbnail
                  key={design._id}
                  data={design}
                  index={i}
                  center={list.length >= 4}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
