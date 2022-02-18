import { useState } from "react"
import { IoCopyOutline } from "react-icons/io5"
import { motion } from 'framer-motion'

export const ContactEmail = () => {
    const EMAIL_ID = 'sounakmukherjee@ymail.com' 
    const [showEmail, setShowEmail] = useState(true);
    const [emailError, setEmailError] =  useState(false)

    async function handleCopyToClipboard(){
        try {
            await window.navigator.clipboard.writeText(EMAIL_ID)
            // TODO: check navigator.userAgent for device => manually paste for iOS and android
            setShowEmail(false)
        } 
        catch (error) {
            setShowEmail(true)
            console.log(error.message)
        }
    }

    const appearVariant = {
        show : {
            y : 0,
            display : 'flex',
            transition : {
                type : 'spring',
                stiffness : 400
            }
        },
        hide : {
            y : '-100%',
            display : 'none',
            transition : {
                type : 'spring'
            }
        }
    }

    return (
        <article className="w-full h-auto text-dark flex flex-col items-start mt-6">
            <h2 className="text-xs md:text-sm font-semibold text-primary mb-4">
                Connect via Email
            </h2>
            <p className="text-xs mb-8 w-full max-w-xl opacity-75">
                Please fill in your work email address for a duplex communication. Click the button below to open up your e-mailing tool. 
                <br />
                Your email address and the contents of your email are confidential.
            </p>
            
            <motion.div
                className="flex flex-col items-start w-full">
                <a 
                    href={`mailto:${EMAIL_ID}?subject=Let's work together`}
                    rel="no-referrer no-opener" 
                    referrerPolicy="no-referrer"
                    className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer select-none">
                        <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark">
                            Send Email
                        </span>
                        <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300">
                        </span>
                </a>
                <p className="text-xs mt-8 mb-4 w-full max-w-xl opacity-75">
                    {!emailError ? 
                    <>
                    If your email client doesn’t open up, click the <button onClick={() => setEmailError(prev => !prev)} className="font-semibold relative after:absolute after:w-0 after:h-px after:bg-primary after:left-0 after:bottom-0 after:origin-center hover:after:w-full after:transition-all after:duration-300 inline-block">here</button>
                    </> : 
                    <>
                    To close the copy modal click <button onClick={() => setEmailError(prev => !prev)} className="font-semibold relative after:absolute after:w-0 after:h-px after:bg-primary after:left-0 after:bottom-0 after:origin-center hover:after:w-full after:transition-all after:duration-300 inline-block">here</button>
                    </>}
                </p>
                {emailError && <div className="flex items-center justify-between text-xs p-2.5 bg-dark bg-opacity-10 rounded-md w-full max-w-lg">
                    <span className="select-text">
                        {EMAIL_ID}
                    </span>
                    <button onClick={handleCopyToClipboard} className={(showEmail ? 'text-primary' : 'text-dark') + " font-semibold"}>
                        {showEmail ? 'copy' : 'copied'}
                    </button>
                </div>}
            </motion.div>  
            
            

        </article>
    )
}
