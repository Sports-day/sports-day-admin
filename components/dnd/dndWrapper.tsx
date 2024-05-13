import {
    DndContext,
    KeyboardSensor,
    MeasuringStrategy,
    rectIntersection,
    useSensor,
    useSensors,
    PointerSensor, UniqueIdentifier, DragOverEvent, DragEndEvent, closestCorners
} from "@dnd-kit/core"
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable"
import {Dispatch, ReactNode, SetStateAction} from "react"
import DndContainer from "@/components/dnd/dndContainer"
import {Stack} from "@mui/material";

export type ItemData<I> = {
    itemId: UniqueIdentifier,
    itemData: I,
}

export type ContainerData<C, I> = {
    containerId: UniqueIdentifier,
    containerData: C,
    itemDataList: ItemData<I>[],
}

export type DndWrapperProps<C, I> = {
    data: ContainerData<C, I>[],
    setData: Dispatch<SetStateAction<ContainerData<C, I>[]>>,
    //  renderer
    containerRenderer: (containerData: C, itemComponents: ReactNode[]) => ReactNode,
    itemRenderer: (itemData: I) => ReactNode,
}

export default function DndWrapper<C, I>(props: DndWrapperProps<C, I>) {
    const findColumn = (unique: string | null) => {
        if (!unique) {
            return null
        }
        // overの対象がcolumnの場合があるためそのままidを返す
        if (props.data.some((c) => c.containerId === unique)) {
            return props.data.find((c) => c.containerId === unique) ?? null
        }
        const id = String(unique)
        const itemWithColumnId = props.data.flatMap((c) => {
            const containerId = c.containerId
            return c.itemDataList.map((i) => ({ itemId: i.itemId, containerId: containerId }))
        })
        const containerId = itemWithColumnId.find((i) => i.itemId === id)?.containerId
        return props.data.find((c) => c.containerId === containerId) ?? null
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over, delta } = event
        const activeId = String(active.id)
        const overId = over ? String(over.id) : null
        const activeColumn = findColumn(activeId)
        const overColumn = findColumn(overId)
        if (!activeColumn || !overColumn || activeColumn === overColumn) {
            return null
        }
        props.setData((prevState) => {
            const activeItems = activeColumn.itemDataList
            const overItems = overColumn.itemDataList
            const activeIndex = activeItems.findIndex((i) => i.itemId === activeId)
            const overIndex = overItems.findIndex((i) => i.itemId === overId)
            const newIndex = () => {
                const putOnBelowLastItem =
                    overIndex === overItems.length - 1 && delta.y > 0
                const modifier = putOnBelowLastItem ? 1 : 0
                return overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }
            return prevState.map((c) => {
                if (c.containerId === activeColumn.containerId) {
                    c.itemDataList = activeItems.filter((i) => i.itemId !== activeId)
                    return c
                } else if (c.containerId === overColumn.containerId) {
                    c.itemDataList = [
                        ...overItems.slice(0, newIndex()),
                        activeItems[activeIndex],
                        ...overItems.slice(newIndex(), overItems.length)
                    ]
                    return c
                } else {
                    return c
                }
            })
        })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        const activeId = String(active.id)
        const overId = over ? String(over.id) : null
        const activeColumn = findColumn(activeId)
        const overColumn = findColumn(overId)
        if (!activeColumn || !overColumn || activeColumn !== overColumn) {
            return null
        }
        const activeIndex = activeColumn.itemDataList.findIndex((i) => i.itemId === activeId)
        const overIndex = overColumn.itemDataList.findIndex((i) => i.itemId === overId)
        if (activeIndex !== overIndex) {
            props.setData((prevState) => {
                return prevState.map((column) => {
                    if (column.containerId === activeColumn.containerId) {
                        column.itemDataList = arrayMove(overColumn.itemDataList, activeIndex, overIndex)
                        return column
                    } else {
                        return column
                    }
                })
            })
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <Stack
                spacing={2}
                direction={"row"}
            >
            {props.data.map((container) => (
                <DndContainer
                    key={container.containerId}
                    data={container}
                    containerRenderer={props.containerRenderer}
                    itemRenderer={props.itemRenderer}
                />
            ))}
            </Stack>
        </DndContext>
    )
}
