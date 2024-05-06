'use client'
import {Stack} from "@mui/material";
import React, {useState} from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    UniqueIdentifier,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent, rectIntersection,
} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import SortableContainer from "./dndContainer";
import Item from "./dndItem";

const LeagueDnd: React.FC = () => {
    // ドラッグ&ドロップでソート可能なリスト
    const [items, setItems] = useState<{
        [key: string]: string[];
    }>({
        チーム一覧: ["A", "B", "C"],
        Aリーグ: ["D", "E", "F"],
        Bリーグ: ["G", "H", "I"],
        Cリーグ: ["J", "K", "L"],
    });

    //リストのリソースid（リストの値）
    const [activeId, setActiveId] = useState<UniqueIdentifier>();

    // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    //各コンテナ取得関数
    const findContainer = (id: UniqueIdentifier) => {
        if (id in items) {
            return id;
        }
        return Object.keys(items).find((key: string) =>
            items[key].includes(id.toString())
        );
    };

    // ドラッグ開始時に発火する関数
    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event;
        //ドラッグしたリソースのid
        const id = active.id.toString();
        setActiveId(id);
    };

    //ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動時に発火する関数
    const handleDragOver = (event: DragOverEvent) => {
        const {active, over} = event;
        //ドラッグしたリソースのid
        const id = active.id.toString();
        //ドロップした場所にあったリソースのid
        const overId = over?.id;

        if (!overId) return;

        // ドラッグ、ドロップ時のコンテナ取得
        // container1,container2,container3,container4のいずれかを持つ
        const activeContainer = findContainer(id);
        const overContainer = findContainer(over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setItems((prev) => {
            // 移動元のコンテナの要素配列を取得
            const activeItems = prev[activeContainer];
            // 移動先のコンテナの要素配列を取得
            const overItems = prev[overContainer];

            // 配列のインデックス取得
            const activeIndex = activeItems.indexOf(id);
            const overIndex = overItems.indexOf(overId.toString());

            let newIndex;
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem = over && overIndex === overItems.length - 1;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item !== active.id),
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                ],
            };
        });
    };

    // ドラッグ終了時に発火する関数
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        //ドラッグしたリソースのid
        const id = active.id.toString();
        //ドロップした場所にあったリソースのid
        const overId = over?.id;

        if (!overId) return;

        // ドラッグ、ドロップ時のコンテナ取得
        // container1,container2,container3,container4のいずれかを持つ
        const activeContainer = findContainer(id);
        const overContainer = findContainer(over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        // 配列のインデックス取得
        const activeIndex = items[activeContainer].indexOf(id);
        const overIndex = items[overContainer].indexOf(overId.toString());

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(
                    items[overContainer],
                    activeIndex,
                    overIndex
                ),
            }));
        }
        setActiveId(undefined);
    };

    return (
        <>
            <Stack direction={"row"} spacing={2} overflow={"scroll"}>
                <DndContext
                    sensors={sensors}
                    // collisionDetection={closestCorners}
                    collisionDetection={rectIntersection}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    {/* SortableContainer */}
                    <SortableContainer
                        id="チーム一覧"
                        items={items.チーム一覧}
                        label="チーム一覧"
                    />
                    <SortableContainer
                        id="Aリーグ"
                        label="Aリーグ"
                        items={items.Aリーグ}
                    />
                    <SortableContainer
                        id="Bリーグ"
                        label="Bリーグ"
                        items={items.Bリーグ}
                    />
                    <SortableContainer
                        id="Cリーグ"
                        label="Cリーグ"
                        items={items.Cリーグ}
                    />
                    {/* DragOverlay */}
                    <DragOverlay>{activeId ? <Item id={activeId}/> : null}</DragOverlay>
                </DndContext>
            </Stack>
        </>
    );
};

export default LeagueDnd;
