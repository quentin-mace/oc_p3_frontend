import type {Note} from "../../../shared/lib/apiTypes.ts";
import TagBadge from "../../tags/components/TagBadge";
import {useNotesStore} from "../store/notesStore";

function NoteItem({ note }: { note: Note }) {
    const deleteNote = useNotesStore(state => state.deleteNote);

    return (
        <li className="flex items-center justify-between rounded-md border border-sepia-200 bg-sepia-100 p-3">
            <div className="flex flex-col gap-1">
                <span className="text-sepia-900">{note.text}</span>
                <div className="flex items-center gap-2">
                    <TagBadge name={note.tag.name} />
                    <span className="text-xs text-sepia-500">{new Date(note.created_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button
                onClick={() => deleteNote(note.id)}
                aria-label="Supprimer"
                className="rounded-md border border-red-300 p-2 text-red-600 hover:bg-red-50 hover:text-red-800"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
            </button>
        </li>
    );
}

export default NoteItem;