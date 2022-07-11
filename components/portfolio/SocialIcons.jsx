import {
  SiGithub,
  SiGitlab,
  SiLinkedin,
  SiTwitter,
  SiStackoverflow,
  SiInstagram,
  SiYoutube,
} from "react-icons/si";

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
    if (text.includes("stackoverflow")) {
      return <SiStackoverflow />;
    }
    if (text.includes("instagram")) {
      return <SiInstagram />;
    }
    if (text.includes("youtube")) {
      return <SiYoutube />;
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
