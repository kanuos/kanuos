// import : built in
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// imports : external
import { MdLockOutline, MdLockOpen } from "react-icons/md";

// import : internal components
import { JSON_EDITOR_STATE } from "../../../components/admin/JSONEditor";
import { SelectContentType } from "../../../components/admin/SelectContentType";

// import : internal
import { ADMIN_ACCOUNT, ADMIN_URLS } from "../../../utils";
import { API_ROUTES, CONTENT_TYPE } from "../../../utils/admin";
import { ContentValidators } from "../../../utils/validator";
import { isAdminMiddleware } from "../../../utils/authLib";
import Layout from "../../../utils/cms";

// dynamic imports
const JSONEditor = dynamic(() =>
  import("../../../components/admin/JSONEditor").then(
    (module) => module.JSONEditor
  )
);

const TagSelector = dynamic(() =>
  import("../../../components/admin/TagSelector").then(
    (module) => module.TagSelector
  )
);
const BlogDetailBody = dynamic(() =>
  import("../../../components/content/BlogDetailBody").then(
    (module) => module.BlogDetailBody
  )
);
const ProjectDetailBody = dynamic(() =>
  import("../../../components/content/ProjectDetailBody").then(
    (module) => module.ProjectDetailBody
  )
);
const DesignDetailBody = dynamic(() =>
  import("../../../components/content/DesignDetailBody").then(
    (module) => module.DesignDetailBody
  )
);
import { CTA } from "../../portfolio/CTA";
import CMSForm from "./CMS";

// constants
const SESSION_NAME = `sounak_admin`;

