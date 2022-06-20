import Markdown from "react-markdown";

export const Conclusion = ({ heading, text, repo, demo }) => {
  return (
    <>
      <section className="section-wrapper pb-20 md:grid md:grid-cols-4 gap-x-6 max-w-5xl mx-auto">
        <h2 className="heading--sub uppercase mb-4 md:col-start-1 md:col-end-2">
          {heading}
        </h2>
        <div className="flex flex-col items-start gap-2 md:col-start-2 md:col-end-5 markdown-editor-wrapper text-justify">
          <Markdown>{text}</Markdown>
        </div>
      </section>
      {repo && Object.values(repo).every(Boolean) && (
        <section className="section-wrapper pb-20 md:grid md:grid-cols-4 gap-x-6 max-w-5xl mx-auto">
          <h2 className="heading--sub uppercase mb-4 md:col-start-1 md:col-end-2">
            {repo.label}
          </h2>
          <div className="flex flex-col items-start gap-2 md:col-start-2 md:col-end-5 markdown-editor-wrapper text-justify">
            <a rel="noreferrer noopener" target="_blank" href={repo.href}>
              {repo.href}
            </a>
          </div>
        </section>
      )}
      {demo && Object.values(demo).every(Boolean) && (
        <section className="section-wrapper pb-20 md:grid md:grid-cols-4 gap-x-6 max-w-5xl mx-auto">
          <h2 className="heading--sub uppercase mb-4 md:col-start-1 md:col-end-2">
            {demo.label}
          </h2>
          <div className="flex flex-col items-start gap-2 md:col-start-2 md:col-end-5 markdown-editor-wrapper text-justify">
            <a rel="noreferrer noopener" target="_blank" href={demo.href}>
              {demo.href}
            </a>
          </div>
        </section>
      )}
    </>
  );
};
