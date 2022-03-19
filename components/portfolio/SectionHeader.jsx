import React from 'react'
import { JoinLine } from '../public/DescHeader'

export const SectionHeader = ({heading, content, cls=''}) => {
  return (
    <article className={`flex flex-col ${cls}`}>
        <h2 className='text-4xl font-black lg:text-5xl capitalize w-min'>
            {heading}
        </h2>
        <JoinLine />
        {content}
    </article>
  )
}
