/**
 *
 * @param {string} type content type. can be anything [blog, project, design]
 * @param {id} id Mongoose ObjectID as param
 * @returns admin edit content url for respective type and id
 */
export const ADMIN_EDIT_URL = (type, id) =>
  `/admin/edit-content/${type}?id=${id}`;

export const API_ROUTES = {
  tags: "/api/tags",
  blogs: `/api/blogs`,
  projects: `/api/projects`,
  designs: `/api/designs`,
  profile: `/api/profile`,
  portfolio: `/api/profile/portfolio`,
};

export const AUTH_ROUTES = {
  register: `/api/auth/register`,
  login: `/api/auth/login`,
  logout: `/api/auth/logout`,
  reset: `/api/auth/reset`,
};

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;

export const COOKIE_OPTIONS = {
  maxAge: COOKIE_MAX_AGE,
  httpOnly: true,
  sameSite: "strict",
  path: "/",
};

export const JWT_COOKIE_NAME = "sounak";

export const CONTENT_TYPE = {
  blog: {
    name: "blog",
  },
  project: {
    name: "project",
  },
  design: {
    name: "design",
  },
};
