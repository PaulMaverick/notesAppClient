import { useEffect, useState } from "react"
import { Button, Col, Row, Spinner } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { deleteNote, getNotes, } from '../API/notesAPI'
import Notes from '../components/Notes'
import { Note as NoteModel } from '../models/notes'
import utilStyles from '../styles/utils.module.css'
import AddNotes from "./AddNotes"
import styles from '../styles/App.module.css'

function PageLoginView() {
    const [notes, setNotes] = useState<NoteModel[]>([])
    const [notesLoading, setNotesLoading] = useState(true)
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
    const [showAddNote, setShowAddNote] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

    useEffect(() => {
        async function loadNotes() {
            try {
                setShowNotesLoadingError(false)
                setNotesLoading(true)
                const notesData = await getNotes();
                setNotes(notesData)
            } catch (error) {
                console.log(error)
                setShowNotesLoadingError(true)
            } finally {
                setNotesLoading(false)
            }
        }

        loadNotes()
    }, [])

    async function handleDeleteNote(note: NoteModel) {
        try {
            await deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }

    const notesGrid = 
        <Row
            xs={1}
            md={2}
            xl={3}
            className={`g-4 ${styles.notesGrid}`}
        >
            {notes.map((note) => (
            <Col key={note._id}>
                <Notes 
                note={note}   
                className={styles.note} 
                onDeleteNoteClicked={handleDeleteNote}
                onNoteClicked={setNoteToEdit}
                />
            </Col>
            ))}
        </Row>

    return (
        <>
            <Button 
                onClick={() => setShowAddNote(true)} 
                className={`mb-4 ${utilStyles.blockCenter} ${utilStyles.flexCenter}`}>
                <FaPlus />
                Add new note
            </Button>
            { notesLoading && <Spinner animation='border' variant='primary' />}
            { showNotesLoadingError && <p>Something went wrong! reload the page</p>}
            { !notesLoading && !showNotesLoadingError && 
                <>
                {
                        notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>
                } 
                </>
            }
            {
                showAddNote && 
                <AddNotes 
                onDismiss={() => setShowAddNote(false)} 
                onNotesSave={(newNote) => {
                    setNotes([...notes, newNote])
                    setShowAddNote(false)
                }}/>
            }
            { noteToEdit &&
                <AddNotes
                noteToEdit={noteToEdit}
                onDismiss={() => setNoteToEdit(null)}
                onNotesSave={(updatedNote) => {
                    setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
                    setNoteToEdit(null)
                }}
                />
            }
        
        </>
  )
}

export default PageLoginView