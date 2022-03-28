import Image from "next/image";
import { motion } from "framer-motion";
import { JoinLine } from "../public/DescHeader";

const PortfolioProjectDetail = ({
  isDarkMode = false,
  project,
  close,
  prev,
  next,
  selectProject,
}) => {
  {
    // console.log(project);
  }

  const variants = {
    wrapper: {
      hide: {
        scale: 0,
        opacity: 0,
        y: "100vh",
        transition: { when: "afterChildren", type: "spring" },
      },
      show: {
        scale: 1,
        opacity: 1,
        y: 0,
        origin: "bottom",
        transition: {
          delayChildren: 0.5,
          when: "beforeChildren",
          type: "spring",
        },
      },
    },
    content: {
      hide: {
        scale: 0,
        opacity: 0,
        transition: { when: "afterChildren", type: "spring" },
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.5,
          type: "tween",
        },
      },
    },
    block: {
      hide: {
        scaleY: 0,
        opacity: 0.5,
        transition: { when: "afterChildren", type: "spring" },
      },
      show: {
        scaleY: 1,
        opacity: 1,
        transition: {
          staggerChildren: 0.25,
          type: "tween",
          when: "beforeChildren",
        },
      },
    },
    blockOpacity: {
      hide: {
        scaleY: 0,
        rotate: 5,
        opacity: 0.5,
        transition: { when: "afterChildren", type: "spring" },
      },
      show: {
        scaleY: 1,
        rotate: 0,
        opacity: 0.5,
        transition: {
          staggerChildren: 0.25,
          type: "tween",
          when: "beforeChildren",
        },
      },
    },
  };

  return (
    <motion.article
      variants={variants.wrapper}
      initial="hide"
      animate="show"
      exit="hide"
      className={`z-50 w-full h-screen fixed overflow-y-auto overflow-x-hidden top-0 left-0 scrollbar-none ${
        isDarkMode ? "main-dark" : "main-light"
      }`}
    >
      {/* content */}
      <motion.div
        variants={variants.content}
        className="w-full min-h-screen h-auto max-w-5xl mx-auto"
      >
        <motion.button
          variants={variants.block}
          onClick={close}
          whileHover={{
            rotate: 90,
            transition: { type: "spring", stiffness: 400 },
          }}
          className="sticky ml-auto block top-4 w-max z-50 text-5xl hover:text-primary origin-center"
        >
          &times;
        </motion.button>

        <motion.header
          whileInView="show"
          exit="hide"
          variants={variants.block}
          viewport={{ once: true }}
          className="gap-y-2 p-12 pt-28 grid grid-cols-1 md:grid-cols-6 gap-x-4"
        >
          <motion.h2
            variants={variants.block}
            viewport={{ once: true }}
            className={`font-black z-10 text-2xl md:text-4xl lg:text-7xl w-min md:col-start-1 md:col-end-3 md:row-start-2 md:mt-16 md:pr-2 filter drop-shadow-xl h-auto break-words max-w-sm ${
              isDarkMode ? "text-light" : "text-dark"
            }`}
          >
            {project.title}
          </motion.h2>
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            className="md:row-start-3 h-full"
          >
            <JoinLine />
          </motion.div>
          <motion.p
            variants={variants.blockOpacity}
            viewport={{ once: true }}
            className="text-xs md:text-sm italic opacity-75 md:row-start-4 md:col-span-full md:max-w-lg h-full"
          >
            {project.desc}
          </motion.p>
          <motion.figure
            variants={variants.block}
            viewport={{ once: true }}
            className="relative h-[50vh] w-11/12 ml-auto hidden md:block md:col-start-3 md:col-end-7 md:row-start-1 md:row-end-3 md:rounded-md md:shadow-xl md:overflow-hidden filter brightness-75"
          >
            <Image
              loader={({ src, width }) => `${src}?w=${width}&q=100`}
              src={project.design.thumbnail}
              alt={project.title + "'s thumbnail"}
              priority
              objectFit="cover"
              layout="fill"
            />
          </motion.figure>
        </motion.header>

        <motion.figure
          whileInView="show"
          variants={variants.block}
          viewport={{ once: true }}
          className="relative h-[45vh] w-full block md:hidden"
        >
          <Image
            loader={({ src, width }) => `${src}?w=${width}&q=100`}
            src={project.design.thumbnail}
            priority
            alt={project.title + "'s thumbnail"}
            objectFit="cover"
            layout="fill"
          />
        </motion.figure>

        <motion.section
          whileInView="show"
          exit="hide"
          variants={variants.block}
          viewport={{ once: true }}
          className="flex flex-col w-full items-start gap-y-20 p-12 md:grid"
        >
          {/* tags */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            whileInView="show"
            initial="hide"
            className="flex flex-col gap-y-6 w-11/12 mr-auto"
          >
            <PortfolioProjectSubHeading text="tech stack" />
            <motion.ul
              variants={variants.block}
              viewport={{ once: true }}
              className="flex flex-wrap gap-x-4 gap-y-2"
            >
              {Array.isArray(project.tags) &&
                [...new Set(project.tags)].map((tag) => (
                  <motion.li
                    variants={variants.blockOpacity}
                    viewport={{ once: true }}
                    key={tag}
                    className="text-xs md:text-sm uppercase"
                  >
                    <small className="font-semibold opacity-75">{tag}</small>
                  </motion.li>
                ))}
            </motion.ul>
          </motion.div>

          {/* project category */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            className="flex flex-col gap-y-6 w-11/12 mr-auto"
          >
            <PortfolioProjectSubHeading text="category" />
            <motion.p
              variants={variants.blockOpacity}
              viewport={{ once: true }}
              className="text-xs md:text-sm font-semibold opacity-75"
            >
              Full stack web app
            </motion.p>
          </motion.div>

          {/* my role */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            className="flex flex-col gap-y-6 w-11/12 mr-auto"
          >
            <PortfolioProjectSubHeading text="my role" />
            <motion.p
              variants={variants.blockOpacity}
              viewport={{ once: true }}
              className="text-xs md:text-sm font-semibold opacity-75 md:max-w-lg"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur quisquam eius vitae!
            </motion.p>
          </motion.div>

          {/* typography */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            whileInView="show"
            initial="hide"
            className="flex flex-col gap-y-6 w-11/12 ml-auto"
          >
            <PortfolioProjectSubHeading text="typography" />
            <motion.ul
              variants={variants.block}
              viewport={{ once: true }}
              className="flex flex-col items-start gap-y-4"
            >
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  montserrat
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  raleway
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* colors */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            whileInView="show"
            initial="hide"
            className="flex flex-col gap-y-6 w-11/12 ml-auto"
          >
            <PortfolioProjectSubHeading text="colors" />
            <motion.ul
              variants={variants.block}
              viewport={{ once: true }}
              className="flex flex-col justify-start items-start gap-4"
            >
              {["#FF6600", "#45cae9", "#3f8ac3", "#178d6a"].map((color) => (
                <motion.li
                  variants={variants.block}
                  viewport={{ once: true }}
                  key={color}
                  className="flex items-center justify-start gap-4 group"
                >
                  <motion.span
                    variants={variants.block}
                    viewport={{ once: true }}
                    className="w-8 h-8 inline-block rounded-md shadow-xl group-hover:group-even:rotate-12 group-hover:group-odd:-rotate-12 transition-all"
                    style={{ backgroundColor: color }}
                  ></motion.span>
                  <motion.small
                    variants={variants.blockOpacity}
                    viewport={{ once: true }}
                    className="text-xs md:text-sm uppercase font-semibold opacity-75 group-hover:opacity-90"
                  >
                    {color}
                  </motion.small>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* uiux */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            whileInView="show"
            initial="hide"
            className="flex flex-col gap-y-6 w-11/12 ml-auto"
          >
            <PortfolioProjectSubHeading text="UI-UX" />
            <motion.ul
              variants={variants.block}
              viewport={{ once: true }}
              className="flex flex-col items-start gap-y-4"
            >
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  react
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  tailwind css
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  server side rendering
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* dev */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            whileInView="show"
            initial="hide"
            className="flex flex-col gap-y-6 w-11/12 ml-auto"
          >
            <PortfolioProjectSubHeading text="development" />
            <motion.ul
              variants={variants.block}
              viewport={{ once: true }}
              className="flex flex-col items-start gap-y-4"
            >
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  server
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  database
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  auth
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50 md:max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur quisquam eius vitae!
                </motion.p>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* dev */}
          <motion.div
            variants={variants.block}
            viewport={{ once: true }}
            whileInView="show"
            initial="hide"
            className="flex flex-col gap-y-6 w-11/12 mr-auto"
          >
            <PortfolioProjectSubHeading text="links" />
            <motion.ul
              variants={variants.block}
              viewport={{ once: true }}
              className="flex flex-col items-start gap-y-4"
            >
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  live demo
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50"
                >
                  Lorem ipsum
                </motion.p>
              </motion.li>
              <motion.li
                variants={variants.block}
                viewport={{ once: true }}
                className="flex flex-col gap-y-1 items-start"
              >
                <motion.strong
                  variants={variants.block}
                  viewport={{ once: true }}
                  className="capitalize font-semibold text-sm md:text-base opacity-90"
                >
                  code repository
                </motion.strong>
                <motion.p
                  variants={variants.blockOpacity}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm font-semibold opacity-50"
                >
                  Lorem ipsum
                </motion.p>
              </motion.li>
            </motion.ul>
          </motion.div>

          <div className="my-16 w-11/12 mx-auto flex flex-col gap-y-10">
            {prev && (
              <PageNavigator
                title={prev.title}
                next={false}
                selectProject={selectProject}
                _id={prev._id}
              />
            )}

            {next && (
              <PageNavigator
                title={next.title}
                next={true}
                selectProject={selectProject}
                _id={next._id}
              />
            )}
          </div>
        </motion.section>
      </motion.div>
    </motion.article>
  );
};

export default PortfolioProjectDetail;

const PortfolioProjectSubHeading = ({ text }) => {
  return (
    <strong className="font-black capitalize block text-primary">{text}</strong>
  );
};

const PageNavigator = ({ title, _id, next = true, selectProject }) => {
  return (
    <div
      className={`relative group flex flex-col ${
        next ? "items-end ml-auto" : "items-start mr-auto"
      } w-max`}
    >
      <p className="text-xs md:text-sm text-primary font-semibold opacity-50 group-hover:opacity-100 transition-all">
        {next && <small>Next &rarr;</small>}

        {!next && <small>&larr; Previous</small>}
      </p>
      <button
        onClick={() => selectProject({ _id })}
        className={
          "font-black text-4xl w-min max-w-xs opacity-50 hover:opacity-100 scale-y-90 origin-top hover:scale-y-100 break-words transition-all " +
          (next ? "text-right" : "text-left")
        }
      >
        {title}
      </button>
    </div>
  );
};
