import { SiGithub, SiGitlab, SiLinkedin, SiTwitter } from 'react-icons/si'
import { SOCIAL_LINKS } from "../../utils"


export const SocialLinks = () => {
    return (
        <ul className='flex items-center justify-center gap-2.5'>
            {Object.entries(SOCIAL_LINKS).map(([label, url], i) => {
                if (label === 'github') {
                    return <SiGithub key={i} />
                }
                if (label === 'gitlab') {
                    return <SiGitlab key={i} />
                }
                if (label === 'twitter') {
                    return <SiTwitter key={i} />
                }
                if (label === 'linkedin') {
                    return <SiLinkedin key={i} />
                }
            })}        
        </ul>
    )
}
