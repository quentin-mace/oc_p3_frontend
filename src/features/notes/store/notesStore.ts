import {create} from "zustand";
import type {Note} from "../../../shared/lib/apiTypes.ts";
import {fieldErrorsOf} from "../../../shared/lib/apiTypes.ts";
import {notesApi} from "../api/notesApi.ts";

interface NotesStore {
    notes: Note[];
    status: 'idle' | 'loading' | 'error';
    errors: Record<string, string[]>;
    fetchNotes: () => Promise<void>;
    createNote: (text: string, tagId: number) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
}

export const useNotesStore = create<NotesStore>()(set => ({
    notes: [],
    status: 'idle',
    errors: {},
    fetchNotes() {
        set({status: 'loading', errors: {}});
        return notesApi.list()
            .then(notes => {
                set({notes, status: 'idle'});
            })
            .catch(error => {
                set({status: 'error', errors: fieldErrorsOf(error)});
            });
    },
    createNote(text: string, tagId: number) {
        set({status: 'loading', errors: {}});
        return notesApi.create({text, tagId})
            .then(() => notesApi.list())
            .then(notes => {
                set({notes, status: 'idle'});
            })
            .catch(error => {
                set({status: 'error', errors: fieldErrorsOf(error)});
            });
    },
    deleteNote(id: number) {
        set({status: 'loading', errors: {}});
        return notesApi.remove(id)
            .then(() => {
                set(state => ({notes: state.notes.filter(note => note.id !== id), status: 'idle'}));
            })
            .catch(error => {
                set({status: 'error', errors: fieldErrorsOf(error)});
            });
    },
}));