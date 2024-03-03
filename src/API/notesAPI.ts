import { Note } from "../models/notes"
import axios from 'axios'


export async function getNotes(): Promise<Note[]>  {
    const response = await axios.get('http://localhost:5000/api/notes', { withCredentials: true })
    return response.data
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await axios.post('http://localhost:5000/api/notes', note, { withCredentials: true });
    return response.data;
}

export async function deleteNote(noteId: string) {
    const response = await axios.delete(`http://localhost:5000/api/notes/${noteId}`, { withCredentials: true });
    return response;
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await axios.patch(`http://localhost:5000/api/notes/${noteId}`, note, { withCredentials: true });
    return response.data;
}
