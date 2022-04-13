import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { SkillList } from "./SkillList";
import { MdOutlinePictureAsPdf, MdOutlineDownloading } from "react-icons/md";

const AboutMe = ({ skills, bio, techStack, about, isDarkMode }) => {
  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere maiores reiciendis nemo, dolor repudiandae et? Corporis natus, accusamus recusandae beatae, quae est, quam culpa reprehenderit in commodi tempora dolores quidem.`;

  const textArr = [
    {
      heading: "design",
      items: [
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
      ],
    },
    {
      heading: "UI/UX",
      items: [
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
      ],
    },
    {
      heading: "development",
      items: [
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
      ],
    },
    {
      heading: "databases",
      items: [
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
        {
          text: `Lorem ipsum dolor sit amet consectetur.`,
        },
      ],
    },
  ];

  return (
    <motion.section
      whileInView="show"
      initial="hide"
      className="h-auto min-h-screen relative snap-start w-full max-w-3xl mx-auto md:px-10"
    >
      <div className="w-11/12 mx-auto">
        <SectionHeader
          paddingBottom={false}
          shadow="let me introduce myself"
          heading="about sounak"
          content={`I love creating digital products that are beautiful, responsive, performant and secure!`}
        />
      </div>
      <div className="p-10 pb-0 flex flex-col items-stretch w-11/12 mx-auto justify-start gap-y-10 mt-10">
        <p className="w-full text-sm leading-tight">{about}</p>
        <p className="w-full text-sm leading-tight">{bio || text + text}</p>
      </div>

      <div className="flex flex-col-reverse items-stretch">
        <div className="flex flex-col items-stretch">
          <p className="px-10 text-sm font-semibold leading-tight w-11/12 mx-auto">
            {skills || text}
          </p>
          <ul className="flex flex-col items-stretch justify-start w-full my-10 max-w-lg mx-auto">
            {textArr.map((el, i) => (
              <SkillList
                heading={el.heading}
                list={el.items}
                key={i}
                isDarkMode={isDarkMode}
              />
            ))}
          </ul>
        </div>
        <div className="my-10 grid place-items-center">
          <motion.a
            className={
              "text-sm hover:opacity-100 hover:text-primary transition-all cursor-pointer border-y w-full max-w-lg ml-auto px-10 md:px-0 py-6 flex items-center justify-between marker:border-opacity-50 " +
              (isDarkMode ? "border-light" : "border-dark")
            }
          >
            <p className="flex items-center justify-start gap-x-2">
              <MdOutlinePictureAsPdf className="text-lg" />
              <small className="font-black uppercase">my resume</small>
            </p>
            <MdOutlineDownloading className="text-lg animate-bounce" />
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
