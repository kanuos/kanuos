import { Schema } from "mongoose";
import conn from "./index";

// Tag Schema for maintaining tags for references to other content models
const TagSchema = new Schema({
  tag: {
    type: String,
    unique: true,
    required: true,
  },
});

// Note Schema for notes and future ideas plans
const NoteSchema = new Schema({
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
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
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
    ref : 'user'
  },
});

// Message schema for incoming client messages and admin management of the same
const MessageSchema = new Schema({
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
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index : true
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
  },
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
    ref : 'user'
  },
});

// Design Schema for CRUD operations of Designs
const DesignSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
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
    ref : 'user'
  },
});

// User Schema for admin
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true,
  },
});

const models = conn.models;

!models.tag && conn.model("tag", TagSchema);
!models.note && conn.model("note", NoteSchema);
!models.blog && conn.model("blog", BlogSchema);
!models.project && conn.model("project", ProjectSchema);
!models.message && conn.model("message", MessageSchema);
!models.design && conn.model("design", DesignSchema);
!models.user && conn.model("user", UserSchema);

export default conn;
