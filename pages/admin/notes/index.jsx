// auth required
// DISPLAY ADMIN PAGES
//  NOTES CMS

import { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { FcApproval, FcCloseUpMode } from 'react-icons/fc';
import { NotesModal } from '../../../components/admin/NotesModal';
import { HeadComponent } from '../../../components/Head'
import { NavBar } from '../../../components/public/Nav';
import { getAllNotes } from '../../../database/notes';
import axios from 'axios';
import { API_ROUTES } from '../../../utils/admin'
import { ADMIN_ACCOUNT } from '../../../utils';
import { isAdminMiddleware } from "../../../utils/authLib"

const NotesAdminPage = ({allNotes}) => {
    const [notes, setNotes] = useState(allNotes ? JSON.parse(allNotes) : []);
    const [editMode, setEditMode] = useState(false);
    const [editID, setEditID] = useState(null);
    const [modal, setModal] = useState(false);


    function openAddModal() {
        setModal(() => true)
    }

    function closeAddModal() {
        setModal(() => false)
    }

    async function addNote(note) {
        note.isComplete = Boolean(note.isComplete)
        try {
            if(editMode) {
                const {editedNote} = (await axios({
                    url : `${API_ROUTES.notes}?note=${note._id}`,
                    data : note,
                    method : 'PATCH'
                })).data;
                setNotes(prev => prev.map(el => {
                    if (el._id === editedNote._id) {
                        return note;
                    }
                    return el
                }))
                setEditMode(false)
                setEditID(null)
                return
            }
            const {newNote} = (await axios({
                url : API_ROUTES.notes,
                data : note,
                method : 'POST'
            })).data;

            setNotes(prev => [...prev, newNote])
            
        } 
        catch (error) {
            alert(error)    
        }
    }


    function handleEdit(note) {
        setEditMode(true);
        setEditID(note)
        openAddModal()
    }

    async function handleDelete(noteID) {
        try {
            let confirmDelete = confirm('Confirm delete?');
            if (confirmDelete) {
                const {deletedNote} = (await axios({
                    method : 'DELETE',
                    url : `${API_ROUTES.notes}?note=${noteID}`
                })).data;
                if (!deletedNote) throw 'Note not found'
                setNotes(prev => prev.filter(n => n._id !== deletedNote._id))
            }
            
        } 
        catch (error) {
            alert(error)
        }
    }

    return (
    <>
        <HeadComponent title="ADMIN | Notes Management" />
        <NavBar type='admin' left={true}/>
        <main className="min-h-screen h-full p-16 main-light text-dark">
            <div className="h-screen w-10 fixed top-0 right-0 flex flex-col justify-end items-center pr-8 pb-8">
                <button onClick={openAddModal}>
                    <IoAddCircle className='text-5xl hover:text-primary' />
                </button>
            </div>

            { modal && <NotesModal 
                notes={notes}
                init={editID}
                closeAddModal={closeAddModal} 
                getNote={addNote} /> }

            <div className="w-full max-w-2xl mx-auto">
                <h1 className="font-special text-center text-3xl md:text-4xl capitalize mb-2">
                    project plans { notes.length > 0 && <small>({notes.length})</small>}
                </h1>
                

                {
                notes.length > 0 &&
                <ul className="flex flex-col gap-6 items-stretch justify-start w-full pt-4 border-t">
                {notes.sort((a,b) => a._id - b._id).map(n => (
                    <li key={n._id}
                    className={"text-sm p-4 bg-light filter drop-shadow-xl rounded-md transition-all " + (n.isComplete ? 'opacity-50 hover:opacity-100' : 'group')}>
                        <details className='w-full text-xs'>
                            <summary className='flex items-center justify-between font-semibold text-sm select-none group-hover:text-primary cursor-pointer'>
                                <span className='font-special capitalize '>
                                    Project {n.title}
                                </span>
                                {n.isComplete ? <FcApproval /> : <FcCloseUpMode />}
                            </summary>
                            <p className='my-4 font-semibold break-words whitespace-pre-line'>
                                <small>
                                    {n.feature}
                                </small>
                            </p>
                            <ul className="flex items-center justify-start gap-x-4 text-xs pt-4 w-full border-t">
                                <li className='text-dark hover:text-secondary py-0.5 px-3 border-current border rounded'>
                                    <button onClick={() => handleEdit(n)}>
                                        <small>
                                            Edit
                                        </small>
                                    </button>
                                </li>
                                <li className='text-dark hover:text-primary py-0.5 px-3 border-current border rounded'>
                                    <button onClick={() => handleDelete(n._id)}>
                                        <small>
                                            Delete
                                        </small>
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </li>
                    ))}
                </ul>}

                {notes.length === 0 && 
                    <div className='h-[50vh] flex items-center justify-center'>
                        <span className='opacity-75 text-sm'>No pending notes</span>
                    </div>
                }


          </div>
        </main>
    </>
  )
}


export default NotesAdminPage;


export async function getServerSideProps({req, res}) {
    try {
        const {loggedAsAdmin} = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) {
          return {
            redirect : {
                destination : ADMIN_ACCOUNT,
                permanent : false
            }
          }
        }
        
        const notes = await getAllNotes();

        return {
            props : {
                allNotes : JSON.stringify(notes)
            }
        }
    } 
    catch (error) {
        return {
            props : {
                allNotes : []
            }
        }
    }
}