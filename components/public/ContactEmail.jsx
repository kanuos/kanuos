import { PORTFOLIO_LINKS, SOCIAL } from "../../utils"
import { SectionHeader } from "../portfolio/SectionHeader"
import { IoMailOutline } from 'react-icons/io5'

export const ContactEmail = ({isDarkMode}) => {
    
    return (
        <article id={PORTFOLIO_LINKS["contact me"].url} className="w-full h-auto flex flex-col items-start mt-6">
            <SectionHeader heading="Connect with me"/>
            <h4 className="text-xs md:text-sm font-semibold text-primary mb-4">
                Connect via Email
            </h4>
            <p className="text-xs mb-4 w-full max-w-xl font-semibold">
                Please fill in your work email address for a duplex communication. Click the button below to open up your e-mailing tool. 
            </p>
            <p className="text-xs mb-8 w-full max-w-xl font-semibold">
                Your email address and the contents of your email are confidential.
            </p>
            <a
                href={SOCIAL.mailto}
                className="my-2 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer select-none"
            >
                <div className={"py-1.5 px-6 z-10 peer flex items-center gap-1 transition-all hover:shadow-xl border-2 border-current font-semibold " + (!isDarkMode ? 'text-dark hover:text-light hover:border-dark' : 'text-light hover:text-dark hover:border-light')}>
                <IoMailOutline/>
                send email 
                </div>
                <span className={"py-1.5 px-6 block transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300 " + (isDarkMode ? 'bg-light' : 'bg-dark')}></span>
            </a>

        </article>
    )
}
