// BLOG LIST PAGE

// import : built in
import { useState } from 'react';

// import : internal
import { HeadComponent } from '../../components/Head'
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { JoinLine } from '../../components/public/DescHeader';
import { ContactEmail } from '../../components/public/ContactEmail';
import { ContactInstantMessage } from '../../components/public/ContactInstantMessage';

const TABS = [
    {
        label : 'email'
    },
    {
        label : 'instant message'
    },
]


const ContactPage = () => {
    const [activeTab, setActiveTab] = useState(TABS[0].label);
    return (
        <>
        <HeadComponent title="Sounak Mukherjee's Blogs" />
        <NavBar />
        <div className='main-light h-full w-full min-h-screen'>
            <div className='px-8 py-16 md:px-10 md:py-16 max-w-3xl mx-auto select-text text-dark selection:bg-black selection:text-light flex flex-col items-start gap-y-2'>
                <h1 className="font-special text-3xl md:text-4xl">
                    Have a project idea in mind?
                </h1>
                <JoinLine />
                <p className="text-xs md:text-sm leading-relaxed max-w-xl mb-6">
                    For front-end UI/UX designing and development, full stack web development feel free to contact me. I will get back to you ASAP!  
                </p>
                <ul 
                    className="flex items-center justify-start gap-x-4">
                    {TABS.map(({label}) => (
                        <li 
                            onClick={() => setActiveTab(_ => label)}
                            key={label} 
                            className={(activeTab === label ? 'opacity-100 border-current' : 'opacity-50 border-transparent hover:opacity-75') + " text-dark font-semibold capitalize text-sm border-b-2 cursor-pointer transition-all"}>
                            <small>
                                {label}
                            </small>
                        </li>
                    ))}
                </ul>

                {activeTab === TABS[0].label &&<ContactEmail />}
                {activeTab === TABS[1].label &&<ContactInstantMessage />}

            </div>
        </div>
        </>
    )
}



export default ContactPage;


