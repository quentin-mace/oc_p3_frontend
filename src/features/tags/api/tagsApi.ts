import {httpClient} from "../../../shared/lib/httpClient.ts";
import type {Tag} from "../../../shared/lib/apiTypes.ts";

class TagsApi {
    list(): Promise<Tag[]>
    {
        return httpClient.get('/tags').then(response => response.data.data);
    }

    create(name: string): Promise<Tag>
    {
        return httpClient.post('/tags', {name}).then(response => response.data.data);
    }
}

export const tagsApi = new TagsApi();