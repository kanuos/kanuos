import { createContext, useState, useEffect } from 'react'


export const AdminAuthContext = createContext()


const STORAGE_NAME = 'sounak_admin'

const AdminAuthContextProvider = ({children}) => {
    
    const [admin, setAdmin] = useState(null)

    function handleAdminContextStatus(user) {
        setAdmin(user);
        console.log({s: 'auth context ',user})
        sessionStorage.setItem(STORAGE_NAME, JSON.stringify(user))
    }

    useEffect(() => {
        const storageAdmin = sessionStorage.getItem(STORAGE_NAME);

        if (storageAdmin) {
            setAdmin(JSON.parse(storageAdmin));
        }
    }, [])

    return (
        <AdminAuthContext.Provider value={{admin, handleAdminContextStatus}}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthContextProvider