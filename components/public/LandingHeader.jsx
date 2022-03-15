import React from 'react'
import { JoinLine } from './DescHeader'

export const LandingHeader = () => {
  return (
    <header className='h-[50vh] flex items-center justify-center'>
        <section className="flex flex-col items-start w-full max-w-3xl mx-auto gap-y-2">
            <h1 className='font-special text-5xl md:text-7xl max-w-md leading-tight tracking-tight capitalize font-black'>
                Sounak Mukherjee
            </h1>
            <JoinLine />
            <p className="text-sm md:text-base">
                Welcome to my website. Here I write technical blogs, coding solutions, analyze data structures and algorithms, create web/console/mobile etc based projects, UI/UX designs and much more!
            </p>
        </section>
    </header>
  )
}
