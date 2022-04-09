import { JoinLine } from "./DescHeader";
import { staticMetadata } from "../../utils/portfolio_static";

export const LandingHeader = () => {
  return (
    <header className="h-[50vh] flex items-center justify-center mb-20">
      <section className="flex flex-col items-start w-full max-w-3xl mx-auto gap-y-2">
        <div className="flex flex-col items-start gap-1 max-w-md">
          <h1 className="text-9xl md:-ml-2 leading-tight tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text selection:text-transparent selection:bg-transparent">
            Hi,
          </h1>
          <p className="text-sm">
            Welcome to &nbsp;
            <span className="font-semibold">
              {staticMetadata.name}&apos;s
            </span>{" "}
            website
          </p>
        </div>
        <JoinLine />
        <p className="text-sm md:text-base max-w-xl">
          I write technical blogs, coding solutions, analyze data structures and
          algorithms, create web/console/mobile etc based projects, UI/UX
          designs and much more!
        </p>
      </section>
    </header>
  );
};
