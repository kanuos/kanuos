// Edit existing content page
// import : internal
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// import : external
import { IoLockClosedOutline, IoLockOpenOutline, IoPencilOutline, IoRemoveCircle, IoReturnDownBackOutline } from 'react-icons/io5';

// import : internal components
import { JSONEditor, JSON_EDITOR_STATE } from '../../../components/admin/JSONEditor';
import { TagSelector } from '../../../components/admin/TagSelector';
import { BlogDetailBody } from '../../../components/content/BlogDetailBody';
import { ProjectDetailBody } from '../../../components/content/ProjectDetailBody';
import { HeadComponent } from '../../../components/Head'
import { NavBar } from '../../../components/public/Nav';

// import : internal 
import { getIndividualProject } from "../../../database/projects"
import { getIndividualBlog } from '../../../database/blogs';
import { getAllTags } from '../../../database/tags';
import { ADMIN_URLS } from '../../../utils';
import { API_ROUTES, CONTENT_TYPE } from '../../../utils/admin';
import { ContentValidators } from "../../../utils/validator"


const SESSION_NAME = `sounak_admin`;





const EditCMS = ({allTags, data, contentType}) => {
  const [type, setType] = useState('');
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState({});
  const router = useRouter();
  
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
    setContent(ctnt)
    setStep(3)
  }

  useEffect(() => {
    setContent(prev => ({...prev, isPublic}))
  }, [isPublic])

  useEffect(() => {
    const parsedData = JSON.parse(data)
    setType(contentType);
    setContent(parsedData);
    setTags(parsedData.tags);
    setIsPublic(parsedData.isPublic)
  }, [])

  useEffect(() => {
    setContent(prev => ({...prev, tags}))
  }, [tags])


  async function handleSubmitToServer() {
    try {
      // validate input                   :: joi
      const {error, value} = ContentValidators[type].validate(content);
      if (error) {
        throw error.details[0].message;
      }

      let url = API_ROUTES[type + 's'] + `/${value._id}`

      
      // submit data
      const {data, err} = (await axios({
        url,
        method : 'PATCH',
        data : value
      })).data;


      if (err) {
        throw data;
      }

      alert("updated successfully!");

      // clear the session storage
      sessionStorage.removeItem(SESSION_NAME);
      sessionStorage.removeItem(JSON_EDITOR_STATE);
      
      router.push(ADMIN_URLS[type + 's'].url)
    } 
    catch (error) {
      alert(error)
    }
  }


  async function handleDeleteBlog() {
    try {
      const permissionToDelete = confirm(`Confirm delete operation of ${type} ${content._id} :: "${content.title}"?`);
      
      if (!permissionToDelete) return;

      const url = API_ROUTES[type + 's'] + `/${content._id}`

      const {err, data} = (await axios({
        url ,
        method : 'DELETE',
        withCredentials : true
      })).data

      if (err) throw data;


      router.replace(ADMIN_URLS[type + 's'].url)
      
    } 
    catch (error) {
      alert(error)
    }
  }

  if (!content) {
    router.replace(ADMIN_URLS[type + 's'].url)
    return <></>
  }

  return (
    <>
    <HeadComponent title='Admin | Content CMS' />
    <NavBar type="admin" />
    <main className='h-full min-h-screen p-10 main-light text-dark'>

    {[0, 3].includes(step) && 
    <>
      <p className='text-center block font-light font-special text-xl border-b pb-1 mb-4'>
        Admin Read Mode
      </p>
      {step === 3 && 
        <button onClick={() => setStep(2)}
          className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
            <span className="inline-flex items-center justify-center gap-1 py-1.5 px-6 z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                Previous step 
            </span>
            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
        </button>
      }
      {type === CONTENT_TYPE.blog.name && Object.keys(content).length > 0 &&(
        <BlogDetailBody blog={content} adminMode={true} />
      )}
      {type === CONTENT_TYPE.project.name && (
        <ProjectDetailBody project={content} />
      )}

      {step === 0 && 
      <div className="border-t pt-1 flex flex-col items-center justify-center gap-6">
        <p className='text-center capitalize font-special text-xl'>
          select operation
        </p>

        <section className="flex items-center justify-center gap-x-10">
            <button onClick={() => setStep(1)}
              className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                <span className="inline-flex items-center justify-center gap-1 py-1.5 px-6 z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                  <IoPencilOutline />
                    Edit {type} 
                </span>
                <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
            
            <button 
              onClick={handleDeleteBlog}
              className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                <span className="inline-flex items-center justify-center gap-1 py-1.5 px-6 z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                  <IoRemoveCircle />
                    Delete {type} 
                </span>
                <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
        </section>

        {
        ADMIN_URLS[type + 's']?.url && 
        <Link href={ADMIN_URLS[type + 's']?.url}>
          <a
            className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
              <span className="inline-flex items-center justify-center gap-1 py-1.5 px-6 z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                <IoReturnDownBackOutline />
                  Go back to all {type}s 
              </span>
              <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
          </a>
        </Link>}

      </div>}

    </>}     

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
        key={JSON.stringify(step, tags)}
        tags={tags} 
        type={type} 
        initData={content}
        getContent={handleSetContent}
        prev={() => setStep(1)} /> }      

          

          
    {step === 3 && 
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
    }

          


      

    </main>
    </>
  )
}

export default EditCMS;

export async function getServerSideProps(ctx) {
  let allTags, content, type;
  try {
    allTags = await getAllTags();
    const {id, query} = ctx.query;
    type= query;
    console.log({id, query});

    switch(query.toLowerCase()) {
      case CONTENT_TYPE.blog.name : 
        content = await getIndividualBlog(true, id);
        break;

      case CONTENT_TYPE.project.name : 
        content = await getIndividualProject(true, id);
        break;

      default:
        content = null;
    }

    if (!content) throw 'Content not found';

   

  } 
  catch (error) {
    console.log({error})
    allTags = [];
    content = null;
  }
  finally {
    return {
      props : {
        allTags : JSON.stringify(allTags),
        data : JSON.stringify(content),
        contentType : type
      }
    }
  }
}




/*
Step 0 :  
  show preview of existing content with edit and delete btn

delete Mode
  go to content list page

edit Mode
Step 1:
  select tags

Step 2:
  JSON editor

Step 3:
  Preview mode with new data and make changes button

*/