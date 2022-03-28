import Image from "next/image";
import { staticMetadata } from "../../utils/portfolio_static";
import { JoinLine } from "./DescHeader";
import { AnchorStep } from "../public/PageStepComponent";

export const Footer = () => {
  return (
    <footer className="min-h-[50vh] w-full main-dark z-10 px-10 py-14 mt-auto md:py-16">
      <section className="w-max mx-auto flex flex-col items-start md:items-center justify-center gap-2">
        <div className="bg-light rounded-full w-16 h-16 md:w-12 md:h-12 filter drop-shadow-xl flex items-center justify-center overflow-hidden">
          <figure className="relative block rounded-full w-[3.5rem] h-[3.5rem] md:w-11 md:h-11">
            <Image
              layout="fill"
              src="/android-chrome-384x384.png"
              className="w-[3.5rem] h-[3.5rem] md:w-11 md:h-11 object-cover rounded-full block bg-secondary"
              objectFit="cover"
            />
          </figure>
        </div>
        <div className="flex flex-col items-start justify-center md:items-center">
          <h4 className="font-thin text-xl">{staticMetadata.fullName}</h4>
          <p className="text-xs capitalize opacity-50">
            <small>{staticMetadata.adminLabel}</small>
          </p>
        </div>
        <JoinLine />
        <p className="text-xs text-left max-w-sm italic pb-6 border-b border-secondary md:text-center break-words">
          <small>{staticMetadata.about}</small>
        </p>
        <div className="flex flex-col items-start md:items-center">
          <span className="text-xs mt-6 mb-2">Follow me on</span>
          <ul className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-xs">
            {Object.entries(staticMetadata.social).map(([k, v]) => (
              <li key={k} className="text-xs">
                <AnchorStep label={k} href={v} icon="" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
};
