// Portfolio page
import { useContext } from 'react';

// import : internal
import { HeadComponent } from '../components/Head'
import { ContactMe } from '../components/portfolio/ContactMe';
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader';
import { SectionHeader } from '../components/portfolio/SectionHeader';
import { Showcase } from '../components/portfolio/Showcase';
import { Skills } from '../components/portfolio/Skills';
import { NavBar } from '../components/public/Nav';
import { ThemeToggler } from '../components/public/ThemeToggler';
import { ThemeContext } from '../contexts/ThemeContext';

const PortfolioPage = () => {
    const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
    <HeadComponent title='Sounak Mukherjee | Portfolio' />
    <NavBar type='portfolio' />
    <ThemeToggler />
    <main className={"min-h-screen scrollbar-none w-full overflow-hidden relative filter " + (isDarkMode ? 'nav-dark' : 'nav-light')}>
        <video 
            muted
            autoPlay
            loop
            playsInline={true}
            className='h-screen w-screen object-cover block pointer-events-none opacity-10 fixed inset-0 z-0'>
            <source src='/pf.webm' type='video/webm'/>
            <source src='/pf.mp4' type='video/mp4'/>
        </video>
        <div className="w-full selection:bg-secondary selection:text-dark">
            <PortfolioHeader miniBio={userData.miniBio} name={userData.name} />
            <section className="flex py-20 gap-20 min-h-screen w-full max-w-5xl mx-auto flex-col justify-center items-center lg:items-start lg:justify-start">
                <section className='w-full max-w-5xl mx-auto px-16'>
                    <SectionHeader
                        heading='About me' 
                        cls='lg:items-end lg:text-right'
                        content={<p className="grow whitespace-pre-line text-sm max-w-3xl">{userData.bio} <br/> {userData.skills}</p>}/>
                </section>
            
                <Skills isDarkMode={isDarkMode} techStack={userData.techStack} />
            </section>
            <Showcase portfolio={portfolio} isDarkMode={isDarkMode}/>
            <ContactMe isDarkMode={isDarkMode}/>   
            
        </div>
    </main>
    </>
  )
}

export default PortfolioPage;

const userData = {
    name : 'Sounak',
    miniBio : 'Full stack developer based in Ithaca, NY.',
    adminLabel : 'Full stack web developer',
    bio : `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam eius possimus ducimus, est deserunt ut soluta ad repellat voluptate atque! Excepturi necessitatibus id eveniet enim!

    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis nostrum asperiores velit maiores incidunt dignissimos itaque? Autem dolorem blanditiis ullam ratione modi quod veritatis sit. Placeat, sint laboriosam autem quisquam iste reprehenderit provident ratione, a inventore voluptatum rem sit dolor.`,
    skills : `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam eius possimus ducimus, est deserunt ut soluta ad repellat voluptate atque! Excepturi necessitatibus id eveniet enim! Placeat, sint laboriosam autem quisquam iste reprehenderit provident ratione, a inventore voluptatum rem sit dolor.`,
    techStack : [
        {
            heading : 'Design',
            items : [
                'Responsive web design',
                'Mobile first design',
                'Wireframing and prototyping'
            ]
        },
        {
            heading : 'UI-UX',
            items : [
                'HTML, CSS, SCSS, JavaScript ESNext',
                'React',
                'Vue',
                'Tailwind CSS, Bootstrap'
            ]
        },
        {
            heading : 'Dev',
            items : [
                'Express',
                'NextJS',
                'Django',
                'Django REST Framework',
            ]
        },
    ]

}

const portfolio = [
    {
        _id : 1,
        title : 'Moovey',
        tags : ['express', 'react', 'postgresql', 'omdb api', 'express', 'react', 'postgresql', 'omdb api', 'express', 'react', 'postgresql', 'omdb api'],
        thumbnail : 'https://images.unsplash.com/photo-1646886530010-a738828bbfa2',
        desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime facilis necessitatibus suscipit at quibusdam, illum quia ad molestias culpa itaque vitae, officiis similique, reiciendis laborum.'
    },
    {
        _id : 2,
        title : 'Pomodoro App',
        tags : ['express', 'react', 'mongodb'],
        thumbnail : 'https://images.unsplash.com/photo-1646864052090-071a579e1346',
        desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime facilis necessitatibus suscipit at quibusdam, illum quia ad molestias culpa itaque vitae, officiis similique, reiciendis laborum.'
    },
    {
        _id : 3,
        title : 'Migu Pizza',
        tags : ['express', 'react', 'mongodb'],
        thumbnail : 'https://images.unsplash.com/photo-1559183533-ee5f4826d3db',
        desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime facilis necessitatibus suscipit at quibusdam, illum quia ad molestias culpa itaque vitae, officiis similique, reiciendis laborum.'
    },
    {
        _id : 4,
        title : 'Lorem ipsum dolor sit amet.',   
        tags : ['express', 'react', 'mongodb'],
        thumbnail : 'https://images.unsplash.com/photo-1559183533-ee5f4826d3db',
        desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime facilis necessitatibus suscipit at quibusdam, illum quia ad molestias culpa itaque vitae, officiis similique, reiciendis laborum.'
    },
]