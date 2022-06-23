import { PageLink } from "../portfolio/PageLink";
import GridContent from "./GridContent";
import { BiCodeAlt, BiGitBranch } from "react-icons/bi";

export const Conclusion = ({ heading, text, repo, demo }) => {
  return (
    <>
      <GridContent text={text} heading={heading} />
      <div className="section-wrapper pb-20 md:grid md:grid-cols-4 gap-x-6 max-w-5xl mx-auto -mt-4">
        {repo && Object.values(repo).every(Boolean) && (
          <section className="flex flex-col gap-y-2 md:col-start-2 md:col-end-5">
            <div className="flex items-center justify-start gap-1">
              <BiGitBranch className=" text-xs" />
              <h2 className="heading--sub uppercase">
                <small>{repo.label}</small>
              </h2>
            </div>
            <div className="w-max pl-4">
              <PageLink isExternal={true} href={repo.href} label={repo.href} />
            </div>
          </section>
        )}
        {demo && Object.values(demo).every(Boolean) && (
          <section className="flex flex-col gap-y-2 md:col-start-2 md:col-end-5">
            <div className="flex items-center justify-start gap-1">
              <BiCodeAlt className=" text-xs" />
              <h2 className="heading--sub uppercase">
                <small>{demo.label}</small>
              </h2>
            </div>
            <div className="w-max pl-4">
              <PageLink isExternal={true} href={demo.href} label={demo.href} />
            </div>
          </section>
        )}
      </div>
    </>
  );
};
