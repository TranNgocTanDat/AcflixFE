import { SimpleUser } from "./SimpleUser";

export interface Comment {
    content: string;
    user: SimpleUser;
    createdAt: string;
}