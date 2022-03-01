// Create new content page
// import : internal
import axios from 'axios';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// import : external
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';

// import : internal components
import { JSONEditor, JSON_EDITOR_STATE } from '../../components/admin/JSONEditor';
import { SelectContentType } from '../../components/admin/SelectContentType';
import { TagSelector } from '../../components/admin/TagSelector';
import { BlogDetailBody } from '../../components/content/BlogDetailBody';
import { ProjectDetailBody } from '../../components/content/ProjectDetailBody';
import { HeadComponent } from '../../components/Head'
import { NavBar } from '../../components/public/Nav';
import { getAllTags } from '../../database/tags';
import { ADMIN_URLS } from '../../utils';

// import : internal 
import { API_ROUTES, CONTENT_TYPE } from '../../utils/admin';
import { ContentValidators } from "../../utils/validator"


const SESSION_NAME = `sounak_admin`;

const ContentCMS = ({allTags}) => {
  const router = useRouter();
  const [type, setType] = useState('');
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState({});
  
  function handleTag(tag) {
    const existingTag = tags.find(t => t._id === tag._id);
    if (existingTag) {
      setTags(prev => prev.filter(el => el._id !== tag._id))
    }
    else {
      setTags(prev => [...prev, tag])
    }
  }

  function handleSetContent(ctnt) {
    setContent({...ctnt, tags})
    setStep(3)
  }

  useEffect(() => {
    setContent(prev => ({...prev, isPublic}))
  }, [isPublic])

  useEffect(() => {
    const cms = getSessionStorageData();
    if (!cms) {
      sessionStorage.setItem(SESSION_NAME, JSON.stringify({type}))
      return
    } 

    if (cms.type !== type) {
      let temp = type.length > 0 ? type : cms.type;
      setType(temp)
      if (temp !== cms.type) {
        sessionStorage.removeItem(JSON_EDITOR_STATE)
      }
      sessionStorage.setItem(SESSION_NAME, JSON.stringify({...cms, type : temp}))
    }

  }, 
  [type])

  

  function getSessionStorageData() {
    return JSON.parse(sessionStorage.getItem(SESSION_NAME));
  }
  

  async function handleSubmitToServer() {
    try {
      // validate input                   :: joi
      const {error, value} = ContentValidators[type].validate(content);
      if (error) {
        throw error.details[0].message;
      }

      
      // submit data
      let URL = API_ROUTES[type + 's'];
      const {data, err} = (await axios({
        url : URL,
        method : 'POST',
        data : value
      })).data;


      if (err) {
        throw data;
      }


      // clear the session storage
      sessionStorage.removeItem(SESSION_NAME);
      sessionStorage.removeItem(JSON_EDITOR_STATE);
      // redirect to admin blog list
      router.push(ADMIN_URLS[type + 's'].url)

    } 
    catch (error) {
      alert(error)
    }
  }

  return (
    <>
    <HeadComponent title='Admin | Content CMS' />
    <NavBar type="admin" />
    <main className='h-full min-h-screen px-10 py-20 main-light text-dark'>
      
      {step === 0 && 
        <SelectContentType 
          type={type} 
          setType={setType} 
          next={() => setStep(1)} />}       
      
      {step === 1 && 
        <TagSelector 
          key={step}
          tag={tags} 
          allTags={JSON.parse(allTags)} 
          handleTag={handleTag} 
          prev={() => setStep(0)}
          next={() => setStep(2)} />}       
      
      {step === 2 && 
        <JSONEditor 
          key={step}
          tags={tags} 
          type={type} 
          getContent={handleSetContent}
          prev={() => setStep(1)} />}       
      
      {step === 3 && 
        <>
          <p className='text-center block font-light font-special text-xl border-b pb-1 mb-4'>
            Preview Mode
          </p>
          
          <button 
            onClick={() => setStep(2)}
            className="capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer group">
            <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                &larr; Prev 
            </span>
            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
          </button>

          {type === CONTENT_TYPE.blog.name && (
            <BlogDetailBody blog={content} adminMode={true} />
          )}
          {type === CONTENT_TYPE.project.name && (
            <ProjectDetailBody project={content} />
          )}

          <div className="border-t pt-1 flex flex-col items-center justify-center gap-6">
            <p className='text-center capitalize font-special text-xl'>
              access status
            </p>
            <label htmlFor="public" className='text-sm cursor-pointer group'>
                <p className='flex flex-col gap-2 items-center justify-center'>
                {isPublic ? 
                  <>
                    <IoLockOpenOutline className='text-3xl group-hover:animate-bounce inline-block'/>
                    <span className='text-xs font-semibold text-primary'>Public</span>
                  </>
                  : 
                  <>
                    <IoLockClosedOutline className='text-3xl group-hover:animate-bounce inline-block'/>
                    <span className='text-xs font-semibold text-primary'>Private</span>
                  </>
                }
                </p>
            </label>
            <input 
              type="checkbox" 
              checked={isPublic} 
              id="public"
              className='appearance-none'
              onChange={() => setIsPublic(prev => !prev)}/>

            <button 
              onClick={handleSubmitToServer}
              className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                    Submit {type} 
                </span>
                <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>

          </div>

        </>}
      

    </main>
    </>
  )
}

export default ContentCMS;

export async function getServerSideProps() {
  let allTags;
  try {
    allTags = await getAllTags();
  } 
  catch (error) {
    allTags = [];
  }
  finally {
    return {
      props : {
        allTags : JSON.stringify(allTags)
      }
    }
  }
}

const allTags = [
  'react', 'vue', 'express', 'django', 'nodejs', 'jwt', 'access token', 'refresh token',
  'python', 'golang', 'tailwind', 'bootstrap', 'material design', 'session', 'authorization',
].map((el, i) => ({_id: i, tag : el}))