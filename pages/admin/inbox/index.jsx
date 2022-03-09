// Messages ADMIN page
// auth required

import { useState } from 'react';
import { IoMailOutline, IoMailUnreadOutline } from 'react-icons/io5';
import { HeadComponent } from '../../../components/Head'
import { NavBar } from '../../../components/public/Nav';
import { getAllMessagesFromDB } from '../../../database/messages'
import axios from 'axios';
import { API_ROUTES } from '../../../utils/admin'
import { ADMIN_ACCOUNT } from '../../../utils';
import { isAdminMiddleware } from '../../../utils/authLib'

const InboxAdminPage = ({allMessages}) => {
    const [messages, setMessages] = useState(allMessages ? JSON.parse(allMessages) : []);

    async function handleDelete(messageID) {
        try {
            let confirmDelete = confirm('Confirm delete?');
            if (confirmDelete) {
                const {deleted, error} = (await axios({
                    method : 'DELETE',
                    url : `${API_ROUTES.messages}/${messageID}`
                })).data;

                if (error) throw error;

                setMessages(prev => prev.filter(n => n._id !== deleted._id))
            }
            
        } 
        catch (error) {
            alert(error)
        }
    }

    async function handleEdit(msg) {
        try {
            const {error, edited} = (await axios({
                url : `${API_ROUTES.messages}/${msg._id}`,
                data : { isRead : msg.isRead },
                method : 'PUT'
            })).data;  

            if (error) throw error;
            
            setMessages(prev => prev.map(el => el._id === edited._id ? edited : el));
        } 
        catch (error) {
            alert(error)
        }
    }

    return (
    <>
        <HeadComponent title="ADMIN | Inbox Management" />
        <NavBar type='admin' left={true}/>
        <main className="min-h-screen h-full p-16 main-light text-dark">
            
            <div className="w-full max-w-2xl mx-auto">
                <h1 className="font-special text-center text-3xl md:text-4xl capitalize mb-2">
                    Inbox { messages.length > 0 && <small>({messages.length})</small>}
                </h1>
                

                {
                messages.length > 0 &&
                <ul className="flex flex-col gap-6 items-stretch justify-start w-full pt-4 border-t">
                {messages.sort((a,b) => a._id - b._id).map(n => (
                    <li key={n._id}
                    className="text-sm p-4 bg-light filter drop-shadow-xl rounded-md transition-all group">
                        <details className='w-full text-xs'>
                            <summary className='flex items-center justify-between text-sm select-none group-hover:text-primary cursor-pointer'>
                                <span className={'font-semibold text-xs capitalize ' + (n.isRead ? 'text-secondary' : 'text-primary')}>
                                    {n.name}
                                </span>
                                {!n.isRead ? <IoMailUnreadOutline className='text-primary' /> : <IoMailOutline className='text-secondary' />}
                            </summary>
                            <p className='my-4 font-semibold break-words whitespace-pre-line'>
                                <small>
                                    {n.message}
                                </small>
                            </p>
                            <small>
                                Status : {n.isRead ? 'Read' : 'Unread'}
                            </small>
                            <br />
                            <small>
                                Date : {new Date(n.date).toDateString()}
                            </small>
                            <ul className="flex items-center justify-start gap-x-4 text-xs pt-4 w-full border-t">
                                <li className='text-dark hover:text-secondary py-0.5 px-3 border-current border rounded'>
                                    <button onClick={() => handleEdit(n)}>
                                        {n.isRead && 
                                        <small>
                                            Mark as unread
                                        </small>
                                        }
                                        {!n.isRead && 
                                        <small>
                                            Mark as read
                                        </small>
                                        }
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

                {messages.length === 0 && 
                    <div className='h-[50vh] flex items-center justify-center'>
                        <span className='opacity-75 text-sm'>No pending messages</span>
                    </div>
                }


          </div>
        </main>
    </>
  )
}


export default InboxAdminPage;


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
        const messages = await getAllMessagesFromDB();
        
        return {
            props : {
                allMessages : JSON.stringify(messages)
            }
        }
    } 
    catch (error) {
        return {
            props : {
                allMessages : JSON.stringify([])
            }
        }
    }
}