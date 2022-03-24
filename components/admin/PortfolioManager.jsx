import {useState, useEffect, useCallback} from 'react'

import axios from 'axios'
import { IoCloseOutline, IoCheckmarkCircle, IoRemoveCircleSharp, IoLockOpenOutline, IoLockClosedOutline } from 'react-icons/io5'

import { API_ROUTES, PORTFOLIO_FIELDS } from '../../utils/admin';
import { StringField, ObjectArrayStepInput } from '../admin/InputField';
import { PortfolioProjectValidator } from '../../utils/validator'

export const PortfolioManager = ({handleClose, existing, editMode=null, del, add, edit}) => {
    const [designs, setDesigns] = useState([]);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(editMode?.project?._id ?? null);
    const [design, setDesign] = useState(editMode?.design?._id ?? null);
    const [base, setBase] = useState(Boolean(editMode) ? editMode : {});
    const [isPublic, setIsPublic] = useState(editMode?.isShowcased ?? false);


    const getLists = useCallback(async function getLists() {
        try {
            let temp;
            const projectPromise = new Promise(async (res, rej) => {
                try {
                    res((await axios.get(API_ROUTES.projects, { withCredentials : true })).data)
                } 
                catch (error) {
                    rej(error)    
                }
            })
            
            const designPromise = new Promise(async (res, rej) => {
                try {
                    res((await axios.get(API_ROUTES.designs, { withCredentials : true })).data)
                } 
                catch (error) {
                    rej(error)    
                }
            })

            const lists = await Promise.allSettled([
                projectPromise, designPromise
            ])  

            if (!editMode) {
                let existingProjectIDs = existing.map(el => el.project._id), existingDesignIDs = existing.map(el => el.design._id);
                // lists all available projects irrespective of isPublic status
                temp = lists[0].value.data.filter(p => !existingProjectIDs.includes(p._id));     //project
                setProjects(temp)
                
                // lists all available designs irrespective of isPublic status
                temp = lists[1].value.data.filter(d => !existingDesignIDs.includes(d._id));     //project
                setDesigns(temp)  
                return;
            }

            // lists all available projects irrespective of isPublic status
            temp = lists[0].value.data;     //project
            setProjects(temp)
            
            // lists all available designs irrespective of isPublic status
            temp = lists[1].value.data;     //project
            setDesigns(temp)  
        } 
        catch (error) {
            alert(error)
        }
    }, [editMode, existing])

    useEffect(() => getLists(), [editMode, existing, getLists])

    async function handleSubmitPortfolio() {
        try {
            const payload = {
                project, design, ...base, isShowcased : isPublic
            };

            // client side validation
            const {error, value} = PortfolioProjectValidator.validate(payload);
            if (error) throw error.details[0].message

            // send payload to API
            const data = (await axios({
                url : `${API_ROUTES.portfolio}${editMode ? ('/' + editMode._id) : ''}`,
                method : Boolean(editMode) ? 'PATCH' : 'POST',
                data : value
            })).data

            if (data.error) throw data.data
            if (editMode) {
                edit(data.data)
            }
            else {
                add(data.data)
            }
            handleClose()


        } 
        catch (error) {
            alert(error)
        }
    }

    async function handleDeletePortfolio() {
        try {
            let hasPermission = confirm("Confirm delete!");
            if (!hasPermission) return;
            const data = (await axios({
                url : `${API_ROUTES.portfolio}/${base._id}`,
                method : 'DELETE'
            })).data   
            if (data.error) throw data.data;
            del(data.data)
            handleClose();
        } 
        catch (error) {
            alert(error)
        }
    }

    return (
    <div className='fixed z-40 inset-0 h-screen scrollbar-thin overflow-y-auto bg-light text-dark snap-y snap-proximity'>
        <IoCloseOutline onClick={handleClose} className="fixed top-4 right-4 text-4xl cursor-pointer hover:rotate-90 hover:text-primary transition-all" />
        {!Boolean(designs.length * projects.length) && (
            <section className='h-[50vh] flex flex-col items-center justify-center'>
                <strong className="font-special text-4xl font-black capitalize mb-2">
                    Oops!
                </strong>
                <span>
                    No {designs.length > 0 ? 'projects' : 'designs'} available for portfolio.
                </span>
            </section>
        )} 


        {/* select project */}
        {
            Boolean(designs.length * projects.length) && 
            <div className="min-h-screen h-auto flex flex-col items-center justify-start px-12 py-20 snap-start">
                {Boolean(editMode) && <small className="text-xs text-secondary capitalize font-semibold">Edit mode</small>}
                <strong className="font-special text-3xl font-black capitalize mb-2">
                    select project
                </strong>
                {project && <small>Project selected!</small>}
                <table className='mt-10 w-full max-w-2xl mx-auto table-auto border-collapse border border-dark'>
                    <thead className='bg-light bg-opacity-20'>
                        <tr className='capitalize'>
                            <th className='border border-dark p-2 font-semibold'>
                                date
                            </th>
                            <th className='border border-dark p-2 font-semibold'>
                                title
                            </th>
                            <th className='border border-dark p-2 font-semibold'>
                                isPublic
                            </th>
                            <th className='border border-dark p-2 font-semibold'>
                                selected
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {projects.map(el => {
                        const selected = project === el._id;
                        return (
                            <tr key={el._id}>
                                <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                    {new Date(el.date).toDateString()}
                                </td>
                                <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                    {el.title}
                                </td>
                                <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                    {(el.isPublic).toString()}
                                </td>
                                <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                    {selected ? 
                                        <IoCheckmarkCircle onClick={() => !editMode && setProject(prev => !!prev ? null : el._id)} className='mx-auto text-2xl cursor-pointer' /> 
                                        
                                        : 
                                        
                                        <IoRemoveCircleSharp onClick={() => !editMode && setProject(prev => !!prev ? null : el._id)} className='mx-auto text-2xl cursor-pointer' />}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {projects.length === 0 && 'No available projects for portfolio'}
            </div>
        }

        {/* select designs */}
        {
            Boolean(designs.length * projects.length) && 
            <div className="min-h-screen h-auto flex flex-col items-center justify-start px-12 py-20 snap-start">
            {Boolean(editMode) && <small className="text-xs text-secondary capitalize font-semibold">Edit mode</small>}
            <strong className="font-special text-3xl font-black capitalize mb-2">
                select designs
            </strong>
            {design && <small>design selected!</small>}
            <table className='mt-10 w-full max-w-2xl mx-auto table-auto border-collapse border border-dark'>
                <thead className='bg-light bg-opacity-20'>
                    <tr className='capitalize'>
                        <th className='border border-dark p-2 font-semibold'>
                            date
                        </th>
                        <th className='border border-dark p-2 font-semibold'>
                            title
                        </th>
                        <th className='border border-dark p-2 font-semibold'>
                            isPublic
                        </th>
                        <th className='border border-dark p-2 font-semibold'>
                            selected
                        </th>
                    </tr>
                </thead>
                <tbody>
                {designs.map(el => {
                    const selected = design === el._id;
                    return (
                        <tr key={el._id}>
                            <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                {new Date(el.date).toDateString()}
                            </td>
                            <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                {el.title}
                            </td>
                            <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                {(el.isPublic).toString()}
                            </td>
                            <td className={'border p-2 text-sm text-center ' + (selected && 'bg-primary')}>
                                {selected ? 
                                    <IoCheckmarkCircle 
                                        onClick={() => !editMode && setDesign(prev => !!prev ? null : el._id)} className='mx-auto text-2xl cursor-pointer' /> 
                                    
                                    : 
                                    
                                    <IoRemoveCircleSharp 
                                        onClick={() => !editMode && setDesign(prev => !!prev ? null : el._id)} className='mx-auto text-2xl cursor-pointer' />}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {designs.length === 0 && 'No available designs for portfolio'}

            </div>
        }
        
        {/* enter base data */}
        {
            Boolean(designs.length * projects.length) && 
            <div className="min-h-screen h-auto flex flex-col items-stretch justify-start px-12 py-20 w-full snap-start">
            <strong className="font-special text-center text-3xl font-black capitalize mb-2">
                {Boolean(editMode) ? 'edit' : 'add'} metadata
            </strong>
            <section className='w-full mx-auto max-w-3xl relative after:absolute after:left-4 after:h-full after:bg-primary after:w-0.5 after:top-0 after:z-0'>
                <article className="relative z-10 flex flex-col items-stretch justify-start gap-y-10 ">
                    {PORTFOLIO_FIELDS.map((field, i) => {
                        const {key, type} = field;
                        if (type === 'string') {
                            return <StringField 
                                key={i} 
                                name={key} 
                                value={base[key]} 
                                setValue={({v}) => setBase(prev => ({...prev, [key] : v}))}/>
                        }

                        if (type === 'objArr') {
                            return <ObjectArrayStepInput 
                                key={i} 
                                name={key} 
                                init={base[key]} 
                                setValue={({value}) => setBase(prev => ({...prev, [key] : value}))} 
                                layout={field.layout}/>
                        }
                    })}
                </article>
            </section>
            

            <div className="mt-10 flex flex-col items-center justify-center gap-6">
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

            <button onClick={handleSubmitPortfolio}
                className="capitalize text-xs w-max mx-auto rounded flex items-center justify-center relative overflow-hidden cursor-pointer transition-all mt-10">
                <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
                    {editMode ? 'Submit changes' : 'Add portfolio'} 
                </span>
                <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>

            {editMode && 
            <button onClick={handleDeletePortfolio}
                className="capitalize text-xs w-max mx-auto rounded flex items-center justify-center relative overflow-hidden cursor-pointer transition-all mb-10">
                <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-primary text-primary font-semibold">
                    Delete portfolio 
                </span>
                <span className="py-1.5 px-6 block bg-primary transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>}

          </div>
            </div>
        }
    </div>
    )
}
