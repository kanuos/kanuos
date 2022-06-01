import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// dynamic imports
const CTA = dynamic(() => import("../../portfolio/CTA").then((m) => m.CTA));
const PageInput = dynamic(() => import("../inputs/custom/PageInput"));
const MarkdownInput = dynamic(() =>
  import("../inputs/Markdown").then((m) => m.MarkdownInput)
);
const ObjectInput = dynamic(() =>
  import("../inputs/ObjectInput").then((m) => m.ObjectInput)
);
const StringInput = dynamic(() =>
  import("../inputs/String").then((m) => m.StringInput)
);

// Blog CRUD fields and layout
// This component stores the blog state in it's own state
// if STORAGE_KEY is available, on every update of the state store the updated state
// to session storage with key of STORAGE_KEY

export const BlogCRUDForm = ({
  init = null,
  isDarkMode,
  getBlog,
  STORAGE_KEY = "",
}) => {
  //Blog state : start
  const [blog, setBlog] = useState(resetInitialState());
  // End of blog state

  // hooks
  // generate slug field whenever the blog title updates
  useEffect(() => {
    handleUpdate("slug", blog.title?.trim().toLowerCase().replaceAll(" ", "-"));
  }, [blog.title]);

  // initial render prefill the blog data from session storage if exists
  useEffect(() => {
    if (!Boolean(STORAGE_KEY)) return;
    // get blog data from session storage if exists
    const sessionData = sessionStorage.getItem(STORAGE_KEY || "");
    if (!Boolean(sessionData)) return;

    setBlog(() => JSON.parse(sessionData));
    return;
    //   else update the session storage
  }, []);

  // override the session storage data with the updated blog data
  useEffect(() => {
    if (!Boolean(STORAGE_KEY)) return;

    //   Check if every field of the state is empty
    //   Step 1: covert all blog field values to truthy/falsy values
    const checkArr = Object.values(blog).map((el) => {
      switch (typeof el) {
        case "string":
          return el.trim();
        case "object":
          if (Array.isArray(el)) {
            return el.length;
          }
          return Object.values(el).every(Boolean);
      }
    });
    //   Step 2: check whether all fields are empty
    //   if all steps are do nothing
    if (!checkArr.some(Boolean)) return;
    //   else update the session storage
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(blog));
  }, [blog]);

  // callbacks
  function handleSubmitBlog() {
    getBlog(blog);
  }

  function resetInitialState() {
    return {
      title: init?.title || "",
      slug: init?.slug || "",
      desc: init?.desc || "",
      category: init?.category || "",
      page: init?.page || [],
      outro: {
        heading: init?.outro?.heading || "",
        text: init?.outro?.text || "",
      },
      repo: { label: init?.repo?.label || "", href: init?.repo?.href || "" },
      demo: { label: init?.demo?.label || "", href: init?.demo?.href || "" },
    };
  }

  function handleUpdate(key, value) {
    setBlog((prev) => ({ ...prev, [key]: value }));
  }

  function handleObjectUpdate({ parent, key, value }) {
    setBlog((prev) => ({
      ...prev,
      [parent]: { ...blog[parent], [key]: value },
    }));
  }

  return (
    <section className="w-full my-6 flex flex-col items-stretch gap-6">
      {/* title field , slug field */}
      <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
        <StringInput
          name="title"
          value={blog.title}
          setValue={(v) => handleUpdate("title", v)}
          placeholder="Blog title"
          split={true}
        />
        <StringInput
          name="slug"
          value={blog.slug}
          setValue={(v) => handleUpdate("slug", v)}
          placeholder="Blog unique slug"
          split={true}
        />
      </section>

      {/* desc field , category field */}
      <section className="grid gap-4 w-full">
        <MarkdownInput
          name="desc"
          value={blog.desc}
          setValue={(v) => handleUpdate("desc", v)}
          placeholder="Blog desc"
        />
        <StringInput
          name="category"
          value={blog.category}
          setValue={(v) => handleUpdate("category", v)}
          placeholder="Blog category"
          split={true}
        />
      </section>

      {/* Blog Page */}
      <PageInput
        isDarkMode={isDarkMode}
        initState={blog.page}
        getPage={(p) => handleUpdate("page", p)}
      />

      {/* Outro , Repo , Demo */}
      <section className="grid gap-4 w-full">
        <ObjectInput
          name="outro"
          parentState={blog.outro}
          isDarkMode={isDarkMode}
        >
          <StringInput
            name="heading"
            placeholder="Outro Heading"
            value={blog.outro.heading}
            setValue={(v) =>
              handleObjectUpdate({ parent: "outro", key: "heading", value: v })
            }
            split={true}
          />
          <MarkdownInput
            name="text"
            placeholder="Outro Text"
            value={blog.outro.text}
            setValue={(v) =>
              handleObjectUpdate({ parent: "outro", key: "text", value: v })
            }
          />
        </ObjectInput>
        <ObjectInput
          name="repo"
          parentState={blog.repo}
          isDarkMode={isDarkMode}
        >
          <StringInput
            name="label"
            placeholder="Repo label"
            value={blog.repo.label}
            setValue={(v) =>
              handleObjectUpdate({ parent: "repo", key: "label", value: v })
            }
            split={true}
          />
          <StringInput
            name="href"
            placeholder="Repo URL"
            value={blog.repo.href}
            setValue={(v) =>
              handleObjectUpdate({ parent: "repo", key: "href", value: v })
            }
            split={true}
          />
        </ObjectInput>
        <ObjectInput
          name="demo"
          parentState={blog.demo}
          isDarkMode={isDarkMode}
        >
          <StringInput
            name="label"
            placeholder="Demo label"
            value={blog.demo.label}
            setValue={(v) =>
              handleObjectUpdate({ parent: "demo", key: "label", value: v })
            }
            split={true}
          />
          <StringInput
            name="href"
            placeholder="Demo URL"
            value={blog.demo.href}
            setValue={(v) =>
              handleObjectUpdate({ parent: "repo", key: "href", value: v })
            }
            split={true}
          />
        </ObjectInput>
      </section>

      {/* CTA button to send the blog data to parent component */}
      <div className="w-max mt-10">
        <CTA
          isDarkMode={isDarkMode}
          btnType="button"
          btnMode={true}
          cb={handleSubmitBlog}
          label={init ? "Save changes to blog" : "Save blog"}
        />
      </div>
    </section>
  );
};
