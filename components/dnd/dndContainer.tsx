import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import {ContainerData} from "@/components/dnd/dndWrapper"
import {ReactNode} from "react"
import DndItem from "@/components/dnd/dndItem"

export type DndContainerProps<C, I> = {
    data: ContainerData<C, I>
    //  renderer
    containerRenderer: (containerData: C, itemComponents: ReactNode[]) => ReactNode,
    itemRenderer: (itemData: I) => ReactNode,
}

export default function DndContainer<C, I>(props: DndContainerProps<C, I>) {
    const { setNodeRef } = useDroppable({ id: props.data.containerId })

    const itemComponents = props.data.itemDataList.map((item) => {
        return (
            <DndItem
                key={item.itemId}
                data={item}
                itemRenderer={props.itemRenderer}
            />
        )
    })

    return (
        <SortableContext
            id={props.data.containerId.toString()}
            items={props.data.itemDataList.map((item) => item.itemId)}
            strategy={rectSortingStrategy}
        >
            <div
                ref={setNodeRef}
            >
                {
                    props.containerRenderer(props.data.containerData, itemComponents)
                }
            </div>
        </SortableContext>
    )
}
