const PROFILE_CMS = [
  {
    name: "fullName",
    type: "string",
    placeholder: "ADMIN full name",
    split: true,
  },
  {
    name: "email",
    type: "string",
    placeholder: "ADMIN email",
    split: true,
  },
  {
    name: "about",
    type: "markdown",
    placeholder: "About admin",
    split: false,
  },
  {
    name: "adminLabel",
    type: "string",
    placeholder: "Admin label",
    split: false,
  },
  {
    name: "skills",
    type: "markdown",
    placeholder: "Admin skills",
    split: false,
  },
  {
    name: "techStack",
    type: "array",
    layout: [
      {
        name: "heading",
        type: "string",
        split: false,
        placeholder: "Tech stack heading",
      },
      {
        name: "text",
        type: "markdown",
        split: false,
        placeholder: "Tech stack description",
      },
    ],
  },
];

export default {
  PROFILE_CMS,
};
