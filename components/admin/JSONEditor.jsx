import { useEffect, useState } from "react"
import { StringField, ConstArrField, SlugField, ArrayField, ObjectStepInput } from "./InputField";
import { CONTENT_TYPE, getEmptyTemplate } from "../../utils/admin";
import { PageField } from "./PageStep";

import { BlogValidator, ProjectValidator } from '../../utils/validator'

export const JSON_EDITOR_STATE = 'json-editor'

export const JSONEditor = ({tags, type, prev, initData=null, getContent}) => {
    const [state, setState] = useState({});
    const [permissionToSubmit, setPermissionToSubmit] = useState(false);

    function handleStateUpdate({k, v}){
        setState(prev => ({...prev, [k] : v}))
    }

    function handleArrayFieldUpdate(data){
        setState(prev => ({...prev, [data.k] : [...data.v]}))
    }

    function handleAddChapterToState(chapter, fieldKey) {
        setState(prev => ({...prev, [fieldKey] : [...prev[fieldKey], chapter]}))
    }
    
    function handleDeleteChapter(chapter, fieldKey) {
        const permissionGranted = confirm(`Delete chapter?`);
        if (!permissionGranted) 
            return

        const newChapters = state[fieldKey].filter(el => el.index !== chapter.index);
        setState(prev => ({...prev, [fieldKey] : newChapters}))
    }

    function handleEditChapter(chapter, fieldKey) {
        const updatedStateChapters = state[fieldKey].map(el => {
            if (el.index === chapter.index) {
                return chapter
            }
            return el;
        })
        setState(prev => ({...prev, [fieldKey] : updatedStateChapters}))
    }
 
    useEffect(() => {
        setState(getEmptyTemplate(type))
        setState(prev => ({...prev, tags, date : new Date().toDateString()}))
    }, [type])

    useEffect(() => {
        const permission = Object.values(CONTENT_TYPE[type].fields).flatMap(({key, required, check}) => {
            if (required) {
                return Object.values(check).map(cb => {
                    return cb(state[key])
                })
            }
            return Infinity
        }).filter(el => el !== Infinity).every(Boolean)
        setPermissionToSubmit(permission);

        if (Object.keys(state).length !== 0) {
            sessionStorage.setItem(JSON_EDITOR_STATE, JSON.stringify(state))
        }
    }, [state])
    
    useEffect(() => {
        const currentStateInSessionStorage = JSON.parse(sessionStorage.getItem(JSON_EDITOR_STATE));
        if (initData && Object.keys(initData).length > 0) {
            setState(() => ({...initData}))
            return
        }
        if (currentStateInSessionStorage) {
            setState(() => ({...currentStateInSessionStorage}))
        }
    }, [])

    function handleSendContentToPage() {
        try {
            // validate fields
            let validator;
            switch(type) {
                case 'blog':
                    validator = BlogValidator.validate(state)
                    console.log(validator, type, state)
                    break
                case 'project':
                    state.difficulty = 'beginner'
                    state.category = 'full stack'
                    validator = ProjectValidator.validate(state)
                    console.log(validator, type, state)
                    break
            }
            // TODO: check whether title is unique
            getContent(state);
            
        } 
        catch (error) {
            
        }
    }

    return (
        <div key={type} className="section h-full w-full flex flex-col items-center justify-center select-none">
            <section className="flex flex-col items-stretch justify-start gap-4 max-w-2xl w-full mx-auto">
                <div className="flex items-center justify-start gap-x-8 w-max">
                    {prev && (
                        <button 
                        onClick={prev}
                        className="capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer group">
                        <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                            &larr; Prev 
                        </span>
                        <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
                        </button>
                    )}
                </div>
                <h1 className="font-special text-4xl md:text-5xl capitalize mb-10">
                    New {type}
                </h1>
            
                {CONTENT_TYPE[type]?.fields?.map((field, i) => {
                    return (
                        <div id={field.key} key={i} className="group flex flex-col items-stretch mb-6 relative after:absolute after:-bottom-10 after:-z-10 z-10 after:left-4 after:bg-dark after:h-10 after:w-0.5 after:last-of-type:hidden">
                            {(field.type === 'array') && 
                                <ArrayField
                                    name={field.key}
                                    init={state[field.key]}
                                    getData={handleArrayFieldUpdate} />
                            }
                            {(['tags'].includes(field.type)) && 
                                <ConstArrField 
                                    name="tags"
                                    array={tags} />
                            }
                            {(field.type === 'slug') && 
                                <SlugField 
                                    text={state?.title}
                                    getSlug={(v) => handleStateUpdate({k : 'slug', v: v.trim().toLowerCase()})} />
                            }
                            {(field.type === 'string') && 
                                <StringField 
                                    name={field.key}
                                    setValue={handleStateUpdate} 
                                    value={state?.[field.key]} />
                            }
                            {(['obj'].includes(field.type)) && 
                                <ObjectStepInput 
                                    layout={field.layout}
                                    init={state?.[field.key]}
                                    setValue={({key, value}) => handleStateUpdate({k : key, v : value})}
                                    name={field.key}/>
                            }
                            
                            {['page'].includes(field.type) && 
                                <PageField 
                                    contentType={type}
                                    name={field.key}
                                    handleDeleteChapter={c => handleDeleteChapter(c, field.key)}
                                    getData={c => handleAddChapterToState(c, field.key)}
                                    editData={c => handleEditChapter(c, field.key)}
                                    init={state[field.key]}/>
                            }
                            
                        </div>
                    )
                })}
            
                

            </section>
            {permissionToSubmit && 
                <button 
                onClick={handleSendContentToPage}
                className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                        Submit 
                    </span>
                    <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
            }
        </div>
  )
}
