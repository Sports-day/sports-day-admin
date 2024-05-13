import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./dndItem";

const SortableItem = ({ id }: { id: UniqueIdentifier }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
                <Item id={id} />
        </div>
    );
};

export default SortableItem;