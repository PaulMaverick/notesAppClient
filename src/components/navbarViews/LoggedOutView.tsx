import { Button } from "react-bootstrap"

interface LoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

function LoggedOutView({onSignUpClicked, onLoginClicked}: LoggedOutViewProps) {
  return (
    <>
        <Button onClick={onSignUpClicked}>Sign up</Button>
        <Button onClick={onLoginClicked}>Log in</Button>
    </>
  )
}

export default LoggedOutView