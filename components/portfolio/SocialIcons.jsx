import { SiGithub, SiGitlab, SiLinkedin, SiTwitter } from "react-icons/si";

export const SocialIcons = ({ social, url }) => {
  function getIcon(text = "") {
    text = text.toLowerCase();
    if (text.includes("github")) {
      return <SiGithub />;
    }
    if (text.includes("gitlab")) {
      return <SiGitlab />;
    }
    if (text.includes("linked")) {
      return <SiLinkedin />;
    }
    if (text.includes("twitter")) {
      return <SiTwitter />;
    }
  }
  return (
    <a
      className="inline-flex"
      rel="noopener noreferrer"
      target="_blank"
      href={url}
    >
      {getIcon(social)}
    </a>
  );
};
