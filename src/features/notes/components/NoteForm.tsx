import type { SubmitEvent } from "react";
import { useNotesStore } from "../store/notesStore";
import { useTagsStore } from "../../tags/store/tagsStore";

function NoteForm() {
    const createNote = useNotesStore(state => state.createNote);
    const errors = useNotesStore(state => state.errors);
    const tags = useTagsStore(state => state.tags);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const text = formData.get("text") as string;
        const tagId = Number(formData.get("tag_id"));

        await createNote(text, tagId);

        if (useNotesStore.getState().status !== "error") {
            form.reset();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    name="text"
                    placeholder="Nouvelle note"
                    className="flex-1 rounded-md border border-sepia-300 bg-sepia-50 px-3 py-2 text-sepia-900 focus:border-sepia-600 focus:outline-none focus:ring-2 focus:ring-sepia-300"
                />
                <select
                    name="tag_id"
                    className="rounded-md border border-sepia-300 bg-sepia-50 px-3 py-2 text-sepia-900 focus:border-sepia-600 focus:outline-none focus:ring-2 focus:ring-sepia-300"
                >
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="rounded-md bg-sepia-800 px-4 py-2 font-medium text-sepia-50 transition-colors hover:bg-sepia-700"
                >
                    Créer
                </button>
            </div>
            {errors.text && <p className="text-sm text-red-600">{errors.text[0]}</p>}
            {errors.tag_id && <p className="text-sm text-red-600">{errors.tag_id[0]}</p>}
        </form>
    );
}

export default NoteForm;