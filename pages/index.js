// Portfolio page

import { useState, useEffect, useContext } from 'react';

// import : internal
import { HeadComponent } from '../components/Head'
import { NavBar } from '../components/public/Nav';
import { LandingHeader } from '../components/public/LandingHeader';
import { getAllTags } from "../database/tags"
import axios from 'axios';
import { API_ROUTES } from '../utils/admin';
import { TagDetailList } from '../components/public/TagDetailList';
import { ThemeContext } from "../contexts/ThemeContext";
import { LoadSpinner } from '../components/public/Loader';
import { ThemeToggler } from '../components/public/ThemeToggler';

const STATUSES = {
  'initial' : 'initial',
  'loading' : 'loading',
  'complete' : 'complete',
}

const HomePage = ({allTags}) => {
  allTags = JSON.parse(allTags)
  const [selectedTag, setSelectedTag] = useState('');
  const [status, setStatus] = useState(STATUSES.initial);
  const [data, setData] = useState(null);

  const { isDarkMode } = useContext(ThemeContext)
  

  useEffect(async () => {
    if (!selectedTag) return;
    await getTagRelatedData(selectedTag)

  }, [selectedTag])



  async function getTagRelatedData(tag) {
    try {
      setStatus(STATUSES.loading)
      const {data, error} = (await axios({
        url : API_ROUTES.tags + "/" + tag,
        method : 'GET'
      })).data

      if (error) throw data;
      
      setData(data?.[0])
      setStatus(STATUSES.complete)
    } 
    catch (error) {
      setStatus(STATUSES.initial)
      console.log({error})
    }
    finally {
      setSelectedTag('')
    }
  }

  function handleInitialState() {
    setData(null)
    setSelectedTag('')
    setStatus(STATUSES.initial);
  }

  return (
    <>
    <HeadComponent title="Welcome to Sounak Mukherjee's website" />
    <NavBar />
    <ThemeToggler />
    <main className={"min-h-screen h-auto w-full relative p-10 " + (isDarkMode ? 'main-dark' : 'main-light')}>
      <div className="w-full">
        <LandingHeader />
        
        {
          (status === STATUSES.initial) && 
            <>
            <div className="flex flex-col items-start max-w-3xl mx-auto w-full">
              <h2 className=" font-semibold capitalize">
                tags 
              </h2>
              <p className="text-xs opacity-50">
                <small>
                  Total tags : {allTags.length}
                </small>
              </p>
            </div>
            <ul className='flex flex-wrap items-center my-10 justify-start gap-x-6 gap-y-3 max-w-3xl mx-auto w-full'>
            {allTags.map(tag => (
              <li key={tag._id} className="group">
                <button 
                  onClick={() => setSelectedTag(tag._id)} 
                  className="uppercase font-black text-sm tracking-wide hover:group-even:text-primary hover:group-odd:text-secondary transition-all">
                #{tag.tag}
                </button>
              </li>))}
            </ul>
            </>
        }
        
        {
          (status === STATUSES.loading && <LoadSpinner />)
        }
        
        { 
          status === STATUSES.complete && data && <TagDetailList {...data} close={handleInitialState} />
        }
      </div>
    </main>
    </>
  )
}

export default HomePage;


export async function getStaticProps() {
  try {
    const p1 = new Promise(res => res(getAllTags()));
    const [allTags] = await Promise.allSettled([p1])
    return {
      props : { allTags : JSON.stringify(allTags.value)},
      revalidate : 10
    }
  } 
  catch (error) {
    
  }
}