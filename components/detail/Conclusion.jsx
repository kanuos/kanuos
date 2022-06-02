import { PageLink } from "../portfolio/PageLink";

export const Conclusion = ({ heading, text, repo, demo }) => {
  return (
    <section className="section-wrapper pb-20 md:grid md:grid-cols-4 gap-x-6 max-w-4xl mx-auto">
      <h2 className="heading--sub uppercase mb-4 md:col-start-1 md:col-end-2">
        {heading}
      </h2>
      <div className="flex flex-col items-start gap-2 md:col-start-2 md:col-end-5">
        <p className="content--secondary text-justify">{text}</p>
        <div className="flex flex-col items-start gap-y-4 pt-6 my-10">
          {repo && Object.values(repo).every((el) => Boolean(el.trim())) && (
            <PageLink label={repo.label} href={repo.href} />
          )}
          {demo && Object.values(demo).every((el) => Boolean(el.trim())) && (
            <PageLink label={demo.label} href={demo.href} />
          )}
        </div>
      </div>
    </section>
  );
};
