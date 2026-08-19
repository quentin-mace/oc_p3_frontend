import axios from "axios";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const response = await axios.get<Post>("https://jsonplaceholder.typicode.com/todos");

console.log(response.data);