export const ContentCRUD_Form = ({ allTags, heading, isDarkMode }) => {
  const router = useRouter();
  const [type, setType] = useState("");
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState({});

  const detailCls = `px-4 py-6 rounded-md text-sm block nav-light ${
    isDarkMode ? "light-shadow" : "drop-shadow-xl"
  }`;

  function handleTag(tag) {
    const existingTag = tags.find((t) => t._id === tag._id);
    if (existingTag) {
      setTags((prev) => prev.filter((el) => el._id !== tag._id));
    } else {
      setTags((prev) => [...prev, tag]);
    }
  }

  const handleSetContent = useCallback(function (ctnt) {
    setContent({ ...ctnt, tags });
    setStep(3);
  });

  useEffect(() => {
    setContent((prev) => ({ ...prev, isPublic }));
  }, [isPublic]);

  // Whenever content type or selected tag list changes update the session storage to avoid data loss on refresh
  useEffect(() => {
    if (tags.length > 0 || Boolean(type)) {
      sessionStorage.setItem(SESSION_NAME, JSON.stringify({ type, tags }));
    }
  }, [type, tags]);

  // Initial render/router path change -> set initial settings from session storage
  useEffect(() => {
    const cms = JSON.parse(sessionStorage.getItem(SESSION_NAME));
    console.log(cms);
    setType(() => cms.type || "");
    setTags(() => cms.tags || []);
  }, []);

  async function handleSubmitToServer() {
    try {
      // validate input                   :: joi
      const { error, value } = ContentValidators[type].validate(content);
      if (error) {
        throw error.details[0].message;
      }

      // submit data
      let URL = API_ROUTES[type + "s"];

      const { data, err } = (
        await axios({
          url: URL,
          method: "POST",
          data: value,
        })
      ).data;

      if (err) {
        throw data;
      }

      // clear the session storage
      sessionStorage.removeItem(SESSION_NAME);
      sessionStorage.removeItem(JSON_EDITOR_STATE);
      // redirect to admin blog list
      router.push(ADMIN_URLS[type + "s"].url);
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
    }
  }

  const getContentType = useCallback(function (c) {
    setType(() => c);
  });

  return (
    <main className="h-full min-h-screen p-8">
      <div className="container max-w-prose mx-auto">
        <h1 className="heading--main block">{heading}</h1>

        <div className="w-full after-line flex flex-col items-stretch gap-y-6">
          {/* content type */}
          <details className={detailCls}>
            <SelectContentType
              type={type}
              getContentType={getContentType}
              isDarkMode={false}
            />
            <summary className="cursor-pointer block">
              {type ? (
                <p className="flex items-center justify-between w-full font-semibold">
                  <span>Content selected :</span>
                  <strong className="uppercase text-secondary font-semibold">
                    {type}
                  </strong>
                </p>
              ) : (
                <p className="flex items-center justify-between w-full font-semibold">
                  <span>Content selected :</span>
                  <strong className="uppercase text-primary font-semibold">
                    Not selected
                  </strong>
                </p>
              )}
            </summary>
          </details>

          {/* tags */}
          <details className={detailCls}>
            <TagSelector
              key={step}
              selectedTags={tags}
              allTags={JSON.parse(allTags)}
              handleTag={handleTag}
              prev={() => setStep(0)}
              next={() => setStep(2)}
            />
            <summary
              className={`block ${
                Boolean(type)
                  ? "opacity-100 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={(e) => !Boolean(type) && e.preventDefault()}
            >
              <p className="flex items-center justify-between w-full font-semibold">
                <span>Total tags selected :</span>
                <strong
                  className={`uppercase font-semibold ${
                    tags.length > 0 ? "text-secondary" : "text-primary"
                  }`}
                >
                  {tags.length}
                </strong>
              </p>
            </summary>
          </details>

          {/* cms */}
          <details className={detailCls}>
            <CMSForm
              key={step}
              layout={Layout.BLOG_CMS}
              heading={`${type} content ↓`}
              btnLabel={`Save changes to ${type}`}
              isDarkMode={isDarkMode}
              getFormData={(d) => console.log({ form: d })}
            />
            <summary
              className={`block ${
                Boolean(type) && Boolean(tags.length)
                  ? "opacity-100 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={(e) => !Boolean(type) && e.preventDefault()}
            >
              <p className="flex items-center justify-between w-full font-semibold">
                <span>Write {type} content</span>
                {Boolean(type) && Boolean(tags.length) ? (
                  <MdLockOpen className="text-lg" />
                ) : (
                  <MdLockOutline className="text-lg" />
                )}
              </p>
            </summary>
          </details>
        </div>
      </div>

      {step === 3 && (
        <>
          <p className="text-center block font-light font-special text-xl border-b pb-1 mb-4">
            Preview Mode
          </p>

          <button
            onClick={() => setStep(2)}
            className="capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer group w-max mx-auto"
          >
            <span className="py-1.5 px-6 block z-10 peer transition-all hover:shadow-xl border-2 font-semibold">
              &larr; Prev
            </span>
            <span className="py-1.5 px-6 block transition-all hover:shadow-xl border-2  absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
          </button>

          {type === CONTENT_TYPE.blog.name && (
            <BlogDetailBody blog={content} adminMode={true} />
          )}
          {type === CONTENT_TYPE.project.name && (
            <ProjectDetailBody project={content} adminMode={true} />
          )}
          {type === CONTENT_TYPE.design.name && (
            <DesignDetailBody design={content} adminMode={true} />
          )}

          <div className="border-t pt-1 flex flex-col items-center justify-center gap-6">
            <p className="text-center capitalize font-special text-xl">
              access status
            </p>
            <label htmlFor="public" className="text-sm cursor-pointer group">
              <p className="flex flex-col gap-2 items-center justify-center">
                {isPublic ? (
                  <>
                    <IoLockOpenOutline className="text-3xl group-hover:animate-bounce inline-block" />
                    <span className="text-xs font-semibold text-primary">
                      Public
                    </span>
                  </>
                ) : (
                  <>
                    <IoLockClosedOutline className="text-3xl group-hover:animate-bounce inline-block" />
                    <span className="text-xs font-semibold text-primary">
                      Private
                    </span>
                  </>
                )}
              </p>
            </label>
            <input
              type="checkbox"
              checked={isPublic}
              id="public"
              className="appearance-none"
              onChange={() => setIsPublic((prev) => !prev)}
            />

            <button
              onClick={handleSubmitToServer}
              className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer"
            >
              <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 font-semibold">
                Submit {type}
              </span>
              <span className="py-1.5 px-6 block transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
          </div>
        </>
      )}
    </main>
  );
};
