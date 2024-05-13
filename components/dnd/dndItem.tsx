import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import {ItemData} from "@/components/dnd/dndWrapper"
import {ReactNode} from "react"

export type DndItemProps<I> = {
    data: ItemData<I>,
    itemRenderer: (itemData: I) => ReactNode,
}

export default function DndItem<I>(props: DndItemProps<I>) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: props.data.itemId
    })

    const style = {
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {
                props.itemRenderer(props.data.itemData)
            }
        </div>
    )
}
