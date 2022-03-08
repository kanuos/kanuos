import { PasswordReset } from '../../components/admin/AccountBody';
import { HeadComponent } from '../../components/Head';
import { ADMIN_URLS } from '../../utils';
import { isAdminMiddleware } from '../../utils/authLib'

const PasswordResetPage = () => {
    return (
    <>
        <HeadComponent title="Admin Password Reset" />
        <main className="h-full min-h-screen main-light">
            <PasswordReset />
        </main>
    </>
)}

export default PasswordResetPage;




export async function getServerSideProps({req, res}) {
    try {
        const {loggedAsAdmin, error} = await isAdminMiddleware(req, res);
        if (loggedAsAdmin) throw error;
        return {
            props : { num : Date.now()}
        }
        
    } 
    catch (error) {
        return {
            redirect : {
                destination : ADMIN_URLS.dashboard.url,
                permanent : false
            }
        }
    }
}