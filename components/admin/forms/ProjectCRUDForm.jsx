import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrayInput } from "../inputs/ArrayInput";

// dynamic imports
const SelectInput = dynamic(() =>
  import("../inputs/SelectInput").then((m) => m.SelectInput)
);
const CTA = dynamic(() => import("../../portfolio/CTA").then((m) => m.CTA));
const ChapterInput = dynamic(() => import("../inputs/custom/ChapterInput"));
const MarkdownInput = dynamic(() =>
  import("../inputs/Markdown").then((m) => m.MarkdownInput)
);
const ObjectInput = dynamic(() =>
  import("../inputs/ObjectInput").then((m) => m.ObjectInput)
);
const StringInput = dynamic(() =>
  import("../inputs/String").then((m) => m.StringInput)
);

// project CRUD fields and layout
// This component stores the project state in it's own state
// if STORAGE_KEY is available, on every update of the state store the updated state
// to session storage with key of STORAGE_KEY

export const ProjectCRUDForm = ({
  init = null,
  isDarkMode,
  getProject,
  STORAGE_KEY = "",
}) => {
  //project state : start
  const [project, setProject] = useState(resetInitialState());
  const [currentTechStack, setCurrentTechStack] = useState("");
  const [editIndex, setEditIndex] = useState(NaN);
  // End of project state

  // hooks
  // generate slug field whenever the blog title updates
  useEffect(() => {
    handleUpdate(
      "slug",
      project.title?.trim().toLowerCase().replaceAll(" ", "-")
    );
  }, [project.title]);

  // initial render prefill the project data from session storage if exists
  useEffect(() => {
    if (!Boolean(STORAGE_KEY)) return;

    // dont load data from session storage if init data is already available EDIT mode
    if (init) return;

    // get project data from session storage if exists
    const sessionData = sessionStorage.getItem(STORAGE_KEY || "");
    if (!Boolean(sessionData)) return;

    setProject(() => JSON.parse(sessionData));
    return;
    //   else update the session storage
  }, [STORAGE_KEY, init]);

  // override the session storage data with the updated project data
  useEffect(() => {
    if (!Boolean(STORAGE_KEY)) return;

    //   Check if every field of the state is empty
    //   Step 1: covert all project field values to truthy/falsy values
    const checkArr = Object.values(project).map((el) => {
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
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  }, [project, STORAGE_KEY]);

  // callbacks
  function handleSubmitProject() {
    getProject(project);
  }

  function resetInitialState() {
    return {
      title: init?.title || "",
      slug: init?.slug || "",
      desc: init?.desc || "",
      difficulty: init?.difficulty || "",
      category: init?.category || "",
      techStack: init?.techStack || [],
      chapters: init?.chapters || [],
      outro: {
        heading: init?.outro?.heading || "",
        text: init?.outro?.text || "",
      },
      repo: { label: init?.repo?.label || "", href: init?.repo?.href || "" },
      demo: { label: init?.demo?.label || "", href: init?.demo?.href || "" },
    };
  }

  function handleUpdate(key, value) {
    setProject((prev) => ({ ...prev, [key]: value }));
  }

  function handleObjectUpdate({ parent, key, value }) {
    setProject((prev) => ({
      ...prev,
      [parent]: { ...project[parent], [key]: value },
    }));
  }

  function addTechStack() {
    if (isNaN(editIndex)) {
      setProject((prev) => ({
        ...prev,
        techStack: [...prev.techStack, { text: currentTechStack }],
      }));
    } else {
      setProject((prev) => ({
        ...prev,
        techStack: prev.techStack.map((el, k) => {
          if (k === editIndex) {
            return { text: currentTechStack };
          }
          return el;
        }),
      }));
    }
    setEditIndex(NaN);
    setCurrentTechStack("");
  }

  function deleteTechStack(index) {
    if (!confirm("Confirm delete")) return;
    setProject((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, k) => k !== index),
    }));
  }

  return (
    <section className="w-full my-6 flex flex-col items-stretch gap-6">
      {/* title field , difficulty field */}
      <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
        <StringInput
          name="title"
          value={project.title}
          setValue={(v) => handleUpdate("title", v)}
          placeholder="project title"
          specialField={true}
          split={true}
        />
        <StringInput
          name="slug"
          value={project.slug}
          setValue={(v) => handleUpdate("slug", v)}
          placeholder="Project unique slug"
          split={true}
        />
        <SelectInput
          key={project.difficulty}
          init={project.difficulty}
          setValue={(v) => handleUpdate("difficulty", v)}
          name="difficulty"
          list={{
            beginner: "beginner",
            intermediate: "intermediate",
            advanced: "advanced",
          }}
        />
      </section>
      {/* desc field , category field */}
      <section className="grid gap-4 w-full">
        <MarkdownInput
          name="desc"
          value={project.desc}
          setValue={(v) => handleUpdate("desc", v)}
          placeholder="project desc"
        />
        <StringInput
          name="category"
          value={project.category}
          specialField={true}
          setValue={(v) => handleUpdate("category", v)}
          placeholder="project category"
          split={true}
        />
        {/* tech stack array */}
        {Boolean(project.techStack) && (
          <ArrayInput
            name="techStack"
            parentState={project.techStack}
            key={project.techStack?.length}
            currentState={{}}
            isDarkMode={isDarkMode}
            getArrayItem={() => null}
            getEditData={(v, i) => {
              setEditIndex(i);
              setCurrentTechStack(v.text);
            }}
            deleteArrayItem={deleteTechStack}
            editIndex={editIndex}
          >
            <StringInput
              name="text"
              value={currentTechStack}
              setValue={(v) => setCurrentTechStack(v)}
              placeholder="Current tech stack text"
              split={true}
            />
            {currentTechStack.trim().length > 0 && (
              <div className="w-max">
                <CTA
                  label="Add tech stack"
                  cb={addTechStack}
                  btnMode={true}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </ArrayInput>
        )}
      </section>

      {/* project Page */}
      {Boolean(project.chapters) && (
        <ChapterInput
          key={project.chapters.length}
          isDarkMode={isDarkMode}
          initState={project.chapters}
          getChapter={(p) => handleUpdate("chapters", p)}
        />
      )}

      {/* Outro , Repo , Demo */}
      <section className="grid gap-4 w-full">
        <ObjectInput
          name="outro"
          parentState={project.outro}
          isDarkMode={isDarkMode}
        >
          <StringInput
            name="heading"
            placeholder="Outro Heading"
            value={project.outro.heading}
            setValue={(v) =>
              handleObjectUpdate({ parent: "outro", key: "heading", value: v })
            }
            split={true}
          />
          <MarkdownInput
            name="text"
            placeholder="Outro Text"
            value={project.outro.text}
            setValue={(v) =>
              handleObjectUpdate({ parent: "outro", key: "text", value: v })
            }
          />
        </ObjectInput>
        <ObjectInput
          name="repo"
          parentState={project?.repo}
          isDarkMode={isDarkMode}
        >
          <StringInput
            name="label"
            placeholder="Repo label"
            value={project?.repo?.label}
            setValue={(v) =>
              handleObjectUpdate({ parent: "repo", key: "label", value: v })
            }
            split={true}
          />
          <StringInput
            name="href"
            placeholder="Repo URL"
            value={project?.repo?.href}
            setValue={(v) =>
              handleObjectUpdate({ parent: "repo", key: "href", value: v })
            }
            split={true}
          />
        </ObjectInput>
        <ObjectInput
          name="demo"
          parentState={project?.demo}
          isDarkMode={isDarkMode}
        >
          <StringInput
            name="label"
            placeholder="Demo label"
            value={project?.demo?.label}
            setValue={(v) =>
              handleObjectUpdate({ parent: "demo", key: "label", value: v })
            }
            split={true}
          />
          <StringInput
            name="href"
            placeholder="Demo URL"
            value={project?.demo?.href}
            setValue={(v) =>
              handleObjectUpdate({ parent: "demo", key: "href", value: v })
            }
            split={true}
          />
        </ObjectInput>
      </section>

      {/* CTA button to send the project data to parent component */}
      <div className="w-max mt-10">
        <CTA
          isDarkMode={isDarkMode}
          btnType="button"
          btnMode={true}
          cb={handleSubmitProject}
          label={init ? "Save changes to project" : "Save project"}
        />
      </div>
    </section>
  );
};
