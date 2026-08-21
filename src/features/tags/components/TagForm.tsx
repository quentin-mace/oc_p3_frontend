import type { SubmitEvent } from "react";
import { useTagsStore } from "../store/tagsStore";

function TagForm() {
    const createTag = useTagsStore(state => state.createTag);
    const errors = useTagsStore(state => state.errors);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;

        await createTag(name);

        if (useTagsStore.getState().status !== "error") {
            form.reset();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    name="name"
                    maxLength={50}
                    placeholder="Nouveau tag"
                    className="flex-1 rounded-md border border-sepia-300 bg-sepia-50 px-3 py-2 text-sepia-900 focus:border-sepia-600 focus:outline-none focus:ring-2 focus:ring-sepia-300"
                />
                <button
                    type="submit"
                    className="rounded-md bg-sepia-800 px-4 py-2 font-medium text-sepia-50 transition-colors hover:bg-sepia-700"
                >
                    Ajouter
                </button>
            </div>
            {errors.name && <p className="text-sm text-red-600">{errors.name[0]}</p>}
        </form>
    );
}

export default TagForm;