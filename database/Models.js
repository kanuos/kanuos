import { Schema } from "mongoose";

// Tag Schema for maintaining tags for references to other content models
export const TagSchema = new Schema({
  tag: {
    type: String,
    unique: true,
    required: true,
  },
});

// Blog Schema for CRUD operations of Blogs
export const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  desc: {
    type: String,
    required: true,
    maxlength: 200,
    trim: true,
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
  // start unique to blogs
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  page: [
    {
      type: Object,
    },
  ],
  // end unique to blogs
  category: {
    type: String,
    required: true,
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
    maxlength: 200,
    trim: true,
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
  // start unique to projects
  chapters: [
    {
      type: Object,
    },
  ],
  prerequisites: {
    type: String,
    required: true,
  },
  techStack: [
    {
      type: Object,
    },
  ],
  difficulty: {
    type: String,
    required: true,
  },
  // end unique to projects
  category: {
    type: String,
    required: true,
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
    maxlength: 200,
    trim: true,
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
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  role: {
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
