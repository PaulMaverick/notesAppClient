import { Card } from "react-bootstrap"
import { Note as NoteModel } from "../models/notes"
import styles from '../styles/Note.module.css'
import utilStyles from '../styles/utils.module.css'
import { formatDate } from "../utils/formatDate";
import { MdDelete } from 'react-icons/md'

interface NotesProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className: string,
}

function Notes({note, className, onNoteClicked, onDeleteNoteClicked}: NotesProps) {
    const { title, text, createdAt, updatedAt} = note

    let createdUpdatedText: string;

    if (updatedAt > createdAt || !createdAt) {
        createdUpdatedText = `Updated: ${formatDate(updatedAt)}`
    } else {
        createdUpdatedText = `Created: ${formatDate(createdAt)}`
    }
        
    return (
        <Card 
            className={`${styles.cardContainer} ${className}`}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={utilStyles.flexCenter}>
                    {title}
                    <MdDelete 
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note)
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Notes