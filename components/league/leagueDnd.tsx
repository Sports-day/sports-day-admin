'use client'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Stack,
    Alert, Snackbar, Typography
} from "@mui/material";
import React, {useState, useEffect} from 'react';
import {
    DndContext,
    DragOverlay,
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

import {Team, teamFactory} from "@/src/models/TeamModel";
import {gameFactory} from "@/src/models/GameModel";
import {Sport} from "@/src/models/SportModel";
import {HiPlus, HiTrash} from "react-icons/hi2";
import {useAsync} from "react-use";

export type LeagueDndProps = {
    sportId: number
    sport: Sport
}

export default function LeagueDnd(props: LeagueDndProps) {
    const {sportId} = props;

    // ドラッグ&ドロップでソート可能なリスト
    const [items, setItems] = useState<{ [key: string]: string[]; }>({
        All: [],
    });

    useEffect(() => {
        const fetchGameEntries = async () => {
            const games = await gameFactory().index();
            const sportGames = games.filter(game => game.sportId === sportId);
            for (const game of sportGames) {
                const entries = await gameFactory().getGameEntries(game.id);
                setItems(prevItems => ({
                    ...prevItems,
                    All: entries.map(entry => entry.id.toString()),
                }));
            }
        };

        fetchGameEntries();
    }, [sportId]);

    const addNewList = () => {
        // アルファベットの文字列を作成
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // 現在のリストの数をアルファベットのインデックスとして使用
        const nextIndex = Object.keys(items).length - 1; // -1 because we already have 'All' list

        // リストの数が26を超えるか、次の文字が存在しない場合は新しいリストを追加しない
        if (nextIndex >= 26 || !alphabet[nextIndex]) {
            alert("これ以上リーグを作成できません")
            return;
        }

        const nextLetter = alphabet[nextIndex];
        setItems(prevItems => ({
            ...prevItems,
            [`リーグ${nextLetter}`]: [],
        }));
    };

    const removeList = (key: string) => {
        setItems(prevItems => {
            const newItems = {...prevItems};
            // 削除する配列の中に値があるか確認
            if (newItems[key].length > 0) {
                // 値がある場合、その値をAll配列に追加
                newItems['All'] = [...newItems['All'], ...newItems[key]];
            }
            // 指定された配列を削除
            delete newItems[key];
            return newItems;
        });
    };

    // state
    const [openDialog, setOpenDialog] = useState(false);
    const [listToRemove, setListToRemove] = useState("");
    const [delSnackOpen, setDelSnackOpen] = useState<boolean>(false)

    const handleDelSnackClose = () => {
        setDelSnackOpen(false)
    }

    // Open the dialog
    const handleOpenDialog = (key: string) => {
        setListToRemove(key);
        setOpenDialog(true);
    };

    // Close the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Remove the list and close the dialog
    const handleRemoveList = () => {
        removeList(listToRemove);
        setOpenDialog(false);
        setDelSnackOpen(true);
    };

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
                    {Object.keys(items).map((key) => (
                        <Stack direction={"column"}>
                            {key == 'All' &&
                                <>
                                    <Button
                                        variant={"contained"}
                                        startIcon={<HiPlus/>}
                                        onClick={addNewList}
                                        sx={{maxWidth:"148px"}}
                                    >
                                        リーグ追加
                                    </Button>
                                    <SortableContainer
                                        key={key}
                                        id={key}
                                        items={items[key]}
                                        label={"未登録チーム"}
                                    />
                                </>
                            }
                            {key !== 'All' &&
                                <>
                                    <Button
                                        variant={"outlined"}
                                        startIcon={<HiTrash/>}
                                        color={"error"}
                                        onClick={() => handleOpenDialog(key)}>
                                        削除
                                    </Button>
                                    <SortableContainer
                                        key={key}
                                        id={key}
                                        items={items[key]}
                                        label={key}
                                    />
                                </>
                            }
                        </Stack>
                    ))}
                    {/* Dialog */}
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                    >
                        <DialogTitle sx={{pt:3}}>{listToRemove}を削除しますか？</DialogTitle>
                        <DialogContent>
                            <Typography>
                                削除すると、{listToRemove}に入っていたチームはチーム一覧に戻されます。
                            </Typography>
                            <Typography>
                                削除したリーグは復元できません。よろしいですか？
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{p:3}}>
                            <Button startIcon={<HiTrash/>} variant={"contained"} onClick={handleRemoveList} color="error">
                                削除
                            </Button>
                            <Button sx={{flexGrow: 3}} variant={"contained"} onClick={handleCloseDialog}>
                                キャンセル
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar
                        open={delSnackOpen}
                        autoHideDuration={6000}
                        onClose={handleDelSnackClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={handleDelSnackClose}
                            severity="info"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {listToRemove}が削除されました。
                        </Alert>
                    </Snackbar>
                    {/* DragOverlay */}
                    <DragOverlay>{activeId ? <Item id={activeId}/> : null}</DragOverlay>
                </DndContext>
            </Stack>
        </>
    );
};