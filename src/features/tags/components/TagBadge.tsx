function TagBadge({ name }: { name: string }) {
    return (
        <span className="inline-block rounded-full bg-sepia-200 px-2 py-0.5 text-xs font-medium text-sepia-800">
            {name}
        </span>
    );
}

export default TagBadge;