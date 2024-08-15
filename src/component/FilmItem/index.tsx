import {Film} from "../../model/Film.ts";


interface FilmItemProps {
    data: Film,
    active: boolean
}


const FimItem = (props: FilmItemProps) => {
    return (
        <div>
            {props.data.name}
        </div>
    );
};

export default FimItem;
