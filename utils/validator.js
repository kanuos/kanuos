import Joi from "joi";

export const TagValidator = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  tag: Joi.string().trim().required(),
});

const LinkValidator = Joi.object({
  label: Joi.string().trim().required(),
  href: Joi.string().trim().uri().required(),
});

const StepValidator = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  key: Joi.string()
    .trim()
    .required()
    .valid("image", "markdown", "code", "heading"),
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
  ],
});

const CommonFields = Joi.object().keys({
  _id: Joi.any(),
  __v: Joi.any(),
  title: Joi.string().required().trim().min(1).max(60),
  desc: Joi.string().required().trim().min(1).max(200),
  category: Joi.string().required().trim().min(1).max(15),
  date: Joi.date().allow("").default(Date.now()),
  tags: Joi.array().items(TagValidator).min(1).required(),
  isPublic: Joi.bool().default(false),
  user: Joi.any(),
});

const BlogProjectCommon = CommonFields.keys({
  repo: LinkValidator.keys(),
  demo: LinkValidator.keys(),
  outro: Joi.object({
    heading: Joi.string().trim().required(),
    text: Joi.string().trim().required(),
  }).required(),
});

const BlogValidator = BlogProjectCommon.keys({
  slug: Joi.string().required().trim().min(1).lowercase(),
  page: Joi.array().items(StepValidator).min(1).required(),
});

const ProjectValidator = BlogProjectCommon.keys({
  techStack: Joi.array()
    .items(
      Joi.object({
        _id: Joi.any(),
        __v: Joi.any(),
        text: Joi.string().trim().required(),
      }).required()
    )
    .min(1)
    .required(),
  difficulty: Joi.string().trim().lowercase().required().default("beginner"),
  prerequisites: Joi.string().trim().required(),
  chapters: Joi.array()
    .items(
      Joi.object({
        heading: Joi.string().trim().required(),
        steps: Joi.array().items(StepValidator).min(1).required(),
        index: Joi.any(),
      })
    )
    .min(1)
    .required(),
});

const DesignValidator = CommonFields.keys({
  thumbnail: Joi.string().required().trim().uri(),
  caption: Joi.string().required().trim(),
  role: Joi.string().required().trim(),
  typography: Joi.array()
    .required()
    .items(
      Joi.object({
        _id: Joi.any(),
        __v: Joi.any(),
        family: Joi.string().trim().required(),
        desc: Joi.string().trim().required(),
      }).required()
    )
    .min(1),

  colorPalette: Joi.array()
    .required()
    .items(
      Joi.object({
        _id: Joi.any(),
        __v: Joi.any(),
        hex: Joi.string()
          .trim()
          .required()
          .uppercase()
          .pattern(/^#[ABCDEF0-9]{6}$/),
      }).required()
    )
    .min(1),

  userFlowSteps: Joi.array()
    .items(
      Joi.object({
        _id: Joi.any(),
        __v: Joi.any(),
        images: Joi.array().items(Joi.string().trim().uri().required()),
        title: Joi.string().trim().required(),
        about: Joi.string().trim().required(),
      }).required()
    )
    .required()
    .min(1),

  externalResources: Joi.array()
    .required()
    .items(
      Joi.object({
        _id: Joi.any(),
        __v: Joi.any(),
        poster: Joi.string().trim().uri().required(),
        photographer: Joi.string().trim().required(),
        courtsey: Joi.string().trim().uri().required(),
      }).required()
    )
    .min(1),
});

const LoginValidator = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
  password: Joi.string().trim().required().min(6),
});

const RegisterValidator = LoginValidator.keys();

const ResetValidator = LoginValidator.keys({
  secret: Joi.string().trim().required(),
});

export const PortfolioProjectValidator = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  design: Joi.any(),
  user: Joi.any(),
  project: Joi.any(),
  metadata: Joi.string().trim().required(),
  priority: Joi.number().max(3).min(1).default(1),
  isShowcased: Joi.bool().default(false),
});

export const UserProfileValidator = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
  fullName: Joi.string().required().trim(),
  about: Joi.string().required().trim(),
  adminLabel: Joi.string().required().trim(),
  skills: Joi.string().required().trim(),
  portfolio: Joi.array().items(PortfolioProjectValidator),
  techStack: Joi.array()
    .required()
    .items(
      Joi.object({
        _id: Joi.any(),
        __v: Joi.any(),
        heading: Joi.string().trim().required(),
        text: Joi.string().required().trim(),
      })
    ),
});

export const ContentValidators = {
  blog: BlogValidator,
  project: ProjectValidator,
  design: DesignValidator,
};

export const AuthValidators = {
  login: LoginValidator,
  register: RegisterValidator,
  reset: ResetValidator,
};
