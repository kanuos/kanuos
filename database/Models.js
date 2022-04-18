import { Schema } from "mongoose";
import { ADMIN_SELECT_OPTIONS } from "../utils/admin";
// import conn from "./index";

// Tag Schema for maintaining tags for references to other content models
export const TagSchema = new Schema({
  tag: {
    type: String,
    unique: true,
    required: true,
  },
});

// Note Schema for notes and future ideas plans
export const NoteSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  feature: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

// Blog Schema for CRUD operations of Blogs
export const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
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
  isPublic: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// Message schema for incoming client messages and admin management of the same
export const MessageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Project Schema for CRUD operations of Projects
export const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  chapters: [
    {
      type: Object,
    },
  ],
  prerequisites: [
    {
      type: Object,
    },
  ],
  techStack: [
    {
      type: Object,
    },
  ],
  difficulty: {
    type: String,
    required: true,
    enum: [...Object.values(ADMIN_SELECT_OPTIONS.difficulty)],
  },
  category: {
    type: String,
    required: true,
    enum: [...Object.values(ADMIN_SELECT_OPTIONS.category)],
  },
  repo: {
    type: Object,
  },
  demo: {
    type: Object,
  },
  outro: {
    type: Object,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// Design Schema for CRUD operations of Designs
export const DesignSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  typography: [
    {
      type: Object,
    },
  ],
  colorPalette: [
    {
      type: Object,
    },
  ],
  userFlowSteps: [
    {
      type: Object,
    },
  ],
  tools: [
    {
      type: Object,
    },
  ],
  externalResources: [
    {
      type: Object,
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// User Schema for admin
export const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  adminLabel: {
    type: String,
  },
  skills: {
    type: String,
  },
  techStack: [
    {
      type: Object,
    },
  ],
  portfolio: [
    {
      type: Schema.Types.ObjectId,
      ref: "portfolio",
    },
  ],
});

// Portfolio project Schema
export const PortfolioSchema = new Schema({
  design: {
    type: Schema.Types.ObjectId,
    ref: "design",
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  screens: [
    {
      type: Object,
    },
  ],
  priority: {
    type: Number,
    default: 1,
    max: 3,
    min: 1,
  },
  role: {
    type: String,
    required: true,
  },
  uiux: [
    {
      type: Object,
    },
  ],
  dev: [
    {
      type: Object,
    },
  ],
  isShowcased: {
    type: Boolean,
    default: false,
  },
});

// const models = conn.models;

// !models.tag && conn.model("tag", TagSchema);
// !models.note && conn.model("note", NoteSchema);
// !models.blog && conn.model("blog", BlogSchema);
// !models.project && conn.model("project", ProjectSchema);
// !models.message && conn.model("message", MessageSchema);
// !models.design && conn.model("design", DesignSchema);
// !models.user && conn.model("user", UserSchema);
// !models.portfolio && conn.model("portfolio", PortfolioSchema);

// export default conn;
