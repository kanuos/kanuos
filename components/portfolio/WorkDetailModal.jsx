import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const InfoGroup = dynamic(() =>
  import("../public/InfoGroup").then((m) => m.InfoGroup)
);
const CloseBtn = dynamic(() =>
  import("../public/CloseBtn").then((m) => m.CloseBtn)
);
const DetailHeader = dynamic(() =>
  import("../detail/Header").then((m) => m.DetailHeader)
);
const PageLink = dynamic(() => import("./PageLink").then((m) => m.PageLink));
const UserFlow = dynamic(() =>
  import("../content/UserFlow").then((m) => m.UserFlow)
);
const Screens = dynamic(() =>
  import("../content/UserFlow").then((m) => m.Screens)
);
const MarkdownStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.MarkdownStep)
);

const variants = {
  modal: {
    initial: {
      y: "100vh",
      opacity: 0,
      scale: 0,
      borderRadius: "50%",
    },
    animate: {
      y: "0vh",
      opacity: 1,
      scale: 1,
      borderRadius: "0%",
      transition: {
        type: "spring",
        ease: "easeIn",
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0.5,
      borderRadius: "50%",
      transition: {
        type: "spring",
        duration: 1.5,
      },
    },
  },
  child: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        type: "linear",
        ease: "easeIn",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        type: "linear",
      },
    },
  },
  text: {
    initial: {
      opacity: 0.5,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "linear",
        duration: 1,
      },
    },
    exit: {
      opacity: 0.5,
      scale: 0.5,
      transition: {
        type: "linear",
      },
    },
  },
};

export const WorkDetailModal = ({
  isDarkMode,
  handleSelectProject,
  work,
  allProjects = [],
}) => {
  const { project, design } = work;

  const caption = (
    <small className="font-bold">
      {(allProjects.findIndex((el) => el._id === work._id) + 1)
        .toString()
        .padStart(2, "0")}
      &nbsp;&mdash;&nbsp;
      {allProjects.length.toString().padStart(2, "0")}
    </small>
  );

  const hasPageLinks = [
    ...Object.values(project.repo),
    ...Object.values(project.demo),
  ].some(Boolean);

  return (
    <motion.section
      variants={variants.modal}
      initial="initial"
      exit="exit"
      animate="animate"
      className={`fixed inset-0 z-50 h-screen w-screen drop-shadow-2xl ${
        isDarkMode ? "nav-dark" : "nav-light"
      }`}
    >
      <motion.div
        variants={variants.child}
        className="fixed top-2 right-2 z-20"
      >
        <CloseBtn
          cb={() => handleSelectProject(null)}
          isOpen={true}
          isDarkMode={isDarkMode}
        />
      </motion.div>
      <motion.section
        variants={variants.child}
        className="absolute inset-0 z-10 h-auto min-h-screen w-full overflow-y-auto scrollbar-none pt-10"
      >
        <DetailHeader
          caption={caption}
          title={project.title}
          thumbnail={design.thumbnail}
          figcaption={design.caption}
          items={[
            {
              heading: "role",
              content: ["web design", "UI-UX development", "API development"],
            },
            {
              heading: "category",
              content: project.category,
            },
            {
              heading: "year",
              content: new Date(project.date).getUTCFullYear(),
            },
          ]}
        />
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={variants.text}
          className="w-full px-8 max-w-4xl mx-auto my-20"
        >
          <MarkdownStep text={work.metadata} firstLetter={true} />
        </motion.div>
        <AnimatePresence>
          {design.userFlowSteps.length > 1 && (
            <motion.section
              initial="initial"
              whileInView="animate"
              variants={variants.child}
              className="pt-16"
            >
              <motion.h2 className="heading--main text-center">
                User Flow
              </motion.h2>
              <div className="max-w-4xl mx-auto px-8">
                <UserFlow
                  steps={design.userFlowSteps}
                  isDarkMode={isDarkMode}
                />
              </div>
              <Screens steps={design.userFlowSteps} isDarkMode={isDarkMode} />
            </motion.section>
          )}
        </AnimatePresence>
        <motion.section
          variants={variants.child}
          whileInView="animate"
          className="px-8 py-16 max-w-4xl mx-auto"
        >
          <InfoGroup
            items={[
              {
                heading: "UI-UX",
                content: design.tags.map((el) => el.tag),
              },
              {
                heading: "Development",
                content: project.tags.map((el) => el.tag),
              },
              hasPageLinks && {
                heading: "page links",
                content: [
                  Object.values(project.repo).every(Boolean) && (
                    <PageLink
                      href={project.repo.href}
                      label={project.repo.label}
                    />
                  ),
                  Object.values(project.demo).every(Boolean) && (
                    <PageLink
                      href={project.demo.href}
                      label={project.demo.label}
                    />
                  ),
                ],
              },
            ]}
          />
        </motion.section>
      </motion.section>
    </motion.section>
  );
};
