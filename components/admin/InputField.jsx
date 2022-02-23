import { useEffect, useState } from "react"
import { IoCheckmarkDone,  IoSend } from "react-icons/io5"
import Textarea from "react-textarea-autosize"

export const StringField = ({name, value='', setValue}) => {
  return (
    <form className="flex flex-col items-start justify-start gap-2 bg-light p-4 filter drop-shadow-xl rounded-md">
      <label htmlFor={name} className="text-xs capitalize font-semibold">{name}</label>
      <Textarea 
        id={name}
        spellCheck={name.toLowerCase() !== 'title'}
        className={"resize-none w-full p-1.5 text-xs peer outline-none focus:outline-none border-2 rounded overflow-hidden border-transparent focus:border-current " + (value.trim().length === 0 ? 'text-primary' : 'text-secondary')}
        value={value} 
        onChange={e => setValue({k : name, v: e.target.value})}/> 
    </form>
  )
}

export const ConstArrField = ({name, array}) => {
  return (
    <section className="flex flex-col items-start justify-start gap-2 bg-light p-4 filter drop-shadow-xl rounded-md">
      <span className="text-xs capitalize font-semibold">{name}</span>
      <article 
        className="flex flex-wrap gap-4 w-full p-1.5 text-xs uppercase text-secondary font-semibold">
          {array.map(el => <small key={el._id}>{el.tag}</small>)}
      </article>
    </section>
  )
}

export const SlugField = ({text='', getSlug}) => {
  const slug = text.toLowerCase().split(' ').join('_');

  useEffect(() => {
    getSlug(text.toLowerCase().split(' ').join('_'))
  }, [text])
  
  return (
    <section className="flex flex-col items-start justify-start gap-2 bg-light p-4 filter drop-shadow-xl rounded-md">
      <span className="text-xs capitalize font-semibold">slug</span>
      <article 
        className={"flex flex-wrap gap-4 w-full p-1.5 text-xs peer outline-none focus:outline-none border-2 rounded focus:border-current font-semibold " + (text.length > 0 ? "text-secondary" : "text-primary")}>
          /{slug}
      </article>
    </section>
  )
}


export const ArrayField = ({name, init=[], getData}) => {
  const [item, setItem] = useState('');

  function handleAddToList(e) {
      e.preventDefault()
      try {
        let sanitizedItem = item.trim();
        if (!sanitizedItem) { throw new Error('Item required')}
        if (Array.from(init).includes(sanitizedItem)) { throw new Error('Item already in list')}
        setItem('')
        getData({k : name, v : [...init, {text : sanitizedItem}]})
      } 
      catch (error) {
        console.log(error.message)
        
      }
  }

  function handleRemoveFromList(el) {
      getData({k : name, v : init.filter(k => k !== el)})
  }

  return (
    <div className="flex flex-col w-full bg-light p-4 filter drop-shadow-xl rounded-md">
      <form onSubmit={handleAddToList} className="flex flex-col items-start justify-start">
        <section className="w-full bg-light p-4 rounded-md filter drop-shadow-xl">
          <label htmlFor="text" className={"text-xs capitalize font-semibold " + (init.length > 0 ? "text-secondary" : "text-primary")}>{name} ({init.length})</label>
          <div className="block mt-2 relative">
            <Textarea 
              id="text"
              className="resize-none w-full p-1.5 text-xs peer outline-none focus:outline-none border-2 rounded overflow-hidden pr-6"
              value={item} 
              onChange={e => setItem(e.target.value)}/> 
            <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-2">
              <IoSend />
            </button>
          </div>
        </section>
      </form>
      {init.length > 0 && 
      <>
        <small className="p-2 mt-2 font-semibold text-dark capitalize">{name} items</small>
      </>}
      <ul key={init.length} className="flex flex-col items-start justify-start list-inside list-disc">
        {init.map((el,i) => (
          <li key={i} className="p-2 text-xs" onClick={() => handleRemoveFromList(el)}>
            <small>
              {el.text}
            </small>
          </li>
        ))}
      </ul>
    </div>
  )
}


export const ImageInput = ({name, setValue}) => {
  const [imgUrl, setImgUrl] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  function handleSubmitImage() {
    setValue({key : name, value : imgUrl.trim()})
    setImgUrl('');
    setPreviewMode(false);
  }

  return (
    <div className="flex flex-col w-full p-4 mt-4">
      {previewMode && 
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={imgUrl} className="w-full h-auto object-cover my-4 block shadow-lg" />
        <button onClick={handleSubmitImage}
          className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
          <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
              Add {name} 
          </span>
          <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
        </button>
      </div>
  
      }
    {!previewMode && 
      <article className="flex flex-col items-start justify-start">
        <span className="text-xs capitalize font-semibold">{name}</span>
          <section className="w-full my-2">
            <label htmlFor="text" className="text-xs capitalize font-semibold text-secondary">Img URL</label>
              <Textarea 
                id="text"
                className="resize-none w-full p-1.5 text-xs peer outline-none focus:outline-none border-2 rounded focus:border-current overflow-hidden pr-6"
                value={imgUrl} 
                onChange={e => setImgUrl(e.target.value)}/> 
          </section>
      {imgUrl.trim().length > 0 &&
      <button type="button" onClick={() => setPreviewMode(true)}
          className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
          <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
              Preview 
          </span>
          <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
      </button>}
      
    </article>}
  </div>
  )
}


export const ObjectStepInput = props => {
  const {layout, name, init=null, setValue} = props;
  const [step, setStep] = useState({});

  function handleOnChange({k, v}) {
    setStep(prev => ({...prev, [k] : v}))
  }

  useEffect(() => {
    if (init) {
      setStep(prev => ({...prev, ...init}))
      return
    }
    // if no init data
    let obj = {};
    layout.forEach(key => obj[key.trim()] = '');
    setStep(() => obj)
  }, [])

  function handleSubmitStep() {
    setValue({key : name, value : step})
  }

  return (
      <div className="flex flex-col w-full p-4 bg-light drop-shadow-xl filter rounded-md">
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex items-center justiyf-start gap-x-2">
          {(init && Object.values(init).some(Boolean)) && <IoCheckmarkDone className="text-sm text-secondary" />}
          <span className="text-xs capitalize font-semibold">{name}</span>
        </div>
          {layout.map(el => (
            <section key={el} className="w-full my-2">
              <StringField 
                name={el} 
                value={step[el]} 
                setValue={handleOnChange} />
            </section>
          ))}
  
          {Object.values(step).every(el => el.trim().length > 0) &&
          <button
            onClick={handleSubmitStep}
            className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer transition-all">
            <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
            {(init && (JSON.stringify(init) === JSON.stringify(step))) ? `Update ${name}` : `Add ${name}`} 
            </span>
            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
        </button>}
      </div>
    </div>
)}

