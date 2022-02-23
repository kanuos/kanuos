// Create new content page
// import : internal
import { useState, useEffect } from 'react';
import { JSONEditor, JSON_EDITOR_STATE } from '../../components/admin/JSONEditor';
import { SelectContentType } from '../../components/admin/SelectContentType';
import { TagSelector } from '../../components/admin/TagSelector';
import { HeadComponent } from '../../components/Head'
import { NavBar } from '../../components/public/Nav';

const SESSION_NAME = `sounak_admin`;

const ContentCMS = () => {
  const [type, setType] = useState('');
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState({});
  
  function handleTag(tag) {
    if (tags.includes(tag)) {
      setTags(prev => prev.filter(el => el !== tag))
      return
    }
    setTags(prev => [...prev, tag])
  }

  function handleSetContent(ctnt) {
    setContent(ctnt)
  }

  useEffect(() => {
    const cms = getSessionStorageData();
    if (!cms) {
      sessionStorage.setItem(SESSION_NAME, JSON.stringify({type, tags}))
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

    if (cms.tags.length !== tags.length) {
      let temp = tags.length === 0 ? [...cms.tags] : [...tags]
      setTags([...temp])
      sessionStorage.setItem(SESSION_NAME, JSON.stringify({...cms, tags : [...temp]}))
    }

  }, 
  [tags,  type])

  

  function getSessionStorageData() {
    return JSON.parse(sessionStorage.getItem(SESSION_NAME));
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
          allTags={allTags} 
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
    </main>
    </>
  )
}

export default ContentCMS;



const allTags = [
  'react', 'vue', 'express', 'django', 'nodejs', 'jwt', 'access token', 'refresh token',
  'python', 'golang', 'tailwind', 'bootstrap', 'material design', 'session', 'authorization',
].map((el, i) => ({_id: i, tag : el}))