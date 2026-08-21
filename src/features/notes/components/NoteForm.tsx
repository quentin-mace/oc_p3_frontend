import type { SubmitEvent } from "react";

function NoteForm() {
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                name="text"
                placeholder="Nouvelle note"
                className="flex-1 rounded-md border border-sepia-300 bg-sepia-50 px-3 py-2 text-sepia-900 focus:border-sepia-600 focus:outline-none focus:ring-2 focus:ring-sepia-300"
            />
            <button
                type="submit"
                className="rounded-md bg-sepia-800 px-4 py-2 font-medium text-sepia-50 transition-colors hover:bg-sepia-700"
            >
                Créer
            </button>
        </form>
    );
}

export default NoteForm;