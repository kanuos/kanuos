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
    name: "location",
    type: "string",
    placeholder: "Current location",
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
        split: true,
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

const ACCOUNT_CMS = {
  account: [
    {
      name: "email",
      type: "string",
      placeholder: "ADMIN email ID",
      split: true,
    },
    {
      name: "password",
      type: "string",
      placeholder: "ADMIN password",
      split: true,
    },
  ],
  reset: [
    {
      name: "email",
      type: "string",
      placeholder: "ADMIN email ID",
      split: true,
    },
    {
      name: "password",
      type: "string",
      placeholder: "ADMIN password",
      split: true,
    },
    {
      name: "secret",
      type: "string",
      placeholder: "ADMIN secret code",
      split: true,
    },
  ],
};

const TAG_CMS = [
  {
    name: "tag",
    type: "string",
    placeholder: "Tag name eg. React",
    split: false,
  },
];

export default {
  PROFILE_CMS,
  ACCOUNT_CMS,
  TAG_CMS,
};
