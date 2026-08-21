import NoteForm from "../../features/notes/components/NoteForm.tsx";
import NoteList from "../../features/notes/components/NoteList.tsx";
import TagForm from "../../features/tags/components/TagForm.tsx";
import TagList from "../../features/tags/components/TagList.tsx";

function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <section className="rounded-xl border border-sepia-200 bg-sepia-100 p-6 shadow-sm">
                <h2 className="mb-4 font-serif text-lg font-bold text-sepia-900">Notes</h2>
                <NoteForm />
                <NoteList />
            </section>
            <section className="rounded-xl border border-sepia-200 bg-sepia-100 p-6 shadow-sm">
                <h2 className="mb-4 font-serif text-lg font-bold text-sepia-900">Tags</h2>
                <TagForm />
                <div className="mt-3">
                    <TagList />
                </div>
            </section>
        </div>
    );
}

export default DashboardPage;