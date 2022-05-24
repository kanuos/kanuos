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

const ACCOUNT_CMS = {
  account: [
    {
      name: "email",
      type: "string",
      placeholder: "ADMIN email ID",
      split: false,
    },
    {
      name: "password",
      type: "string",
      placeholder: "ADMIN password",
      split: false,
    },
  ],
  reset: [
    {
      name: "email",
      type: "string",
      placeholder: "ADMIN email ID",
      split: false,
    },
    {
      name: "password",
      type: "string",
      placeholder: "ADMIN password",
      split: false,
    },
    {
      name: "secret",
      type: "string",
      placeholder: "ADMIN secret code",
      split: false,
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

const BLOG_CMS = [
  {
    name: "title",
    type: "string",
    placeholder: "Blog title",
    split: true,
  },
  {
    name: "slug",
    type: "string",
    placeholder: "Blog slug",
    split: true,
  },
  {
    name: "desc",
    type: "markdown",
    placeholder: "Blog description",
    split: false,
  },
  {
    name: "category",
    type: "string",
    placeholder: "Blog category",
    split: true,
  },
  {
    name: "page",
    type: "array",
    layout: [
      {
        name: "key",
        type: "select",
        split: true,
        options: ["string", "markdown", "code", "image"],
      },
    ],
  },
];

export default {
  PROFILE_CMS,
  ACCOUNT_CMS,
  TAG_CMS,
};

/*
  page: [
    {
      type: Object,
    },
  ],
  repo: {
    type: Object,
  },
  demo: {
    type: Object,
  },
  outro: {
    type: Object,
  },

  ----------------------------------------------------------------


  key: Joi.string().trim().required(),
  value: [
    // text, markdown
    Joi.string().trim().required(),
    // image url
    Joi.string().trim().uri().required(),
    // code block
    Joi.object({
      code: Joi.string().required(),
      language: Joi.string().trim().lowercase().required(),
      file: Joi.string().trim().required(),
    }),

 */
