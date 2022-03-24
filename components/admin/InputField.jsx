import { useEffect, useState } from "react"
import { IoCheckmarkDone,  IoSend, IoEllipseOutline, IoCheckmarkCircleSharp, IoMagnetOutline, IoCloseCircleOutline } from "react-icons/io5"
import Textarea from "react-textarea-autosize"

export const StringField = ({name, value='', setValue}) => {
  return (
    <form className="flex flex-col items-start justify-start gap-2 bg-light p-4 filter drop-shadow-xl rounded-md">
      <label htmlFor={name} className="text-xs capitalize font-semibold">{name}</label>
      <Textarea 
        id={name}
        spellCheck={name.toLowerCase() !== 'title'}
        className={"resize-none w-full p-1.5 text-xs peer outline-none focus:outline-none border-2 rounded overflow-hidden border-transparent focus:border-current " + (value.trim().length === 0 ? 'text-primary' : 'text-dark')}
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
        className={"flex flex-wrap gap-4 w-full p-1.5 text-xs peer outline-none focus:outline-none border-2 rounded focus:border-current font-semibold " + (text.length > 0 ? "text-dark" : "text-primary")}>
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
        alert(error.message)
        
      }
  }

  function handleRemoveFromList(el) {
      getData({k : name, v : init.filter(k => k !== el)})
  }

  return (
    <div className="flex flex-col w-full bg-light p-4 filter drop-shadow-xl rounded-md">
      <form onSubmit={handleAddToList} className="flex flex-col items-start justify-start">
        <section className="w-full bg-light p-4 rounded-md filter drop-shadow-xl">
          <label htmlFor="text" className={"text-xs capitalize font-semibold " + (init.length > 0 ? "text-dark" : "text-primary")}>{name} ({init.length})</label>
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
    if (init && Object.keys(init).length > 0) {
      setStep(prev => ({...prev, ...init}))
      return
    }
    // if no init data
    resetStep()
  }, [init])

  function handleSubmitStep() {
    setValue({key : name, value : step})
  }

  function handleClearStep() {
    const grantPermission = confirm(`Confirm clear ${name} with data : ${JSON.stringify(step)}`);
    if (!grantPermission) return;
    setValue({key : name, value : resetStep()})
  }

  function resetStep() {
    let obj = {};
    layout.forEach(key => obj[key.trim()] = '');
    setStep(() => obj)
    return obj
  }


  return (
      <div className="flex flex-col w-full p-4 bg-light drop-shadow-xl filter rounded-md">
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex items-center justiyf-start gap-x-2">
          {(init && Object.values(init).some(Boolean)) && <IoCheckmarkDone className="text-sm text-dark" />}
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
          <div className="flex items-center justify-around w-full">
            <button
              onClick={handleSubmitStep}
              className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer transition-all">
              <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
              {(init && (JSON.stringify(init) === JSON.stringify(step))) ? `Update ${name}` : `Add ${name}`} 
              </span>
              <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>
            
            <button
              onClick={handleClearStep}
              className="capitalize text-xs w-max mx-auto mt-4 rounded-md cursor-pointer transition-all py-1.5 px-6 block text-primary  hover:shadow-xl border-2 border-transparent hover:border-current font-semibold">
                Reset {name} 
          </button>

          </div>}
      </div>
    </div>
)}



export const ObjectArrayStepInput = props => {
  const {layout, name, init=[], setValue} = props;
  
  const SUMMARY_FIELDS = {
    typography : 'family',
    colorPalette : 'hex',
    tools : 'string',
    uiux : 'heading',
    dev : 'heading',
    social : 'label',
    userFlowSteps: 'title',
    externalResources: 'poster',
  };

  const [state, setState] = useState(init);
  const [step, setStep] = useState({});

  function handleSubmitStep() {
    setValue({key : name , value : state})
    resetStep()
  }

  function resetStep() {
    let obj = {};
    layout.forEach(key => obj[key.trim()] = '');
    setStep(() => obj)
    return obj
  }

  function handleSetValue({key, value}) {
    // check for unique fields
    const checkByField = SUMMARY_FIELDS[key];
    const currentFields = state.map(el => {
      return el[checkByField]
    })
    const newValue = value[checkByField]?.toLowerCase();
    if (!newValue) return;
    if (!Boolean(newValue.trim())) {
      alert(`Empty ${key} cannot be added!`)
      return;
    }
    if (currentFields.includes(newValue)) {
      alert(`${key} "${newValue}" already added!`)
      return;
    }
    setState(prev => [...prev, {...value, [checkByField] : newValue}])
    resetStep()
  }

  function handleDeleteField(el) {
    const grantPermission = confirm(`Confirm clear : ${JSON.stringify(el)}`);
    if (!grantPermission) return;
    const filteredList = state.filter(item => item !== el)
    setState(_ => filteredList)
    setValue({key : name , value : filteredList})
    resetStep()
  }

  return (
    <div className="flex flex-col w-full bg-light p-4 rounded-md filter drop-shadow-xl">
      <div className="flex flex-col items-start justify-start w-full">
        {state.length > 0 && 
        <div className='mb-4 w-full'>
          <span className="text-xs capitalize font-semibold text-secondary">{name}</span>
          <ul className="flex flex-col items-stretch justify-start gap-y-4 w-full">
              {state.map((el, i) => {
              return (
                  <li key={i} className="w-full p-4 bg-light rounded-md filter drop-shadow-xl">
                      <details className="w-full focus:outline-none border-none">
                      <summary className="w-full flex justify-between items-center focus:outline-none border-none">
                          <p className="cursor-pointer hover:text-secondary capitalize grow w-full flex items-center justify-start gap-x-2 break-words">
                          {SUMMARY_FIELDS[name] === 'hex' && 
                            <span style={{backgroundColor : el[SUMMARY_FIELDS[name]]}} className="h-4 w-4 rounded-full filter drop-shadow-lg block"></span>}
                            <span className="font-semibold font-special ">
                              {el[SUMMARY_FIELDS[name]].slice(0, 70)} {el[SUMMARY_FIELDS[name]].length > 70 && '...'}
                            </span>
                          </p>
                          <button 
                            onClick={() => handleDeleteField(el)}   
                            className="hover:text-primary grow">
                              <IoCloseCircleOutline />
                          </button>
                      </summary>
                      <p className="text-xs my-2 w-full font-semibold break-words whitespace-pre-line">
                          {JSON.stringify(el, null, 4)}
                      </p>
                      </details>
                  </li>
              )})}
          </ul>
        </div>}

        <ObjectStepInput name={name} layout={layout} init={step} setValue={handleSetValue} />

      </div>
      { (state.length !== init.length) &&
      <button onClick={handleSubmitStep}
        className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer transition-all">
        <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
            Add to {name}
        </span>
        <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
      </button>}
    </div>
)}



