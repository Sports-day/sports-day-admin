import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./dndSortableItem";
import {Stack} from "@mui/material";

const SortableContainer = ({
                               id,
                               items,
                               label,
                           }: {
    id: string;
    items: string[];
    label: string;
}) => {
    const { setNodeRef } = useDroppable({
        id,
    });
    return (
        <div>
            <h3>{label}</h3>
            <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
                <div
                    ref={setNodeRef}
                >
                    <Stack spacing={1}>
                        {items.map((id: string) => (
                            <SortableItem key={id} id={id} />
                        ))}
                    </Stack>
                </div>
            </SortableContext>
        </div>
    );
};

export default SortableContainer;
