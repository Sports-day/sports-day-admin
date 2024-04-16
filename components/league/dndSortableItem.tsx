import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./dndItem";
import {Card} from "@mui/material";

const SortableItem = ({ id }: { id: UniqueIdentifier }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <Card sx={{p:1.5, backgroundColor:"primary.dark", color:"secondary.main", width:"130px", overflow:"hidden"}}>
                <Item id={id} />
            </Card>
        </div>
    );
};

export default SortableItem;