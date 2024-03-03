import { useForm } from "react-hook-form"
import { User } from "../models/user"
import { SignUpBody } from "../API/usersAPI"
import * as UsersApi from '../API/usersAPI'
import { Modal, Form, Button, Alert } from "react-bootstrap"
import TextInputField from "./form/TextInputField"
import utilStyles from '../styles/utils.module.css'
import { useState } from "react"

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,

}

function SignUpModal({onDismiss, onSignUpSuccessful}: SignUpModalProps) {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpBody>()
    const [errorMessage, setErrorMessage] = useState('')

    async function onSubmit(credentials: SignUpBody) {
        try {
            const newUser = await UsersApi.signUp(credentials);
            onSignUpSuccessful(newUser)
        } catch (error: any) {
            if(error.response?.status === 409) {
                setErrorMessage('Username/Email already taken')
            }
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    errorMessage && <Alert variant="danger">{errorMessage}</Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="username"
                        label="Username"
                        type='text'
                        placeholder="username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField 
                         name="email"
                         label="Email"
                         type='text'
                         placeholder="email"
                         register={register}
                         registerOptions={{required: "Required"}}
                         error={errors.email}
                    />
                    <TextInputField 
                         name="password"
                         label="Password"
                         type='password'
                         placeholder="password"
                         register={register}
                         registerOptions={{required: "Required"}}
                         error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={utilStyles.width100}
                    >
                        Sign Up
                    </Button>
                </Form >
            </Modal.Body>
        </Modal>
    ) 
}

export default SignUpModal