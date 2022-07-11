import { PageLink } from "../portfolio/PageLink";

export const Conclusion = ({ heading, text, repo, demo }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 pb-40">
      <div className="flex flex-col items-start mb-10 gap-y-2 md:gap-y-6">
        <h2 className="heading--main capitalize">{heading}</h2>
        <p className="content--secondary text-justify">{text}</p>
      </div>
      <div>
        {repo && Object.values(repo).every(Boolean) && (
          <>
            <strong className="heading--sub font-bold uppercase">
              {repo.label}
            </strong>
            <div className="w-max">
              <PageLink isExternal={true} href={repo.href} label={repo.href} />
            </div>
          </>
        )}
        {demo && Object.values(demo).every(Boolean) && (
          <>
            <strong className="heading--sub font-bold uppercase">
              {demo.label}
            </strong>
            <div className="w-max">
              <PageLink isExternal={true} href={demo.href} label={demo.href} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
