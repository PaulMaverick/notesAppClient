import { User } from "../../models/user"
import * as UsersApi from '../../API/usersAPI'
import { Button, Navbar } from "react-bootstrap";

interface LoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

function LoggedInView({user, onLogoutSuccessful}: LoggedInViewProps) {
    async function logout() {
        try {
            await UsersApi.logout();
            onLogoutSuccessful()
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }
  
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>
                Log out
            </Button>
        </>
    )
}

export default LoggedInView