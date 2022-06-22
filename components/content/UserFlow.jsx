import { motion } from "framer-motion";
import Markdown from "react-markdown";
import GridContent from "../detail/GridContent";
import Image from "next/image";

const UserFlow = ({ text, heading, steps = [] }) => {
  return (
    <div className="relative">
      <GridContent text={text} heading={heading} />

      <ul className="w-full gap-y-10 flex flex-col py-6">
        {steps.map(({ images = [], about, title }, i) => (
          <motion.li
            key={i}
            className="section-wrapper md:grid md:grid-cols-4 gap-6 max-w-5xl w-full mx-auto"
          >
            <h2 className="heading--sub uppercase md:col-start-1 md:col-end-2 md:sticky md:top-10 block">
              {title}
            </h2>
            <div className="markdown-editor-wrapper text-justify md:col-start-2 md:col-end-5">
              <Markdown>{about}</Markdown>
            </div>

            <section
              className={`block w-full md:col-start-2 md:col-end-5 h-full`}
            >
              {images?.map((img, k) => (
                <figure key={k} className="relative h-auto">
                  <Image
                    layout="responsive"
                    height={"10%"}
                    width={"100%"}
                    priority={true}
                    alt={`${title} image #${k + 1}`}
                    src={img}
                    loader={({ src, width }) => `${src}?w=${width}&q=100`}
                    className="userflow-img"
                  />
                </figure>
              ))}
            </section>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default UserFlow;
