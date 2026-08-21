import { useEffect } from "react";
import { useTagsStore } from "../store/tagsStore";
import TagBadge from "./TagBadge";

function TagList() {
    const tags = useTagsStore(state => state.tags);
    const fetchTags = useTagsStore(state => state.fetchTags);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    if (tags.length === 0) {
        return <p className="text-sm text-sepia-500">Aucun tag pour l'instant.</p>;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <TagBadge key={tag.id} name={tag.name} />
            ))}
        </div>
    );
}

export default TagList;