import { useEffect, useState } from 'react';
import { IoClose, IoWarningOutline } from 'react-icons/io5';
import { StringField } from './InputField';


const NOTES_TEMPLATE = {
    title : '',
    feature : '',
    isComplete : ''
}

export const NotesModal = ({closeAddModal, getNote, notes, init = null}) => {
    const [note, setNote] = useState(init ? init : NOTES_TEMPLATE)
    const [isConflicting, setIsConflicting] = useState(false);

    function handleComplete() {
        getNote(note)
        closeAddModal()
    }

    useEffect(() => {
        const existingNote = notes.find(n => n.title === note.title);
        if (existingNote && !init) {
            setIsConflicting(() => true)
            return
        }
        setIsConflicting(() => false)
    }, [note.title])


    return (
        <div className="absolute z-50 top-0 left-0 w-full h-auto min-h-screen px-10 py-20 bg-dark bg-opacity-95">
            <button onClick={closeAddModal} className="absolute top-4 right-4">
                <IoClose className='text-4xl text-primary'/>
            </button>
            <div className="w-full bg-light rounded p-4 filter drop-shadow-xl max-w-2xl mx-auto flex flex-col items-stretch gap-y-4 overflow-y-auto">
            {isConflicting && 
                <span className='pl-4 text-primary inline-flex items-center gap-x-1 font-semibold font-special capitalize'>
                    <IoWarningOutline /> Note title already exists
                </span>
            }
            {Object.keys(NOTES_TEMPLATE).map(name => {
                console.log(name)
                if (name !== 'isComplete') {
                    return (
                        <StringField 
                            key={name}
                            name={name}
                            value={note[name]}
                            setValue={({k,v}) => setNote(prev => ({...prev, [k] : v}))} />
                        )
                    }
                return (
                    <label key={name} className="flex flex-col items-start justify-start w-full text-xs gap-4 p-4 bg-light filter drop-shadow-xl rounded">
                        <span className='font-semibold'>
                            Status : 
                        </span>
                        <div className="flex items-center justify-start gap-x-1">
                            <input 
                                checked={note[name]}
                                type="checkbox"
                                className='accent-secondary'
                                onChange={() => setNote(prev => ({...prev, isComplete : !prev.isComplete}))} />
                            <span className="font-semibold capitalize">
                                {note.isComplete ? 'completed' : 'incomplete'}
                            </span>
                        </div>
                    </label>
            )})}
            {!isConflicting  &&
            <button onClick={handleComplete} 
            className="capitalize text-xs w-max  mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer">
                <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark text-dark font-semibold">
                    Done 
                </span>
                <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
            </button>}
            </div>
        </div>
    )
}

