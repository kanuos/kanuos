import { SecondaryHeading } from "./SecondaryHeading"

export const Skills = ({isDarkMode, techStack=[]}) => {
  if (techStack.length === 0) {
    return <></>
  } 

  return (
    <section className={"grid place-items-center relative w-full lg:bg-transparent lg:flex lg:justify-center lg:mb-20 " + (isDarkMode ? 'bg-light text-dark lg:text-light' : 'bg-dark text-light lg:text-dark')}>
      <div className="flex flex-col items-start gap-16 justify-around w-full max-w-4xl mx-auto p-16 lg:p-4 lg:mx-0 lg:flex-row lg:justify-between lg:gap-0 lg:border-2 lg:border-dashed lg:border-primary lg:rounded-md">
        {techStack.map(({heading, items}, i) => (
          <div className="w-full max-w-lg lg:max-w-none lg:w-max flex flex-col items-start gap-y-6 lg:items-end" key={i}>
              <SecondaryHeading text={heading} alignLeft={true} />
              <ul className="flex flex-col gap-y-1 lg:items-end">
                {items.map((item, index) => (
                  <li key={index} className="whitespace-pre-line text-xs opacity-50 lg:opacity-90 font-semibold lg:text-right">
                    {item}
                  </li>
                ))}
              </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
