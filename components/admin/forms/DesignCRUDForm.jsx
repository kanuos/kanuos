import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import UserFlowInput from "../inputs/custom/UserFlowInput";
import { ArrayInput } from "../inputs/ArrayInput";

// dynamic imports
const CTA = dynamic(() => import("../../portfolio/CTA").then((m) => m.CTA));
// const PageInput = dynamic(() => import("../inputs/custom/PageInput"));
const MarkdownInput = dynamic(() =>
  import("../inputs/Markdown").then((m) => m.MarkdownInput)
);
const ImageInput = dynamic(() =>
  import("../inputs/ImageInput").then((m) => m.ImageInput)
);
const StringInput = dynamic(() =>
  import("../inputs/String").then((m) => m.StringInput)
);

// Design CRUD fields and layout
// This component stores the design state in it's own state
// if STORAGE_KEY is available, on every update of the state store the updated state
// to session storage with key of STORAGE_KEY

export const DesignCRUDForm = ({
  init = null,
  isDarkMode,
  getDesign,
  STORAGE_KEY = "",
}) => {
  //Design state : start
  const [design, setDesign] = useState(resetInitialState());

  // colorPalette state
  const [hex, setHex] = useState("");
  // typography
  const [family, setFamily] = useState("");
  const [desc, setDesc] = useState("");
  // external resources
  const [courtesy, setCourtesy] = useState("");
  const [poster, setPoster] = useState("");
  const [photographer, setPhotographer] = useState("");

  const [editIndices, setEditIndices] = useState({
    typography: NaN,
    colorPalette: NaN,
    externalResources: NaN,
  });
  // End of design state

  // hooks

  // initial render prefill the design data from session storage if exists
  useEffect(() => {
    if (!Boolean(STORAGE_KEY)) return;
    // get design data from session storage if exists

    // if init data is availble ie. EDIT mode return
    if (init) return;

    const sessionData = sessionStorage.getItem(STORAGE_KEY || "");
    if (!Boolean(sessionData)) return;

    setDesign(() => JSON.parse(sessionData));
    return;
    //   else update the session storage
  }, [init, STORAGE_KEY]);

  // override the session storage data with the updated design data
  useEffect(() => {
    if (!Boolean(STORAGE_KEY)) return;

    //   Check if every field of the state is empty
    //   Step 1: covert all design field values to truthy/falsy values
    const checkArr = Object.values(design).map((el) => {
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
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(design));
  }, [design, STORAGE_KEY]);

  // callbacks
  function handleSubmitDesign() {
    getDesign(design);
  }

  function resetInitialState() {
    return {
      title: init?.title || "",
      desc: init?.desc || "",
      category: init?.category || "",
      thumbnail: init?.thumbnail || "",
      caption: init?.caption || "",
      role: init?.role || "",
      typography: init?.typography || [],
      colorPalette: init?.colorPalette || [],
      userFlowSteps: init?.userFlowSteps || [],
      externalResources: init?.externalResources || [],
    };
  }

  function handleUpdate(key, value) {
    setDesign((prev) => ({ ...prev, [key]: value }));
  }

  function handleArrayUpdate({ parent, obj }) {
    if (isNaN(editIndices[parent])) {
      setDesign((prev) => ({
        ...prev,
        [parent]: [...prev[parent], obj],
      }));
    } else {
      setDesign((prev) => ({
        ...prev,
        [parent]: prev[parent].map((el, k) => {
          if (k === editIndices[parent]) {
            return obj;
          }
          return el;
        }),
      }));
    }
    setEditIndices((prev) => ({ ...prev, [parent]: NaN }));

    setHex("");
    setFamily("");
    setDesc("");
    setPhotographer("");
    setPoster("");
    setCourtesy("");
  }

  function getEditData(type, value, index) {
    setEditIndices((prev) => ({ ...prev, [type]: index }));
    switch (type) {
      case "colorPalette":
        setHex(value?.hex);
        return;
      case "typography":
        setFamily(value?.family);
        setDesc(value?.desc);
        return;
      case "externalResources":
        setPhotographer(value?.photographer);
        setCourtesy(value?.courtesy);
        setPoster(value?.poster);
        return;
    }
  }

  function deleteArrayItem(type, index) {
    if (!confirm("Confirm delete?")) return;
    setDesign((prev) => ({
      ...prev,
      [type]: prev[type]?.filter((_, k) => k !== index),
    }));
  }

  return (
    <section className="w-full my-6 flex flex-col items-stretch gap-6">
      {/* title field , caption field */}
      <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
        <StringInput
          name="title"
          value={design.title}
          setValue={(v) => handleUpdate("title", v)}
          placeholder="Design title"
          split={true}
        />
        <StringInput
          name="caption"
          value={design.caption}
          setValue={(v) => handleUpdate("caption", v)}
          placeholder="Design caption"
          split={true}
        />
      </section>

      {/* desc field , category field, thumbnail field, role field */}
      <section className="grid gap-4 w-full">
        <MarkdownInput
          name="desc"
          value={design.desc}
          setValue={(v) => handleUpdate("desc", v)}
          placeholder="Design desc"
        />
        <StringInput
          name="category"
          value={design.category}
          setValue={(v) => handleUpdate("category", v)}
          placeholder="Design category"
          split={true}
        />
        <ImageInput
          name="thumbnail"
          value={design.thumbnail}
          setValue={(v) => handleUpdate("thumbnail", v)}
          placeholder="Design thumbnail"
          isDarkMode={isDarkMode}
        />
        <MarkdownInput
          name="role"
          value={design.role}
          setValue={(v) => handleUpdate("role", v)}
          placeholder="Design role"
        />
      </section>

      {/* color field */}
      <ArrayInput
        parentState={design.colorPalette}
        currentState={{}}
        name="colorPalette"
        editIndex={editIndices.colorPalette}
        getEditData={(v, i) => getEditData("colorPalette", v, i)}
        deleteArrayItem={(i) => deleteArrayItem("colorPalette", i)}
      >
        <StringInput
          name="hex"
          value={hex}
          setValue={(v) => setHex(v)}
          placeholder="Color hex field starting with #"
          split={true}
        />
        {Boolean(hex.trim().length) && (
          <div className="-max mt-10">
            <CTA
              isDarkMode={isDarkMode}
              btnType="button"
              btnMode={true}
              cb={() =>
                handleArrayUpdate({
                  parent: "colorPalette",
                  obj: { hex },
                })
              }
              label={"Add color to palette"}
            />
          </div>
        )}
      </ArrayInput>

      {/* typography field */}
      <ArrayInput
        parentState={design.typography}
        currentState={{}}
        name="typography"
        editIndex={editIndices.typography}
        getEditData={(v, i) => getEditData("typography", v, i)}
        deleteArrayItem={(i) => deleteArrayItem("typography", i)}
      >
        <StringInput
          name="family"
          value={family}
          setValue={(v) => setFamily(v)}
          placeholder="Font family name"
          split={true}
        />
        <StringInput
          name="desc"
          value={desc}
          setValue={(v) => setDesc(v)}
          placeholder="Description about the font family used"
          split={true}
        />
        {Boolean(desc.trim().length * family.trim().length) && (
          <div className="-max mt-10">
            <CTA
              isDarkMode={isDarkMode}
              btnType="button"
              btnMode={true}
              cb={() =>
                handleArrayUpdate({
                  parent: "typography",
                  obj: { family, desc },
                })
              }
              label={"Add family to design"}
            />
          </div>
        )}
      </ArrayInput>

      <UserFlowInput
        isDarkMode={isDarkMode}
        parentState={design.userFlowSteps}
        setParentArray={(p) => handleUpdate("userFlowSteps", p)}
      />

      {/* external resources field */}
      <ArrayInput
        parentState={design?.externalResources}
        currentState={{}}
        name="External Resources"
        editIndex={editIndices.externalResources}
        getEditData={(v, i) => getEditData("externalResources", v, i)}
        deleteArrayItem={(i) => deleteArrayItem("externalResources", i)}
      >
        <ImageInput
          key={design?.externalResources?.length}
          value={poster}
          setValue={(p) => setPoster(p)}
          placeholder="Photo resource URL"
          name="Poster"
          isDarkMode={isDarkMode}
        />
        <StringInput
          name="photographer"
          value={photographer}
          setValue={(v) => setPhotographer(v)}
          placeholder="Photographer's name"
          split={true}
        />
        <StringInput
          name="courtesy"
          value={courtesy}
          setValue={(v) => setCourtesy(v)}
          placeholder="Photographer's social URL"
          split={true}
        />
        {Boolean(
          poster.trim().length * courtesy.trim().length &&
            photographer.trim().length
        ) && (
          <div className="-max mt-10">
            <CTA
              isDarkMode={isDarkMode}
              btnType="button"
              btnMode={true}
              cb={() =>
                handleArrayUpdate({
                  parent: "externalResources",
                  obj: { poster, courtesy, photographer },
                })
              }
              label={"Add family to design"}
            />
          </div>
        )}
      </ArrayInput>

      {/* CTA button to send the design data to parent component */}
      <div className="w-max mt-10">
        <CTA
          isDarkMode={isDarkMode}
          btnType="button"
          btnMode={true}
          cb={handleSubmitDesign}
          label={init ? "Save changes to design" : "Save design"}
        />
      </div>
    </section>
  );
};
