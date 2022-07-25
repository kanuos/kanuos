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
    maxlength: 60,
  },
  desc: {
    type: String,
    required: true,
    maxlength: 600,
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
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  // start unique to blogs
  page: [
    {
      type: Object,
    },
  ],
  // end unique to blogs
  category: {
    type: String,
    required: true,
    maxlength: 15,
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
    maxlength: 60,
  },
  desc: {
    type: String,
    required: true,
    maxlength: 600,
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
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  // start unique to projects
  chapters: [
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
  },
  // end unique to projects
  category: {
    type: String,
    required: true,
    maxlength: 15,
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
    maxlength: 60,
  },
  desc: {
    type: String,
    required: true,
    maxlength: 600,
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
    maxlength: 15,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
  fullName: {
    type: String,
    default: "Sounak Mukherjee",
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  location: {
    type: String,
    default: "Ithaca, NY",
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
  priority: {
    type: Number,
    default: 1,
    max: 3,
    min: 1,
  },
  metadata: {
    type: String,
    required: true,
  },
  role: {
    type: Array,
    required: true,
  },
  isShowcased: {
    type: Boolean,
    default: false,
  },
});
