import Markdown from "react-markdown";

const GridContent = ({ heading, text }) => {
  return (
    <section className="section-wrapper md:grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-10">
      <h2 className="heading--main uppercase md:col-start-1 md:col-end-2 mb-4">
        {heading}
      </h2>
      <div
        className={`markdown-editor-wrapper md:col-start-2 md:col-end-5 text-justify md:mt-28`}
      >
        <Markdown>{text}</Markdown>
      </div>
    </section>
  );
};

export default GridContent;
