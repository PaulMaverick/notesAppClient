import { Form } from 'react-bootstrap';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface textInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [X: string]: any,
}

function TextInputField({name, label, register, registerOptions, error, ...props} :textInputFieldProps) {

    
    return (
        <Form.Group className='mb-3' controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default TextInputField