export const SelectInput = props => {
  const {name, options, value, setValue} = props;
  return (
    <section className="flex flex-col items-start justify-start gap-2 bg-light p-4 filter drop-shadow-xl rounded-md">
      <span className="text-xs capitalize font-semibold">{name}</span>
      <div className="mt-2 w-full flex flex-col items-start gap-y-2">
        {Object.entries(options).map(([k, v]) => (
          <label 
            htmlFor={k} 
            value={v} 
            key={k} 
            className="text-xs inline-flex items-center justify-start gap-x-1.5 cursor-pointer">
            <input 
              id={k}
              type="radio" 
              name={name} 
              checked={v === value}
              onChange={() => setValue({k : name, v : v})} 
              className="appearance-none"/>
            {v === value ? <IoCheckmarkCircleSharp className="text-lg text-secondary" /> : <IoEllipseOutline className="text-lg" />}
            <small 
              className={"font-semibold capitalize " + (value === v ? 'text-secondary' : 'text-dark opacity-75 hover:opacity-100')}>{v}</small>
          </label>
        ))}
      </div>
    </section>
  )
}



export const ObjectHybrid = ({name, init=[], getData, layout}) => {
  const [heading, setHeading] = useState(init[layout.heading] || '');
  const [items, setItems] = useState(init[layout.list] || []);

  function handleSubmit() {
    const conflict = init.find(el => el.heading === heading);
    if (Boolean(conflict)) {
      alert('Already exists')
      return
    }
    getData([...init, { heading, items }])
    setHeading('');
    setItems([])
  }

  function handleDelete(el) {
    getData(init.filter(item => item.heading !== el.heading))
  }

  function handleEdit(el) {
    setHeading(el.heading)
    setItems(el.items)
    handleDelete(el)
  }

  return (
  <section className="flex flex-col items-start justify-start gap-2 bg-light p-4 filter drop-shadow-xl rounded-md">
    
    <ul className="flex flex-col items-stretch justify-start gap-y-4 mb-6 w-full">
      {init.length > 0 && 
      <li>
        <span className="text-xs capitalize font-semibold text-secondary">Init</span>
      </li>}
      {init?.map((el, i) => {
      return (
          <li key={i} className="w-full p-4 bg-light rounded-md filter drop-shadow-xl">
              <details className="w-full focus:outline-none border-none">
              <summary className="w-full flex justify-between items-center focus:outline-none border-none">
                  <p className="cursor-pointer font-semibold text-xs text-primary hover:text-secondary capitalize grow w-full flex items-center justify-start gap-x-2 break-words">
                    {el.heading}
                  </p>
              </summary>
              <section className="text-xs my-2 w-full break-words whitespace-pre-line">
                  <ul className="flex flex-col items-stretch justify-start gap-y-2 list-inside list-disc">
                    {el.items?.map((item, i) => (
                      <li key={i}>
                        {item.text}
                      </li>
                    ))}
                  </ul>
              </section>
              <ul className="flex items-center justify-start gap-x-4 text-xs pt-4 w-full border-t">
                  <li className='text-dark hover:text-secondary py-0.5 px-3 border-current border rounded'>
                      <button onClick={() => handleEdit(el)}>
                          <small>
                              Edit
                          </small>
                      </button>
                  </li>
                  <li className='text-dark hover:text-primary py-0.5 px-3 border-current border rounded'>
                      <button onClick={() => handleDelete(el)}>
                          <small>
                              Delete
                          </small>
                      </button>
                  </li>
              </ul>
              </details>
          </li>
      )})}
    </ul>
    <span className="text-xs capitalize font-semibold">{name}</span>
      
    <div className="w-full">
      <StringField 
        name={layout.heading} 
        value={heading} 
        setValue={({k, v}) => setHeading(v)}/>
    </div>

    <ArrayField name={layout.list} init={items} getData={({v}) => setItems(v)} />
    
    {Boolean(heading?.trim().length * items.length) &&
     <button
        onClick={handleSubmit}
        className="capitalize text-xs w-max mx-auto mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer transition-all">
        <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
          Add {name} 
        </span>
        <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
    </button>}
  </section>
  )
}