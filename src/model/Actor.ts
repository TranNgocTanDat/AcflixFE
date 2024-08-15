import Image from "./Image.ts";

export default interface Actor{
    id: string;
    name: string;
    images: Image[];
}