import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import LoggedInView from './navbarViews/LoggedInView';
import LoggedOutView from './navbarViews/LoggedOutView';


interface NavBarProps {
    LoggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

function NavBar({ LoggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky='top'>
            <Container>
                <Navbar.Brand>
                    Notes App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar" role="group">
                    <Nav className='ms-auto'>
                        { LoggedInUser 
                            ? <LoggedInView 
                                user={LoggedInUser}
                                onLogoutSuccessful={onLogoutSuccessful}
                            />
                            : <LoggedOutView  
                                onLoginClicked={onLoginClicked}
                                onSignUpClicked={onSignUpClicked}
                            />


                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar