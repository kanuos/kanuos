import { useEffect, useState } from 'react';
import { IoFootsteps } from 'react-icons/io5';
import { FaQuoteLeft } from 'react-icons/fa';
import { STEP_TYPE } from '../../utils'

export const Step = ({step}) => {
    const {key, value} = step;
    switch(key.toLowerCase()) {
        case STEP_TYPE.code:
            return <CodeStep code={value.code} file={value.filename} language={value.language} /> 

        case STEP_TYPE.quote:
            return <QuoteStep text={value?.trim()} /> 
            
        case STEP_TYPE.subheading:
            return <SubHeadingStep text={value?.trim()} /> 
            
        case STEP_TYPE.text:
            return <TextStep text={value?.trim()} /> 

        case STEP_TYPE.image:
            return <ImageStep url={value?.trim()} />

        case STEP_TYPE.reference:
            // TODO: link item
            break
        default:
            return <></>
    }
}


const TextStep = ({text}) => {
    return (
        <p className='text-sm leading-relaxed break-words text-dark whitespace-pre-line my-2'>{text}</p>
    )
}

const SubHeadingStep = ({text}) => {
    return (
        <h2 className='font-semibold w-full break-words flex items-center justify-start gap-x-2 text-sm text-dark capitalize mt-10 mb-4'>
            <IoFootsteps /> 
            <span>
                {text}
            </span>
        </h2>
    )
}

const QuoteStep = ({text}) => {
    return (
        <article className='my-14'>
            <FaQuoteLeft className='text-2xl text-dark' />
            <blockquote className='p-4 break-words whitespace-pre-line font-semibold text-sm leading-relaxed tracking-wide bg-gradient-to-b from-primary to-dark via-purple-700 text-transparent bg-clip-text border-b'>{text}</blockquote>
        </article>
    )
}

const CodeStep = ({code, file, language}) => {
    return (
        <section>
            <span>
                {file}
            </span>
            <pre>
                {code}
            </pre>
        </section>
    )
}

const ImageStep =({url}) => {
    const [valid, setValid] = useState(false);
    
    useEffect(() => {
        setValid(isValidURL(url))
    }, [])
    
    function isValidURL(href) {
        try {
            new URL(href)
            return true;
        } 
        catch (error) {
            return false;
        }
    }

    if (!valid) return <></>

    return <img src={url} className="w-full h-auto block object-cover drop-shadow-2xl"/>
}

// TODO: code step, external-reference step