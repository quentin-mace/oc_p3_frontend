const FAKE_NOTES = [
    { id: 1, text: "Acheter du café", created_at: "2026-08-01T09:00:00Z" },
    { id: 2, text: "Relire le chapitre 3", created_at: "2026-08-02T14:30:00Z" },
];

function NoteList() {
    return (
        <ul className="flex flex-col gap-2">
            {FAKE_NOTES.map(note => (
                <li key={note.id} className="rounded-md border border-sepia-200 bg-sepia-100 p-3 text-sepia-900">
                    {note.text}
                </li>
            ))}
        </ul>
    );
}

export default NoteList;