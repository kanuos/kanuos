import React from 'react'

export const SecondaryHeading = ({text, alignLeft=true, navMode=false}) => {
  return (
    <div className={'flex flex-col gap-y-1 justify-start ' + (alignLeft ? 'items-start' : 'items-end')}>
        <span className="h-0.5 rounded-md w-6 bg-primary"></span>
        <strong className={'capitalize font-black ' + (navMode ? "text-xs md:text-sm" : "md:text-lg")}>
            {text}
        </strong>
    </div>
  )
}
