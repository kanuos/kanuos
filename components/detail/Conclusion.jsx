import { PageLink } from "../portfolio/PageLink";
import { InfoGroup } from "../public/InfoGroup";
import { MarkdownStep } from "../public/PageStepComponent";

export const Conclusion = ({ heading, text, repo, demo }) => {
  return (
    <div className="w-full max-w-4xl mx-auto pt-8 pb-40">
      <div className="flex flex-col items-start px-8 md:pb-4 gap-y-2 md:gap-y-6">
        <h2 className="heading--main capitalize">{heading}</h2>
        <MarkdownStep text={text} />
      </div>
      {repo ||
        (demo && (
          <section className="px-8 max-w-4xl mx-auto">
            <InfoGroup
              items={[
                {
                  heading: "page links",
                  content: [
                    repo && Object.values(repo).every(Boolean) && (
                      <PageLink href={repo.href} label={repo.label} />
                    ),
                    demo && Object.values(demo).every(Boolean) && (
                      <PageLink href={demo.href} label={demo.label} />
                    ),
                  ],
                },
              ]}
            />
          </section>
        ))}
    </div>
  );
};
