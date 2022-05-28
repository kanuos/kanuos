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
    type: "page",
  },
  {
    name: "repo",
    type: "object",
    layout: [
      {
        name: "label",
        type: "string",
        placeholder: `Repo label goes here`,
        split: true,
      },
      {
        name: "href",
        type: "string",
        placeholder: `Repo URL goes here`,
        split: true,
      },
    ],
  },
  {
    name: "demo",
    type: "object",
    layout: [
      {
        name: "label",
        type: "string",
        placeholder: `Repo label goes here`,
        split: true,
      },
      {
        name: "href",
        type: "string",
        placeholder: `Repo URL goes here`,
        split: true,
      },
    ],
  },
  {
    name: "outro",
    type: "object",
    layout: [
      {
        name: "heading",
        type: "string",
        placeholder: `Outro heading `,
        split: true,
      },
      {
        name: "href",
        type: "markdown",
        placeholder: `Outro text goes here`,
        split: true,
      },
    ],
  },
];

const DESIGN_CMS = [
  {
    name: "title",
    type: "string",
    placeholder: "Design title",
    split: true,
  },
  {
    name: "category",
    type: "string",
    placeholder: "Design category",
    split: true,
  },
  {
    name: "desc",
    type: "markdown",
    placeholder: "Design description",
    split: false,
  },
  {
    name: "role",
    type: "markdown",
    placeholder: "My role",
    split: false,
  },
  {
    name: "thumbnail",
    type: "image",
    placeholder: "Design thumbnail URL",
    split: false,
  },
  {
    name: "caption",
    type: "string",
    placeholder: "Design thumbnail caption",
    split: true,
  },
  {
    name: "colorPalette",
    type: "array",
    layout: [
      {
        name: "hex",
        type: "string",
        placeholder: "Hex color value beginning with #",
        split: true,
      },
    ],
  },
  {
    name: "typography",
    type: "array",
    layout: [
      {
        name: "family",
        type: "string",
        placeholder: "Font family name",
        split: true,
      },
      {
        name: "desc",
        type: "markdown",
        placeholder: "Font family description",
        split: false,
      },
    ],
  },
  {
    name: "userFlowSteps",
    type: "userFlow",
  },
  {
    name: "externalResources",
    type: "array",
    layout: [
      {
        name: "poster",
        type: "image",
        placeholder: `External image URL`,
        split: true,
      },
      {
        name: "photographer",
        type: "string",
        placeholder: `Photographer's name`,
        split: true,
      },
      {
        name: "courtsey",
        type: "string",
        placeholder: `Photographer's social URL`,
        split: true,
      },
    ],
  },
];

export default {
  PROFILE_CMS,
  ACCOUNT_CMS,
  TAG_CMS,
  blog: BLOG_CMS,
  design: DESIGN_CMS,
};
