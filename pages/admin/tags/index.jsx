// auth required
// DISPLAY ADMIN PAGES
//  NOTES CMS

import axios from 'axios';
import { useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { StringField } from '../../../components/admin/InputField';
import { HeadComponent } from '../../../components/Head'
import { JoinLine } from '../../../components/public/DescHeader';
import { NavBar } from '../../../components/public/Nav';
import { getAllTags } from '../../../database/tags';
import { API_ROUTES } from '../../../utils/admin';


const TagsAdminPage = ({allTags}) => {
    const [current, setCurrent] = useState('');
    const [tags, setTags] = useState(allTags ? JSON.parse(allTags) : []);

    async function handleAddTag() {
      try {
        const newTag = current.trim().toLowerCase();
        if (!Boolean(newTag)) throw 'Tag cannot be empty'

        const existingTag = tags.filter(tag => tag.tag === newTag);
        if (existingTag.length > 0) throw 'Tag already exists'

        const {tag} = (await axios({
          method : 'POST',
          url : API_ROUTES.tags,
          data : {
            tag : newTag
          }
        })).data;

        if (!tag) throw 'Invalid'
        setTags(prev => [...prev, tag])
        setCurrent('')
         
      } 
      catch (error) {
        alert(error)
      }

    }

    async function handleDelete(t) {
      try {
        let permission = confirm('Are you sure you want to delete tag?')
        if (!permission) throw 'Delettion cancelled'
        const {tag} = (await axios(
            {
              url : `${API_ROUTES.tags}?tag=${t._id}`,
              method : 'DELETE'
            }
          )).data

        setTags(prev => prev.filter(t => t._id !== tag._id && t.tag !== tag.tag))
      } 
      catch (error) {
        alert(error)
      }

    }


    return (
    <>
        <HeadComponent title="ADMIN | Tags Management" />
        <NavBar type='admin' left={true}/>
        <main className="min-h-screen h-full p-20 main-light text-dark">
          <div className="w-full max-w-2xl mx-auto">

          <h1 className="font-special text-3xl md:text-4xl capitalize">
            tag management ({tags.length})
          </h1>
          <section className="flex flex-col w-full items-stretch my-8">
            <StringField 
              name='tag'
              value={current}
              setValue={({_, v}) => setCurrent(v)}/>
            <div className="ml-4">
              <JoinLine />
            </div>
            <button onClick={handleAddTag} 
              className="capitalize text-xs w-max  mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                  Add Tag 
                </span>
                <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
          </section>

          <ul className="flex flex-wrap gap-4 items-center justify-start w-full pt-4 border-t">
          {tags.sort((a,b) => a._id - b._id).map(t => (
            <li key={t._id}
              className="text-sm py-1 px-2 border-2 border-current font-semibold rounded-md uppercase inline-flex items-center justify-between gap-x-4 transition-all hover:bg-dark hover:text-light text-dark">
                <small className='mr-4'>
                  {t.tag}
                </small>
                <button onClick={() => handleDelete(t)} className='text-primary hover:scale-125'>
                <IoCloseCircleSharp />
                </button>
            </li>
            ))}
          </ul>



          </div>
        </main>
    </>
  )
}


export default TagsAdminPage;


export async function getServerSideProps(){
  try {
    const tags = await getAllTags();
    if (!tags) throw 'No tags found'
    
    return {
      props : {
        allTags : JSON.stringify(tags)
      }
    }
  } 
  catch (error) {
    return {
      props : {
        allTags : JSON.stringify([])
      }
    }  
  }
}