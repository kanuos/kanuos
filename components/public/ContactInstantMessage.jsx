// imports : built in
import { useEffect, useMemo, useState } from "react"

// imports : external
import { motion } from "framer-motion"

// imports : internal
import { InputField } from "./InputField"
import { getEmptyState, MESSAGE_STEPS } from "../../utils"




export const ContactInstantMessage = () => { 
    const [currentStep, setCurrentStep] = useState(MESSAGE_STEPS[0].field)
    const [messageState, setMessageState] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    const getInitialState = useMemo(() => getEmptyState(MESSAGE_STEPS), [MESSAGE_STEPS])

    useEffect(() => {
        setMessageState(getInitialState)
    }, [])

    useEffect(() => {
        if (!messageState) return
        const values = Object.values(messageState)
        let index = values.findIndex(v => v.trim() === '')
        
        const permission = MESSAGE_STEPS.flatMap(({field, constraints}) => {
            return Object.values(constraints).map(({check}) => check(messageState[field]))
        }).every(Boolean)


        setCanSubmit(permission)
        console.log({permission, canSubmit})
        if (index !== -1){
            setCurrentStep(_ => MESSAGE_STEPS[index]?.field)
        }

    }, [messageState, canSubmit])

    function updateState(data){
        setMessageState(prev => ({...prev, ...data}))
    }

    const variant = {
        show : { x : 0, opacity : 1, transition : { type : 'spring', when: 'beforeChildren', staggerChildren: .25}},
        hide : { x : '-100%', opacity : 0, transition : { type : 'spring', when: 'afterChildren'}},
    }

    return (
        <article className="w-full h-auto text-dark flex flex-col items-start mt-6">
            <h2 className="text-xs md:text-sm font-semibold text-primary mb-4">
                Send a Message
            </h2>
            <p className="text-xs mb-8 w-full max-w-xl opacity-75">
                Fill in your details and I’ll get back to you ASAP. Start filling up the form now. It will just take a few minutes. 
            </p>
            <div className="flex flex-col items-start gap-y-10 w-full">
                {messageState && 
                    MESSAGE_STEPS.map(({field, desc, constraints}, i) => {
                        const active = (messageState[field].trim().length > 0 ||(field === currentStep));
                        return (
                            <motion.section 
                                key={field} 
                                variants={variant}
                                initial={'hide'}
                                animate={active ? 'show' : 'hide'}
                                className="w-full flex flex-col items-start gap-y-4 relative after:left-4 after:h-10 after:bg-secondary after:w-0.5 after:absolute after:-top-10 first-of-type:after:hidden">
                                {messageState[field].trim().length === 0 && 
                                    <p className="text-xs font-semibold py-1">
                                        {desc}
                                    </p>}
                                <motion.div 
                                    variants={variant}
                                    className="w-full">
                                    <InputField 
                                        name={field} 
                                        index = {i + 1}
                                        total = {MESSAGE_STEPS.length}
                                        setEditMode={setEditMode}
                                        value={messageState[field]} 
                                        constraints={constraints}
                                        getData={updateState}/>
                                </motion.div>
                            </motion.section>
                        )
                    }
                )}
                <motion.button
                    variants={variant}
                    animate={(canSubmit && !editMode) ? 'show' : 'hide'}
                    className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer select-none">
                        <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark">
                            Send Message
                        </span>
                        <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300">
                        </span>
                </motion.button>
                
            </div>

        </article>
    )
}
