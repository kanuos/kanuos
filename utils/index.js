import { AUTH_ROUTES } from "./admin";

export const STEP_TYPE = {
  code: "code",
  markdown: "markdown",
  image: "image",
  link: "link",
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/sounak",
  github: "https://www.github.com/kanuos",
  gitlab: "https://www.gitlab.com/kanuos",
  twitter: "https://www.twitter.com/kanuos",
};

export const PUBLIC_URLS = {
  home: {
    name: "home",
    url: "/",
    base: "/",
    type: "public",
  },
  blogs: {
    name: "blogs",
    url: "/blogs/page/1",
    base: "/blogs",
    type: "public",
  },
  projects: {
    name: "projects",
    url: "/projects/page/1",
    base: "/projects",
    type: "public",
  },
  designs: {
    name: "designs",
    url: "/designs/page/1",
    base: "/designs",
    type: "public",
  },
  portfolio: {
    name: "portfolio",
    url: "/portfolio",
    base: "/portfolio",
    type: "public",
  },
};

export const PUBLIC_NAVIGATION_URLS = {
  projects: "/projects",
  blogs: "/blogs",
  designs: "/designs",
};

const ADMIN_PATH = "/admin";
export const ADMIN_NEW_CONTENT = ADMIN_PATH + "/new-content";
export const ADMIN_ACCOUNT = ADMIN_PATH + "/";
export const ADMIN_RESET = ADMIN_PATH + "/password-reset";

export const ADMIN_URLS = {
  dashboard: {
    name: "dashboard",
    url: ADMIN_PATH + "/dashboard",
    base: ADMIN_PATH + "/dashboard",
    type: "admin",
  },
  projects: {
    name: "projects",
    url: ADMIN_PATH + "/projects",
    base: ADMIN_PATH + "/projects",
    type: "admin",
  },
  blogs: {
    name: "blogs",
    url: ADMIN_PATH + "/blogs",
    base: ADMIN_PATH + "/blogs",
    type: "admin",
  },
  designs: {
    name: "designs",
    url: ADMIN_PATH + "/designs",
    base: ADMIN_PATH + "/designs",
    type: "admin",
  },
  tags: {
    name: "tags",
    url: ADMIN_PATH + "/tags",
    base: ADMIN_PATH + "/tags",
    type: "admin",
  },
};

export const SOCIAL = {
  email: "sounakmukherjee@ymail.com",
  credential: "full stack developer",
  mailto: `mailto:sounakmukherjee@ymail.com?subject=Let's work together`,
};

export const PORTFOLIO_LINKS = {
  "about me": {
    name: "about-me",
    url: "/portfolio#about-me",
    base: "/portfolio#about-me",
    type: "portfolio",
  },
  "selected works": {
    name: "work",
    url: "/portfolio#work",
    base: "/portfolio#work",
    type: "portfolio",
  },
  "contact me": {
    name: "contact-me",
    url: "/portfolio#contact-me",
    base: "/portfolio#contact-me",
    type: "portfolio",
  },
  "my website": {
    name: "my-website",
    url: "/",
    base: "/",
    type: "public",
  },
};

export const NAV_METADATA = {
  public: PUBLIC_URLS,
  portfolio: PORTFOLIO_LINKS,
  admin: ADMIN_URLS,
};

export const PUBLIC_LIST_TYPES = {
  blogs: {
    title: "My Blogs",
    desc: `Here's a list of all my blogs, code solutions, programming solutions and concepts and more..`,
    type: "blogs",
  },
  projects: {
    title: "My Projects",
    desc: `Here's a list of all my front-end projects, CSS UI/UX recreations, static page creations, full stack projects, backend projects, API creation and lot more`,
    type: "projects",
  },
  designs: {
    title: "My Designs",
    desc: `Here's a list of all my UI/UX designs for landing pages, website designs, app designs, different products and more`,
    type: "designs",
  },
};

export function getEmptyState(steps) {
  const obj = {};
  steps.forEach(({ field }) => (obj[field] = ""));
  return obj;
}

export const LOGIN_STEPS = [
  {
    field: "email",
    desc: `Admin email ID`,
    constraints: {
      empty: {
        message: "Email must be non-empty",
        check(value) {
          return value.trim().length > 0;
        },
      },
      valid: {
        message: "Email must be valid",
        check(value) {
          let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(value);
        },
      },
    },
  },
  {
    field: "password",
    desc: `Admin password`,
    constraints: {
      empty: {
        message: "Password cannot be empty",
        check(value) {
          return value.trim().length > 0;
        },
      },
      min: {
        message: "Password must be at least 6 characters long",
        check(value) {
          return value.trim().length >= 6;
        },
      },
    },
  },
];

export const REGISTER_STEPS = [...LOGIN_STEPS];

export const RESET_PASSWORD_STEPS = [
  ...LOGIN_STEPS,
  {
    field: "secret",
    desc: `Admin secret`,
    constraints: {
      empty: {
        message: "secret cannot be empty",
        check(value) {
          return value.trim().length > 0;
        },
      },
      min: {
        message: "secret must be at least 6 characters long",
        check(value) {
          return value.trim().length >= 6;
        },
      },
    },
  },
];

export const MESSAGE_STEPS = [
  {
    field: "name",
    desc: `Let's start off with your name`,
    constraints: {
      empty: {
        message: "Your name must not be empty",
        check(value) {
          return value.trim().length > 0;
        },
      },
      min: {
        message: "Your name must have at least 2 characters",
        check(value) {
          return value.trim().length >= 2;
        },
      },
      alpha: {
        message:
          "Your name can only contain characters from the English alphabet",
        check(value) {
          const re = /^[a-zA-Z]+[\sa-zA-Z]*$/g;
          return re.test(value.trim());
        },
      },
    },
  },
  {
    field: "email",
    desc: `Your email ID where I can mail you`,
    constraints: {
      empty: {
        message: "Email must be non-empty",
        check(value) {
          return value.trim().length > 0;
        },
      },
      valid: {
        message: "Email must be valid",
        check(value) {
          let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(value);
        },
      },
    },
  },
  {
    field: "message",
    desc: `Please type in your message →`,
    constraints: {
      empty: {
        message: "Message body required",
        check(value) {
          return value.trim().length > 0;
        },
      },
      min: {
        message: "Maximum of 700 characters allowed",
        check(value) {
          const temp = value.trim();
          return temp.length < 700 && temp.length > 0;
        },
      },
      max: {
        message: "Message body must be at least 20 characters",
        check(value) {
          return value.trim().length > 20;
        },
      },
    },
  },
];

/**
 *
 * @param {string} str string with spaces viz blog title, project title etc
 * @returns a url safe string
 */
export function formatURLParamString(str) {
  return str.trim().split(" ").join("+");
}

/**
 *
 * @param {string} str string with plus viz blog title, project title etc
 * @returns a db title string
 */
export function deFormatURLParamString(str) {
  return str.split("+").join(" ");
}

export function isValidURL(href) {
  try {
    new URL(href);
    return true;
  } catch (error) {
    return false;
  }
}

export function generateDetailViewMetadata(
  title,
  tags,
  category,
  type = "project"
) {
  if (type === "project") {
    return `Check out the walk-through for ${category} "${title}" which uses ${tags}`;
  }
  if (type === "blog") {
    return `Check out the ${category} "${title}" that puts light on ${tags}`;
  }
  if (type === "design") {
    return `Check out how I ${type}ed "${title}" using ${category} to implement technologies - ${tags}`;
  }
  return "";
}

export const ITEMS_PER_PAGE = {
  blog: 15,
  project: 15,
  design: 45,
};
