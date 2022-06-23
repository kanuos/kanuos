// Portfolio page
import { useContext } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// import : internal
import { getPortfolio } from "../../../database/user";

// components, contexts and layouts
import { Tag } from "../../../components/public/Tag";
import GridContent from "../../../components/detail/GridContent";
import { PageLink } from "../../../components/portfolio/PageLink";
import PublicLayout from "../../../components/Layouts/PublicLayout";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { ContactMe } from "../../../components/portfolio/ContactMe";
import UserFlow from "../../../components/content/UserFlow";
import { Conclusion } from "../../../components/detail/Conclusion";
import { WorkThumb } from "../../../components/portfolio/WorkThumb";
import { PUBLIC_URLS, titleCase } from "../../../utils";

const PortfolioProjectDetailView = ({ data }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const {
    currentWork: { project, design, metadata },
    prev,
    next,
  } = JSON.parse(data);

  const aboutProject = `${metadata.metadata}.
  
  The tech-stack mostly comprises the following :
  ${project.techStack.map((el) => `\n- **${el.text}**`).join(" ")}`;

  if (!(Boolean(project) || Boolean(design) || Boolean(metadata))) {
    return <></>;
  }

  return (
    <PublicLayout
      metaTitle={`Sounak's work | ${titleCase(project.title)}`}
      content="Check out my full stack web developer portfolio website"
      navType="work"
    >
      <header className="p-8 lg:px-10 overflow-hidden flex flex-col items-stretch gap-y-4 w-full max-w-5xl mx-auto">
        <div className="w-max">
          <PageLink
            href={PUBLIC_URLS.portfolio.url}
            label="Back to portfolio"
          />
        </div>
        <h1 className={`heading--primary`}>{titleCase(project.title)}</h1>
        <p className="content--main">{titleCase(project.desc)}</p>

        {/* category */}
        <section className="my-1 flex flex-col items-start">
          <h3 className="heading--sub uppercase">
            <small>project type</small>
          </h3>
          <p className="content--sub">{titleCase(project.category)}</p>
        </section>

        {/* year */}
        <section className="my-1 flex flex-col items-start">
          <h3 className="heading--sub uppercase">
            <small>year</small>
          </h3>
          <p className="content--sub">{new Date(project.date).getFullYear()}</p>
        </section>

        {/* tags */}
        <section className="my-1 flex flex-col items-start gap-y-2">
          <h3 className="heading--sub uppercase">
            <small>tags</small>
          </h3>
          <ul className="flex flex-wrap gap-4 items-center justify-start">
            {[...new Set([...project.tags, ...design.tags])].map((tag) => (
              <li key={tag._id} className="w-max">
                <Tag tag={tag} />
              </li>
            ))}
          </ul>
        </section>
      </header>

      <figure className="relative h-auto w-full rounded-lg overflow-hidden p-8 lg:p-10 pb-20 lg:pb-32 after-line--center max-w-7xl mx-auto">
        <Image
          src={design.thumbnail}
          layout="responsive"
          height={"100%"}
          width={"100%"}
          alt={design.caption}
          className="h-full w-full object-cover block rounded-lg"
          loader={({ src, width }) => `${src}?w=${width}&q=100`}
          priority={true}
        />
      </figure>

      <GridContent heading="About project" text={aboutProject} />
      <div className="my-20">
        <UserFlow
          text={`${design.role}. There are a total of **${design.userFlowSteps.length}** distinct pages. A brief description about their individual functionalities are mentioned.
          `}
          heading="User Flow + Pages"
          steps={design.userFlowSteps}
        />
      </div>

      {[...Object.values(project.demo), ...Object.values(project.repo)].some(
        Boolean
      ) && <Conclusion repo={project.repo} demo={project.demo} />}

      {[prev, next].some(Boolean) && (
        <>
          <GridContent heading="Some of my other works" />

          <div className="w-full flex flex-col items-stretch max-w-5xl mx-auto gap-y-20 pb-20">
            {[prev, next].map((el, i) => (
              <WorkThumb
                key={i}
                isDarkMode={isDarkMode}
                project={el}
                i={i + 1}
                caption={i === 0 ? "Previous" : "Next"}
              />
            ))}
          </div>
        </>
      )}

      <ContactMe isDarkMode={isDarkMode} />
    </PublicLayout>
  );
};

export default PortfolioProjectDetailView;

export async function getStaticProps({ params: { slug } }) {
  try {
    const allWork = (await getPortfolio())?.portfolio.filter(
      (el) => el.isShowcased
    );
    const currentWorkIndex = allWork.findIndex(
      (el) => el.project.slug === slug
    );

    if (currentWorkIndex === -1) {
      throw "Not found";
    }

    const data = {
      currentWork: allWork[currentWorkIndex],
      prev: allWork[currentWorkIndex - 1],
      next: allWork[currentWorkIndex + 1],
    };

    return {
      props: { data: JSON.stringify(data) },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const allProjects = (await getPortfolio())?.portfolio
    ?.filter((el) => el.isShowcased)
    .map((el) => el.project.slug);
  const paths = allProjects.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
