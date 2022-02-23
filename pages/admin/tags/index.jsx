// auth required
// DISPLAY ADMIN PAGES
//  NOTES CMS

import { useState } from 'react';
import { IoHeartCircle, IoCloseCircleSharp } from 'react-icons/io5';
import { StringField } from '../../../components/admin/InputField';
import { HeadComponent } from '../../../components/Head'
import { JoinLine } from '../../../components/public/DescHeader';
import { NavBar } from '../../../components/public/Nav';


const TagsAdminPage = () => {
    const [current, setCurrent] = useState('');
    const [tags, setTags] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editID, setEditID] = useState(null);

    async function handleAddTag() {
      try {
        const newTag = current.trim().toLowerCase();
        if (!Boolean(newTag)) throw 'Tag cannot be empty'

        const existingTag = tags.filter(tag => tag.tag === newTag);
        if (existingTag.length > 0) throw 'Tag already exists'

        if (editMode) {
          setTags(prev => [...prev, { _id : editID, tag : newTag} ])
          setCurrent('')
          setEditID(null);
          setEditMode(false)
        }
        else {
          setTags(prev => [...prev, { _id : Date.now(), tag : newTag} ])
          setCurrent('')
        }
        
      } 
      catch (error) {
        alert(error)
      }

    }

    async function handleDelete(tag) {
      try {
        let permission = confirm('Are you sure you want to delete tag?')
        if (!permission) throw 'Delettion cancelled'
        setTags(prev => prev.filter(t => t !== tag))
      } 
      catch (error) {
        alert(error)
      }

    }

    async function handleEdit(tag) {
      setEditMode(true);
      setEditID(tag._id);
      setCurrent(tag.tag);
      setTags(prev => prev.filter(t => t._id !== tag._id))
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
                  Add Step 
                </span>
                <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
          </section>

          <ul className="flex flex-wrap gap-4 items-center justify-start w-full pt-4 border-t">
          {tags.sort((a,b) => a._id - b._id).map(t => (
            <li key={t._id}
              className="text-sm py-1 px-4 border-2 border-current font-semibold rounded-md uppercase inline-flex items-center justify-between gap-x-4 transition-all hover:bg-dark hover:text-light text-dark">
                <button onClick={() => handleEdit(t)} className='text-secondary hover:scale-125'>
                <IoHeartCircle />
                </button>
                <small>
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
