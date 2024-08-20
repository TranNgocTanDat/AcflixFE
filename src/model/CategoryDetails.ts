import { Film } from "./Film";

export default interface CategoryDetails {
    id: number;
    name: string;
    films: Film[];
}