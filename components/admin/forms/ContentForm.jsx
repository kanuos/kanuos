// import : built in
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

// imports : external
import axios from "axios";
import { MdLockOutline, MdLockOpen } from "react-icons/md";

// import : internal components
import { SelectContentType } from "../../../components/admin/SelectContentType";

// import : internal
import { ADMIN_URLS } from "../../../utils";
import { API_ROUTES, CONTENT_TYPE } from "../../../utils/admin";
import { ContentValidators } from "../../../utils/validator";

import { CTA } from "../../portfolio/CTA";

// dynamic imports
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
// import CMSForm from "./CMS";
const BlogCRUDForm = dynamic(() =>
  import("./BlogCRUDForm").then((m) => m.BlogCRUDForm)
);
const ProjectCRUDForm = dynamic(() =>
  import("./ProjectCRUDForm").then((m) => m.ProjectCRUDForm)
);
const DesignCRUDForm = dynamic(() =>
  import("./DesignCRUDForm").then((m) => m.DesignCRUDForm)
);

// constants
const SESSION_NAME = `sounak_admin`;
const CONTENT_NAME = "sounak_admin_cms_data";

export const ContentCRUD_Form = ({
  allTags,
  heading,
  isDarkMode,
  init,
  contentType = "",
  action = "",
  method = "POST",
}) => {
  const errorRef = useRef();
  const router = useRouter();

  // component state
  const [type, setType] = useState(contentType);
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState(init?.tags || []);
  const [isPublic, setIsPublic] = useState(init?.isPublic || false);
  const [content, setContent] = useState(init);
  const [previewMode, setPreviewMode] = useState(false);
  const [pageMsg, setPageMsg] = useState("");
  const [pageErr, setPageErr] = useState(false);

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

  useEffect(() => {
    router.events.on("routeChangeStart", resetSession);
    return () => router.events.off("routeChangeStart", resetSession);
  }, [router]);

  function resetSession() {
    console.log("route changed");
    sessionStorage.removeItem(SESSION_NAME);
    sessionStorage.removeItem(CONTENT_NAME);
  }

  // Whenever content type or selected tag list changes update the session storage to avoid data loss on refresh
  useEffect(() => {
    if (!init) {
      const storedData = JSON.parse(sessionStorage.getItem(SESSION_NAME));
      if (storedData && type && storedData.type !== type) {
        sessionStorage.removeItem(SESSION_NAME);
      }
    }
    if (tags.length > 0 || Boolean(type)) {
      sessionStorage.setItem(SESSION_NAME, JSON.stringify({ type, tags }));
    }
  }, [type, tags, init]);

  // Initial render/router path change -> set initial settings from session storage
  useEffect(() => {
    if (init) return;
    const cms = JSON.parse(sessionStorage.getItem(SESSION_NAME));
    setType(() => cms?.type || "");
    setTags(() => cms?.tags || []);
  }, [init]);

  // hide the page error
  useEffect(() => {
    if (!pageMsg) return;
    const t = setTimeout(() => {
      setPageMsg("");
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, [pageMsg]);

  async function handleSubmitToServer() {
    try {
      // submit data
      let URL = API_ROUTES[type + "s"] + action;
      const { data, err } = (
        await axios({
          url: URL,
          method,
          data: { ...content, isPublic },
        })
      ).data;

      if (err) {
        if (typeof data === "string") {
          throw data;
        }
        throw JSON.stringify(data);
      }

      setPageMsg("Blog submitted successfully");
      setPageErr(false);
      // clear the session storage
      sessionStorage.removeItem(SESSION_NAME);
      sessionStorage.removeItem(CONTENT_NAME);
      // redirect to admin blog list
      router.push(ADMIN_URLS[type + "s"].url);
    } catch (error) {
      setPageErr(true);
      setPageMsg(error);
      errorRef.current.scrollIntoView();
    }
  }

  const validateContentForPreviewMode = useCallback(
    function (contentData) {
      try {
        const { value, error } = ContentValidators[type].validate({
          ...contentData,
          tags,
          isPublic,
        });
        if (error) {
          throw error.details[0].message;
        }
        setContent(() => value);
        setPreviewMode(true);
        errorRef.current.scrollIntoView();
        setPageMsg("Valid data. Can be sent");
        setPageErr(false);
      } catch (error) {
        console.log("ContentForm.jsx 181 ", error);
        errorRef.current.scrollIntoView();
        setPageMsg(error);
        setPageErr(true);
      }
    },
    [type, tags, isPublic]
  );

  const getContentType = useCallback(function (c) {
    setType(() => c);
    sessionStorage.removeItem(CONTENT_NAME);
    setContent(() => ({}));
  }, []);

  return (
    <main className="h-full min-h-screen p-8">
      <div className="container max-w-prose mx-auto">
        <h1 className="heading--main block">{heading}</h1>
        <p
          ref={errorRef}
          className={`p-4 text-light text-xs font-semibold w-full rounded-md ${
            pageMsg.trim().length > 0 &&
            (pageErr ? "bg-primary" : "bg-secondary")
          }`}
        >
          <small>{pageMsg}</small>
        </p>
        <div className="w-full after-line flex flex-col items-stretch gap-y-4 mb-10">
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
            {type === CONTENT_TYPE.blog.name && (
              <BlogCRUDForm
                init={content}
                isDarkMode={isDarkMode}
                getBlog={validateContentForPreviewMode}
                STORAGE_KEY={CONTENT_NAME}
              />
            )}
            {type === CONTENT_TYPE.project.name && (
              <ProjectCRUDForm
                init={content}
                isDarkMode={isDarkMode}
                getProject={validateContentForPreviewMode}
                STORAGE_KEY={CONTENT_NAME}
              />
            )}
            {type === CONTENT_TYPE.design.name && (
              <DesignCRUDForm
                init={content}
                isDarkMode={isDarkMode}
                getDesign={validateContentForPreviewMode}
                STORAGE_KEY={CONTENT_NAME}
              />
            )}

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

      {/* preview mode */}
      {previewMode && (
        <div className="py-40">
          <h2 className="w-full mx-auto text-center border-y-2 border-current p-4 heading--main">
            Preview Mode
          </h2>
          <section className="w-full max-w-4xl mx-auto mb-20">
            {type === CONTENT_TYPE.design.name && (
              <DesignDetailBody design={content} adminMode={true} />
            )}
            {type === CONTENT_TYPE.blog.name && (
              <BlogDetailBody blog={content} adminMode={true} />
            )}
            {type === CONTENT_TYPE.project.name && (
              <ProjectDetailBody project={content} adminMode={true} />
            )}
          </section>

          <div className="relative h-full w-full max-w-4xl mx-auto">
            {/* toggle Access status */}
            <section className="section-wrapper pb-20">
              <div className="flex flex-col md:flex-row gap-4 md:gap-x-14">
                <h2 className="heading--secondary shrink-0 grow">
                  Access Status
                </h2>
                <div className="flex items-center w-full">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    id="public"
                    className="hidden"
                    onChange={() => setIsPublic((prev) => !prev)}
                  />
                  <label
                    htmlFor="public"
                    className={`content--secondary text-center font-semibold p-2 border-2 border-current cursor-pointer hover:scale-110 transition-all ${
                      isPublic ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {isPublic ? "Public" : "Private"}
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div className="w-max mx-auto">
            <CTA
              isDarkMode={isDarkMode}
              label={`Submit ${type}`}
              cb={handleSubmitToServer}
              btnMode={true}
            />
          </div>
        </div>
      )}
    </main>
  );
};
