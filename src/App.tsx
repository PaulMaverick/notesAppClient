import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import styles from './styles/App.module.css';
import { User } from './models/user';
import * as usersApi from './API/usersAPI';
import PageLoginView from './components/PageLoginView';
import NotesPageLogoutView from './components/NotesPageLogoutView';

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User|null>(null);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        async function getloggedInUser() {
            try {
                const user = await usersApi.getLoggedInUser()
                console.log(user)
                setLoggedInUser(user)
            } catch (error) {
                console.log(error, 'error')
            }
        }

        getloggedInUser();
    },[])

    return (
        <div>

            <NavBar 
                LoggedInUser={loggedInUser}
                onSignUpClicked={() => setShowSignUpModal(true)}
                onLoginClicked={() => setShowLoginModal(true)}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <Container className={styles.notesPage}>
                <>
                    {
                        loggedInUser ?
                        <PageLoginView />
                        : <NotesPageLogoutView/>
                    }
                </>
            </Container>
            {
                showSignUpModal &&
                <SignUpModal 
                    onDismiss={() => setShowSignUpModal(false)}
                    onSignUpSuccessful={(user) => {
                        setLoggedInUser(user)
                        setShowSignUpModal(false)
                    }}
                />
            }
            {
                showLoginModal &&
                <LoginModal 
                    onDismiss={() => setShowLoginModal(false)}
                    onLoginSuccessful={(user) => {
                        setLoggedInUser(user)
                        setShowLoginModal(false)
                    }}
                />
            }
        </div>
    )
}

export default App
