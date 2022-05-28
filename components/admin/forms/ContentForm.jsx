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
import Layout from "../../../utils/cms";

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
const CONTENT_NAME = "sounak_admin_cms_data";

export const ContentCRUD_Form = ({ allTags, heading, isDarkMode, init }) => {
  const errorRef = useRef();
  const router = useRouter();
  const [type, setType] = useState("");
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState(init);
  const [previewMode, setPreviewMode] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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
    const storedContent = JSON.parse(sessionStorage.getItem(CONTENT_NAME));
    setType(() => cms?.type || "");
    setTags(() => cms?.tags || []);
    storedContent && setContent(() => storedContent);
  }, []);

  useEffect(() => {
    console.log("content updated", content);
  }, [content]);

  async function handleSubmitToServer() {
    try {
      // validate input                   :: joi
      const { error, value } = ContentValidators[type].validate({
        ...content,
        tags,
        isPublic,
      });
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
      sessionStorage.removeItem(CONTENT_NAME);
      // redirect to admin blog list
      router.push(ADMIN_URLS[type + "s"].url);
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
    }
  }

  const getContentType = useCallback(function (c) {
    setType(() => c);
    sessionStorage.removeItem(CONTENT_NAME);
    setContent(() => ({}));
  });

  const validateContentForPreviewMode = useCallback(
    function (data) {
      try {
        const validator = ContentValidators[type];
        console.log("validator :", { type, content, data });
        if (!validator) {
          throw "Invalid content type";
        }
        // validate the content type using JOI validator schemas
        setContent((prev) => ({ ...prev, ...data }));
        const { value, error } = validator.validate({ ...data, tags });
        if (error) throw error;

        console.log(value, error);
        setPreviewMode(() => true);
      } catch (error) {
        setErrMsg(error.toString());
        errorRef?.current?.scrollIntoView();
      }
    },
    [type, content]
  );

  return (
    <main className="h-full min-h-screen p-8">
      <div className="container max-w-prose mx-auto">
        <h1 className="heading--main block">{heading}</h1>
        <p
          ref={errorRef}
          className={`p-4 text-light text-xs font-semibold w-full rounded-md ${
            errMsg.trim().length > 0 ? "bg-primary" : "bg-secondary"
          }`}
        >
          <small>{errMsg.trim().length > 0 ? errMsg : "No error"}</small>
        </p>
        <div className="w-full after-line flex flex-col items-stretch gap-y-4">
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
              storageKey={CONTENT_NAME}
              type="content"
              key={JSON.stringify(content, type)}
              init={content}
              layout={Layout[type]}
              heading={`${type} content ↓`}
              btnLabel={`Preview ${type}`}
              isDarkMode={isDarkMode}
              getFormData={validateContentForPreviewMode}
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

      {/* preview mode */}
      {previewMode && (
        <div className="my-40">
          <h2 className="w-full mx-auto text-center border-y-2 border-current p-4 heading--main">
            Preview Mode
          </h2>
          <section className="w-full max-w-4xl mx-auto mb-20">
            {type === CONTENT_TYPE.design.name && (
              <DesignDetailBody design={content} adminMode={true} />
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
                    className={`content--secondary text-center font-semibold p-2 border-2 border-current ${
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
