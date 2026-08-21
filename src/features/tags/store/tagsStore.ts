import {create} from "zustand";
import type {Tag} from "../../../shared/lib/apiTypes.ts";
import {fieldErrorsOf} from "../../../shared/lib/apiTypes.ts";
import {tagsApi} from "../api/tagsApi.ts";

interface TagsStore {
    tags: Tag[];
    status: 'idle' | 'loading' | 'error';
    errors: Record<string, string[]>;
    fetchTags: () => Promise<void>;
    createTag: (name: string) => Promise<void>;
}

export const useTagsStore = create<TagsStore>()(set => ({
    tags: [],
    status: 'idle',
    errors: {},
    fetchTags() {
        set({status: 'loading', errors: {}});
        return tagsApi.list()
            .then(tags => {
                set({tags, status: 'idle'});
            })
            .catch(error => {
                set({status: 'error', errors: fieldErrorsOf(error)});
            });
    },
    createTag(name: string) {
        set({status: 'loading', errors: {}});
        return tagsApi.create(name)
            .then(tag => {
                set(state => ({tags: [...state.tags, tag], status: 'idle'}));
            })
            .catch(error => {
                set({status: 'error', errors: fieldErrorsOf(error)});
            });
    },
}));