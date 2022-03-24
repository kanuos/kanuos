import { useEffect, useState, useCallback } from "react"
import Image from "next/image";
import { StringField, ConstArrField, SlugField, ArrayField, ObjectStepInput, SelectInput, ObjectArrayStepInput, ImageInput } from "./InputField";
import { CONTENT_TYPE, getEmptyTemplate } from "../../utils/admin";
import { PageField } from "./PageStep";

export const JSON_EDITOR_STATE = 'json-editor'

export const JSONEditor = ({tags, type, prev, initData=null, getContent}) => {
    const [state, setState] = useState({});

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
    }, [type, tags])

    
    useEffect(() => {
        if (initData && Object.keys(initData).length > 0) {
            setState(() => ({...initData}))
            return
        }
        const currentStateInSessionStorage = JSON.parse(sessionStorage.getItem(JSON_EDITOR_STATE));
        if (currentStateInSessionStorage) {
            setState(() => ({...currentStateInSessionStorage, tags : [...tags]}))
        }

    }, [initData, tags])


    useEffect(() => {
        if (Object.keys(state).length){
            sessionStorage.setItem(JSON_EDITOR_STATE, JSON.stringify(state));
        }
    }, [state])

    const getSlug = useCallback((v) => {
        handleStateUpdate({k : 'slug', v: v.trim().toLowerCase()})
    }, [])

    function handleSendContentToPage() {
        getContent(state);
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
                <h1 className="font-special text-4xl md:text-5xl capitalize my-10">
                    {Boolean(initData) ? `Edit ${type}` : `New ${type}`}
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
                                    getSlug={getSlug} />
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
                            
                            {['select'].includes(field.type) && 
                                <SelectInput 
                                    name={field.key} 
                                    value={state?.[field.key]}
                                    setValue={handleStateUpdate}
                                    options={field.option} />
                            }
                            
                            {(['objArr'].includes(field.type)) && 
                                <ObjectArrayStepInput 
                                    key={JSON.stringify(state)}
                                    layout={field.layout}
                                    init={state?.[field.key]}
                                    setValue={({key, value}) => handleStateUpdate({k : key, v : value})}
                                    name={field.key}/>
                            }
                            
                            {['image'].includes(field.type) && 
                                <div className="w-full flex flex-col items-stretch bg-light drop-shadow-xl filter rounded-md relative group overflow-hidden">
                                {Boolean(state[field.key]) ? 
                                <>
                                    <Image 
                                        layout="fill"
                                        alt={'preview image for ' + field.key}
                                        className="h-full w-full object-cover block shadow-xl transition-all group-hover:grayscale group-hover:rotate-12 group-hover:scale-150 rounded-md"
                                        src={state[field.key]}  />
                                    <button 
                                        onClick={() => setState(prev => ({...prev, [field.key] : ''}))}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center overflow-hidden cursor-pointer transition-all">
                                        <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                                            Change {field.key} 
                                        </span>
                                        <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
                                    </button>
                                </>
                                : 
                                <ImageInput 
                                    name={field.key} 
                                    setValue={({key, value}) => handleStateUpdate({k : key, v : value})} />
                                }
                                </div>
                            }
                        </div>
                    )
                })}
                            
            </section>
            <button 
                onClick={handleSendContentToPage}
                className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                        Submit 
                    </span>
                    <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
            
        </div>
  )
}
