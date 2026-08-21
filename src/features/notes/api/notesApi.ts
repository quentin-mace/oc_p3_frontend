import {httpClient} from "../../../shared/lib/httpClient.ts";
import type {Note} from "../../../shared/lib/apiTypes.ts";

class NotesApi {
    list(): Promise<Note[]>
    {
        return httpClient.get('/notes').then(response => response.data.data);
    }

    create(payload: {text: string, tagId: number}): Promise<void>
    {
        return httpClient.post('/notes', {text: payload.text, tag_id: payload.tagId}).then(() => undefined);
    }

    remove(id: number): Promise<void>
    {
        return httpClient.delete(`/notes/${id}`).then(() => undefined);
    }
}

export const notesApi = new NotesApi();