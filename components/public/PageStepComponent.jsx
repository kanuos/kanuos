import { useEffect, useState } from 'react';
import { IoFootsteps, IoLinkOutline } from 'react-icons/io5';
import { FaQuoteLeft } from 'react-icons/fa';
import { isValidURL, STEP_TYPE } from '../../utils'
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import "prismjs/components/prism-python"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-django"


export const Step = ({step}) => {
    const {key, value} = step;
    switch(key.toLowerCase()) {
        case STEP_TYPE.code:
            return <CodeStep code={value.code} file={value.file} language={value.language} /> 

        case STEP_TYPE.quote:
            return <QuoteStep text={value?.trim()} /> 
            
        case STEP_TYPE.subheading:
            return <SubHeadingStep text={value?.trim()} /> 
            
        case STEP_TYPE.text:
            return <TextStep text={value?.trim()} /> 

        case STEP_TYPE.image:
            return <ImageStep url={value?.trim()} />

        case STEP_TYPE.link:
            return <AnchorStep href={value?.href} label={value?.label} />
            
        default:
            return <></>
    }
}


const TextStep = ({text}) => {
    return (
        <p className='text-sm leading-relaxed opacity-75 break-words whitespace-pre-line my-2'>{text}</p>
    )
}

const SubHeadingStep = ({text}) => {
    return (
        <h2 className='font-semibold w-full break-words flex items-center justify-start gap-x-2 text-sm capitalize mt-10 mb-4'>
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
            <FaQuoteLeft className='text-2xl' />
            <blockquote className='p-4 break-words whitespace-pre-line font-semibold text-sm leading-relaxed tracking-wide bg-gradient-to-b from-primary to-dark via-purple-700 text-transparent bg-clip-text border-b'>{text}</blockquote>
        </article>
    )
}

const CodeStep = ({code, file, language}) => {
    useEffect(() => {
        highlightAll()
    }, [])
    return (
        <section className='flex flex-col items-stretch my-6'>
            {Boolean(file) && <span className='opacity-50 block'>
                Filename : {file}
            </span>}
            <pre className='scrollbar-thin rounded-md whitespace-pre-line'>
                <code className={` language-${language} `}>{code.trim()}</code>
            </pre>
        </section>
    )
}

const ImageStep =({url}) => {
    const [valid, setValid] = useState(false);
    
    useEffect(() => {
        setValid(isValidURL(url))
    }, [])
    
    

    if (!valid) return <></>

    return <img src={url} className="w-full h-auto block object-cover drop-shadow-2xl"/>
}

const AnchorStep = ({label, href}) => {
    
    if (!isValidURL(href)) {
        return <></>
    }

    return (
        <p className='text-sm leading-relaxed flex gap-x-2 items-center group w-max'>
            <IoLinkOutline className='group-hover:text-secondary transition-all'/>
            <a href={href} className='border-b-2 border-secondary group-hover:border-primary inline group-hover:opacity-100 opacity-75 group-hover:italic break-words transition-all'>{label} </a>
        </p>
    )
}
