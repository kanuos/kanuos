import { useState, useEffect } from "react";
import { PAGE_CONTENT } from "../../utils/admin";
import {
  StringField,
  ImageInput,
  ObjectStepInput,
  MarkdownEditor,
} from "./InputField";

import {
  IoMagnetOutline,
  IoCloseCircleOutline,
  IoLockClosed,
} from "react-icons/io5";
import { LAYOUTS } from "../../utils/admin";

const INIT_STEP = {
  key: "",
  value: "",
};
const INIT_PAGE = {
  heading: "",
  steps: [],
};

export const PageField = ({
  name,
  init = null,
  getData,
  contentType,
  handleDeleteChapter,
  editData,
}) => {
  const [currentStepData, setCurrentStepData] = useState({ ...INIT_STEP });
  const [currentStepType, setCurrentStepType] = useState("");
  const [page, setPage] = useState({ ...INIT_PAGE });
  const [editStepIndex, setEditStepIndex] = useState(NaN);
  const [editChapter, setEditChapter] = useState(null);

  function handleStepData({ k, v }) {
    setCurrentStepData({ key: k, value: v });
  }

  function handleAddStep() {
    if (!isNaN(editStepIndex)) {
      setPage((prev) => ({
        ...prev,
        steps: prev.steps.map((st, i) => {
          if (i === editStepIndex) {
            return currentStepData;
          }
          return st;
        }),
      }));
      setCurrentStepData({ ...INIT_STEP });
      setCurrentStepType("");
      setEditStepIndex(NaN);
      return;
    }
    setPage((prev) => ({ ...prev, steps: [...prev.steps, currentStepData] }));
    setCurrentStepData({ ...INIT_STEP });
    setCurrentStepType("");
  }

  function handleAddObject({ key, value }) {
    setPage((prev) => ({ ...prev, steps: [...prev.steps, { key, value }] }));
    setCurrentStepData({ ...INIT_STEP });
    setCurrentStepType("");
  }

  function handleDeleteStep(step) {
    const canDelete = confirm("Delete " + JSON.stringify(step));
    if (!canDelete) return;
    setPage((prev) => ({
      ...prev,
      steps: prev.steps.filter((s) => !Object.is(s, step)),
    }));
  }

  function handleAddChapter() {
    if (editChapter) {
      editData(page);
      setEditChapter(null);
    } else {
      page.index = Date.now();
      getData(page);
    }
    setCurrentStepData({ ...INIT_STEP });
    setPage({ ...INIT_PAGE });
    setCurrentStepType("");
  }

  function handleEditChapter(chapter) {
    setEditChapter(chapter);
    setPage({ ...chapter });
  }

  function handleEditStep(step, i) {
    console.log({ step, i });
    setEditStepIndex(i);
    setCurrentStepData({ ...step });
    setCurrentStepType(step.key);
  }

  useEffect(() => {
    if (currentStepType === "") {
      setEditStepIndex(NaN);
      setCurrentStepData({ ...INIT_STEP });
    }
  }, [currentStepType]);

  function escapeEditChapterMode() {
    setEditChapter(null);
    setCurrentStepData({ ...INIT_STEP });
    setCurrentStepType("");
    setPage({ ...INIT_PAGE });
  }

  return (
    <div className="flex flex-col w-full bg-light p-4 filter drop-shadow-xl rounded-md">
      {init && init.length > 0 && (
        <div className="mb-4">
          <span className="text-xs capitalize font-semibold text-secondary">
            Chapters
          </span>
          <ul className="flex flex-col items-stretch justify-start gap-y-4">
            {init.map((el, i) => {
              if (el.index === editChapter?.index) {
                return (
                  <li
                    key={i}
                    className="w-full p-4 bg-light rounded-md filter drop-shadow-xl"
                  >
                    <section className="w-full flex opacity-20 pointer-events-none justify-between items-center px-2">
                      <span className="font-semibold font-special text-lg capitalize">
                        Chapter {el.heading} in Edit Mode
                      </span>
                      <IoLockClosed />
                    </section>
                  </li>
                );
              }
              return (
                <li
                  key={i}
                  className="w-full p-4 bg-light rounded-md filter drop-shadow-xl"
                >
                  <details className="w-full">
                    <summary className="w-full flex justify-between items-center px-2">
                      <span className="font-semibold font-special text-lg cursor-pointer hover:text-secondary capitalize">
                        Chapter {i + 1} : {el.heading}
                      </span>
                      <div className="flex items-center justify-center gap-x-2">
                        <button
                          onClick={() => handleEditChapter(el)}
                          className="hover:text-primary"
                        >
                          <IoMagnetOutline />
                        </button>

                        <button
                          onClick={() => handleDeleteChapter(el)}
                          className="hover:text-primary"
                        >
                          <IoCloseCircleOutline />
                        </button>
                      </div>
                    </summary>
                    <p className="text-xs my-2 w-full font-semibold break-words whitespace-pre-line">
                      {JSON.stringify(el.steps, null, 4)}
                    </p>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="flex flex-col items-start justify-start">
        <span className="text-xs capitalize font-semibold text-primary">
          Add {name}
        </span>

        <div className="w-full my-4">
          <StringField
            name="heading"
            value={page.heading}
            setValue={({ _, v }) =>
              setPage((prev) => ({ ...prev, heading: v }))
            }
          />
        </div>

        <div className="w-full bg-light p-4 rounded-md filter drop-shadow-xl flex flex-col items-stretch">
          <span className="text-xs capitalize font-semibold">steps</span>
          {Object.values(page.steps).map((step, i) => {
            if (i === editStepIndex) {
              return (
                <div
                  key={i}
                  className="w-full p-4 bg-light rounded drop-shadow-xl filter relative after:absolute after:w-0.5 after:h-4 mb-4 after:bg-primary after:left-4 after:-bottom-4"
                >
                  <section className="w-full flex justify-between items-center px-2 opacity-20 cursor-not-allowed pointer-events-none">
                    <span className="font-semibold font-special text-lg cursor-pointer hover:text-secondary">
                      Edit Mode On : {step.key} field
                    </span>
                    <IoLockClosed />
                  </section>
                </div>
              );
            }
            return (
              <details
                key={i}
                className="w-full p-4 bg-light rounded drop-shadow-xl filter relative after:absolute after:w-0.5 after:h-4 mb-4 after:bg-primary after:left-4 after:-bottom-4"
              >
                <summary className="w-full flex justify-between items-center px-2">
                  <span className="font-semibold font-special text-lg cursor-pointer hover:text-secondary">
                    Step {i} : {step.key} field
                  </span>
                  <div className="flex items-center justify-center gap-x-2">
                    <button
                      onClick={() => handleEditStep(step, i)}
                      className="hover:text-secondary"
                    >
                      <IoMagnetOutline />
                    </button>

                    <button
                      onClick={() => handleDeleteStep(step)}
                      className="hover:text-primary"
                    >
                      <IoCloseCircleOutline />
                    </button>
                  </div>
                </summary>
                <p className="text-xs my-2 w-full font-semibold break-words whitespace-pre-line">
                  {JSON.stringify(step.value, null, 4)}
                </p>
              </details>
            );
          })}

          <div className="w-full bg-light rounded-md">
            <select
              value={currentStepType}
              onChange={(e) => setCurrentStepType(e.target.value)}
              className="block w-full p-1.5 text-xs peer outline-none focus:outline-none border-2 rounded mt-1.5 capitalize"
            >
              <option
                value=""
                className="font-semibold capitalize opacity-75 text-primary pointer-events-none"
              >
                select step
              </option>
              {PAGE_CONTENT[contentType].map((el) => (
                <option
                  value={el}
                  key={el}
                  className="font-semibold capitalize cursor-pointer"
                >
                  {el}
                </option>
              ))}
            </select>

            {["markdown"].includes(currentStepType) && (
              <>
                <MarkdownEditor
                  name={currentStepType}
                  key={currentStepData.key}
                  init={currentStepData.value}
                  getData={(md) =>
                    handleAddObject({ key: "markdown", value: md })
                  }
                />
                {Object.values(currentStepData).every(
                  (el) => el.trim().length > 0
                ) && (
                  <button
                    onClick={handleAddStep}
                    className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer"
                  >
                    <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                      Add Step
                    </span>
                    <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
                  </button>
                )}
              </>
            )}

            {["image"].includes(currentStepType) && (
              <ImageInput name={currentStepType} setValue={handleAddObject} />
            )}

            {["link", "code"].includes(currentStepType) && (
              <>
                <ObjectStepInput
                  key={currentStepType}
                  layout={LAYOUTS[currentStepType]}
                  init={!isNaN(editStepIndex) ? currentStepData.value : null}
                  name={currentStepType}
                  setValue={({ value }) =>
                    handleAddObject({ key: currentStepType, value })
                  }
                />
              </>
            )}
          </div>
        </div>

        {Boolean(page.heading.length * page.steps.length) &&
          currentStepType !== "markdown" && (
            <button
              onClick={handleAddChapter}
              className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer"
            >
              <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                {editChapter ? "Edit" : "Add"} Chapter
              </span>
              <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
          )}

        {editChapter && (
          <button
            onClick={escapeEditChapterMode}
            className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer"
          >
            <small className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
              Exit Edit Chapter Mode
            </small>
            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
          </button>
        )}
      </div>
    </div>
  );
};
