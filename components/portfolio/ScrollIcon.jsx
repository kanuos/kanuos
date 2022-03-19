import { CgArrowLongDown, CgArrowLongUp } from 'react-icons/cg'

export const ScrollIcon = ({text='scroll', down=true}) => {
    return (
      <p className="absolute bottom-4 flex flex-col items-center justify-center gap-2">
        {!down && <CgArrowLongUp className='text-lg animate-bounce' />}
        <span className='text-xs uppercase tracking-wide animate-pulse'>
            <small className='text-primary font-semibold'>
                {text}
            </small>
        </span>
        {down && <CgArrowLongDown className='text-lg animate-bounce' />}
      </p>
    )
  }
  