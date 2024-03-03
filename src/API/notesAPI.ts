import { Note } from "../models/notes"
import axios from 'axios'


export async function getNotes(): Promise<Note[]>  {
    const response = await axios.get('https://notesappapi.vercel.app/api/notes', { withCredentials: true })
    return response.data
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await axios.post('https://notesappapi.vercel.app/api/notes', note, { withCredentials: true });
    return response.data;
}

export async function deleteNote(noteId: string) {
    const response = await axios.delete(`https://notesappapi.vercel.app/${noteId}`, { withCredentials: true });
    return response;
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await axios.patch(`https://notesappapi.vercel.app/${noteId}`, note, { withCredentials: true });
    return response.data;
}
