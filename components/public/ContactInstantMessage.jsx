// imports : built in
import { useEffect, useMemo, useState } from "react"

// imports : external
import { motion } from "framer-motion"

// imports : internal
import { InputField } from "./InputField"
import { LoadSpinner } from './Loader'
import { getEmptyState, MESSAGE_STEPS } from "../../utils"
import { SectionHeader } from "../portfolio/SectionHeader"
import axios from "axios"
import { MessageValidator } from "../../utils/validator"
import { JoinLine } from "./DescHeader"
import { API_ROUTES } from "../../utils/admin"




export const ContactInstantMessage = ({close}) => { 
    const [currentStep, setCurrentStep] = useState(MESSAGE_STEPS[0].field)
    const [messageState, setMessageState] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    let timer = 5;
    const [countdown, setCountdown] = useState(timer);
    
    const getInitialState = useMemo(() => getEmptyState(MESSAGE_STEPS), [MESSAGE_STEPS])

    useEffect(() => {
        setMessageState(getInitialState)
    }, [getInitialState])

    useEffect(() => {
        if (!messageState) return
        const values = Object.values(messageState)
        let index = values.findIndex(v => v.trim() === '')
        
        const permission = MESSAGE_STEPS.flatMap(({field, constraints}) => {
            return Object.values(constraints).map(({check}) => check(messageState[field]))
        }).every(Boolean)
        

        setCanSubmit(permission)
        if (index !== -1){
            setCurrentStep(_ => MESSAGE_STEPS[index]?.field)
        }

    }, [messageState, canSubmit])

    useEffect(() => {
        if (!success) return;
        let t = setInterval(() => {
            if (timer === 1) {
                close();
                clearInterval(t)
            }
            --timer;
            setCountdown(timer);
        }, 1000)

        return () => clearInterval(t)

    }, [success])

    function updateState(data){
        setMessageState(prev => ({...prev, ...data}))
    }

    async function handleSubmitRequest() {
        try {
            setIsLoading(true);

            const {error, value} = MessageValidator.validate(messageState);
            if (error) {
                throw error.details[0].message;
            }
            const data = (await axios({
                method : 'POST',
                url : API_ROUTES.messages,
                data : value
            })).data;
            
            if (data.error) throw data.data;

            setSuccess(true);
        } 
        catch (error) {
            setErrMsg(error);
        }
        finally {
            setIsLoading(false);
        }
    } 

    useEffect(() => {
        if (errMsg.trim().length === 0) return;
        let t = setTimeout(() => setErrMsg(''), 3000);

        return () => clearTimeout(t)

    }, [errMsg])


    const variant = {
        show : { x : 0, opacity : 1, transition : { type : 'spring', when: 'beforeChildren', staggerChildren: .25}},
        hide : { x : '-100%', opacity : 0, transition : { type : 'spring', when: 'afterChildren'}},
    }

    if (success) {
        return (
        <article className="h-[75vh] w-full flex flex-col items-center justify-center gap-2">
            <strong className="font-semibold text-2xl filter drop-shadow-xl text-center">
                Message sent successfully.
            </strong>
            <JoinLine />
            <p>
                Modal closing in <motion.strong 
                    key={timer.toString()} 
                    animate={{scale : 1, transition : { type : 'spring'}}}
                    initial ={{ scale : 0}}
                    className="font-semibold text-primary">{countdown}s</motion.strong>.
            </p>
        </article>
        )
    }
    
    if (isLoading) {
        return (
        <article className="h-[75vh] w-full grid place-items-center">
            <LoadSpinner text="Sending message" />
        </article>
        )
    }

    return (
        <motion.article variants={variant} className="w-full h-auto flex flex-col items-start mt-6 max-w-3xl mx-auto">
            
            <SectionHeader heading="Send an instant message"/>
            {Boolean(errMsg.trim()) ? 
                <motion.p animate={{scaleY: 1, transition : { type : 'spring'}}} initial= {{scaleY : 0}} className="text-xs mb-8 w-full max-w-xl font-semibold text-primary">
                    {errMsg}. Try again :)
                </motion.p>
                :
                <motion.p animate={{scaleY: 1, transition : { type : 'spring'}}} initial= {{scaleY : 0}} className="text-xs mb-8 w-full max-w-xl font-semibold opacity-75">
                    Fill in your details and I’ll get back to you ASAP. Start filling up the form now. It will just take a few minutes. 
                </motion.p>
            }
            <div className="flex flex-col items-start gap-y-10 w-full ">
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
                    onClick={handleSubmitRequest}
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

        </motion.article>
    )
}
