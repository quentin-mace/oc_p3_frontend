import { useEffect } from "react";
import { useNotesStore } from "../store/notesStore";
import NoteItem from "./NoteItem";

function NoteList() {
    const notes = useNotesStore(state => state.notes);
    const fetchNotes = useNotesStore(state => state.fetchNotes);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    if (notes.length === 0) {
        return <p className="text-sm text-sepia-500">Aucune note pour l'instant.</p>;
    }

    return (
        <ul className="flex flex-col gap-2">
            {notes.map(note => (
                <NoteItem key={note.id} note={note} />
            ))}
        </ul>
    );
}

export default NoteList;