import { Modal, Form, Button } from 'react-bootstrap';
import { Note } from '../models/notes';
import { useForm } from 'react-hook-form';
import { NoteInput, createNote, updateNote } from '../API/notesAPI';
import TextInputField from './form/TextInputField';

interface AddNoteProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNotesSave: (note: Note) => void,
}

function AddNotes({ noteToEdit, onDismiss, onNotesSave}: AddNoteProps) {
    const { register, 
            handleSubmit, 
            formState: {errors, isSubmitting}
    } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;
            if(noteToEdit) {
                console.log(input)
                noteResponse = await updateNote(noteToEdit._id, input)
            } else {
                noteResponse = await createNote(input);
            }
            onNotesSave(noteResponse);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }


    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? 'Edit Note' : 'Add Note'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="title"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.title}
                    />

                    <TextInputField 
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder='text'
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    type='submit'
                    form="addNoteForm"
                    disabled={isSubmitting}
                >
                    save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNotes