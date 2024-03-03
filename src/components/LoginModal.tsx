import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { LoginBody } from '../API/usersAPI';
import * as UsersApi from '../API/usersAPI'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './form/TextInputField';
import { useState } from 'react';

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

function LoginModal({onDismiss, onLoginSuccessful}: LoginModalProps) {
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginBody>()
    const [errorMessage, setErrorMessage] = useState('')
  
    async function onSubmit(credentials: LoginBody) {
        try {
            const user = await UsersApi.login(credentials);
            onLoginSuccessful(user)
        } catch (error: any) {
            if(error.response?.status === 401) {
                setErrorMessage('Incorrect Username/Password')
            }
        }
    }
    
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    errorMessage && <Alert variant='danger'>{errorMessage}</Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="username"
                        register={register}
                        registerOptions={{required: "Requied"}}
                        error={errors.username}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        register={register}
                        registerOptions={{required: "Requied"}}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
  )
}

export default LoginModal