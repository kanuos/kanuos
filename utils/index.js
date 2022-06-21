export const STEP_TYPE = {
  code: "code",
  markdown: "markdown",
  image: "image",
  heading: "heading",
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
    url: "/blogs/",
    base: "/blogs",
    type: "public",
  },
  projects: {
    name: "projects",
    url: "/projects/",
    base: "/projects",
    type: "public",
  },
  designs: {
    name: "designs",
    url: "/designs/",
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
    name: "main-website",
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

export function titleCase(str) {
  str = str.trim();
  if (!Boolean(str)) return str;

  let strArr = str.toLowerCase().split("");
  strArr[0] = strArr[0].toUpperCase();

  return strArr.join("");
}
