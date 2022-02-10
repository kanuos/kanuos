import { STEP_TYPE } from '../../utils'


export const Step = ({step}) => {
    const {type} = step;
    switch(type.toLowerCase()) {
        case STEP_TYPE.code:
            return <CodeStep code={step.code} file={step.filename} language={step.language} /> 

        case STEP_TYPE.quote:
            return <QuoteStep text={step.content} /> 
            
        case STEP_TYPE.subheading:
            return <SubHeadingStep text={step.content} /> 
            
        case STEP_TYPE.text:
            return <TextStep text={step.content} /> 

        default:
            return <></>
    }
}


const TextStep = ({text}) => {
    return (
        <p className='text-sm leading-relaxed whitespace-pre-line my-1'>{text}</p>
    )
}

const SubHeadingStep = ({text}) => {
    return (
        <h2 className='font-semibold w-full block my-4 text-sm capitalize'>{text}</h2>
    )
}

const QuoteStep = ({text}) => {
    return (
        <blockquote className='my-8 pl-4 italic text-sm opacity-75 border-l-4 border-dark'>{text}</blockquote>
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


// TODO: image step, code step, external-reference step