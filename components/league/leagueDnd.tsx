'use client'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Alert, Snackbar, Typography, Tooltip,
    TextField
} from "@mui/material";
import {HiPlus, HiTrash} from "react-icons/hi2";
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

import React, {useState, useEffect} from 'react';
import {gameFactory} from "@/src/models/GameModel";
import {teamFactory} from "@/src/models/TeamModel";
import {teamTagFactory} from "@/src/models/TeamTagModel";
import {Sport} from "@/src/models/SportModel";

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
        const fetchGames = async () => {
            const games = await gameFactory().index();
            const sportGames = games.filter(game => game.sportId === sportId);

            // 各ゲームに対応するチームを取得する関数
            const fetchTeamsForGame = async (gameId: number) => {
                const teams = await teamFactory().index();
                return teams.filter(team => team.enteredGameIds.includes(gameId));
            };

            // 各ゲームに対応するチームの配列を作成
            const gameItems: Record<string, string[]> = {};
            // 初期化
            gameItems['All'] = [];

            for (const game of sportGames) {
                const teams = await fetchTeamsForGame(game.id);
                gameItems[game.name] = teams.map(team => team.id.toString());
            }

            // すべてのチームを取得
            const allTeams = await teamFactory().index();
            // 全てのチームタグを取得
            const allTeamTags = await teamTagFactory().index();
            // propsのsportId と TeamTagのsportIdが一致するものを検索
            const sportTeamTag = allTeamTags.find(teamTag => teamTag.sportId === sportId);
            // sportTeamTagに属するチームを抽出
            // sportTeamTagがundefinedの場合、全てのチームを対象とする
            const sportTeams = allTeams.filter(team => sportTeamTag ? team.teamTagId === sportTeamTag.id : true);

            // どのゲームにも参加していないチームを抽出
            const noGameTeams = sportTeams.filter(team => !team.enteredGameIds.some(id => games.map(game => game.id).includes(id)));

            // All配列にどのゲームにも参加していないチームを追加
            gameItems['All'] = noGameTeams.map(team => team.id.toString());

            setItems(gameItems);
        };
        void fetchGames();
    }, [sportId]);

    const addNewList = async () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nextIndex = Object.keys(items).length - 1;

        if (nextIndex >= 26 || !alphabet[nextIndex]) {
            alert("これ以上リーグを作成できません")
            return;
        }

        const nextLetter = alphabet[nextIndex];
        const prefix = props.sport.tagId === 1 ? '晴天時' : props.sport.tagId === 2 ? '雨天時' : '';
        setItems(prevItems => ({
            ...prevItems,
            [`${prefix}${nextLetter}リーグ`]: [],
        }));

        const newGame = await gameFactory().create({
            name: `${prefix}${nextLetter}リーグ`,
            sportId: props.sport.id,
            description: props.sport.name,
            type: "league",
            calculationType: "total_score",
            weight: 0,
            tagId: null
        });
        setMoveSnackOpen(false)
        setMoveSnackOpen(true)
    };

    const removeList = async (key: string) => {
        const games = await gameFactory().index();

        setItems(prevItems => {
            const newItems = {...prevItems};
            // 削除する配列の中に値があるか確認
            if (newItems[key].length > 0) {
                // 値がある場合、その値をAll配列に追加
                newItems['All'] = [...newItems['All'], ...newItems[key]];
            }
            // 指定された配列を削除
            delete newItems[key];

            // アルファベットの文字列を作成
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let index = 0;

            // 新しいオブジェクトを作成し、削除したリスト以外のすべてのリストをコピーします
            const reorderedItems = Object.keys(newItems).reduce<{ [key: string]: string[]; }>((obj, listKey) => {
                if (listKey !== 'All') {
                    // 新しい名前を割り当てます（アルファベット順）
                    const prefix = props.sport.tagId === 1 ? '晴天時' : props.sport.tagId === 2 ? '雨天時' : '';
                    obj[`${prefix}${alphabet[index]}リーグ`] = newItems[listKey];
                    index++;
                } else {
                    obj[listKey] = newItems[listKey];
                }
                return obj;
            }, {});

            return reorderedItems;
        });

        const gameToDelete = games.find(game => game.name === listToRemove);
        if (gameToDelete) {
            await gameFactory().delete(gameToDelete.id);
        }
    };

    // state
    const [openDialog, setOpenDialog] = useState(false);
    const [listToRemove, setListToRemove] = useState("");
    const [delSnackOpen, setDelSnackOpen] = useState<boolean>(false)
    const [moveSnackOpen, setMoveSnackOpen] = useState<boolean>(false)
    const [newListName, setNewListName] = useState<string>('')

    const handleDelSnackClose = () => {
        setDelSnackOpen(false)
    }

    const handleMoveSnackClose = () => {
        setMoveSnackOpen(false)
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

    const handleListNameChange = (key: string) => {
        setItems(prevItems => {
            const newItems = {...prevItems};
            newItems[newListName] = newItems[key];
            delete newItems[key];
            return newItems;
        });
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
        console.log(`id: ${id.toString()}`)
        if (id in items) {
            console.log("id in items")
            return id;
        }

        const container = Object.keys(items).find((key: string) =>
            items[key].includes(id.toString())
        );

        if (!container) {
            console.log("Not found id")
        }
        else {
            console.log("keys(items).find()")
        }

        return container
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
        console.log("Over1", id, over?.id.toString())

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
            console.log ("Over2", id, overId.toString())

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
    const handleDragEnd = async (event: DragEndEvent) => {
        console.log("ドラックエンド!")
        const games = await gameFactory().index();
        const gamesToDelete = games.filter(game => game.sportId === props.sport.id);

        // Delete games that match the sportId
        for (const game of gamesToDelete) {
            await gameFactory().delete(game.id);
        }

        // Create new games and add teams to them
        for (const [key, value] of Object.entries(items)) {
            if (key !== 'All') {
                const newGame = await gameFactory().create({
                    name: key,
                    sportId: props.sport.id,
                    description: props.sport.name,
                    type: "league",
                    calculationType: "total_score",
                    weight: 0,
                    tagId: null
                });

                for (const teamId of value) {
                    await gameFactory().addGameEntries(newGame.id, [parseInt(teamId)]);
                }
            }
        }
        setMoveSnackOpen(false)
        setMoveSnackOpen(true)
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
                        <Stack key={key} direction={"column"} spacing={1} justifyContent={"center"} alignItems="center">
                            {key == 'All' &&
                                <>
                                    <Typography>未登録チーム</Typography>
                                    <Button
                                        size={"small"}
                                        variant={"contained"}
                                        startIcon={<HiPlus/>}
                                        onClick={addNewList}
                                        sx={{maxWidth:"168px", width:"100%"}}
                                    >
                                        リーグ追加
                                    </Button>
                                    <SortableContainer
                                        id={key}
                                        items={items[key]}
                                        label={"未登録チーム"}
                                    />
                                </>
                            }
                            {key !== 'All' &&
                                <>
                                    <Tooltip title={"description"} placement={"top"}>
                                        <Typography>{key}</Typography>
                                    </Tooltip>
                                    <Button
                                        size={"small"}
                                        variant={"outlined"}
                                        startIcon={<HiTrash/>}
                                        color={"error"}
                                        onClick={() => handleOpenDialog(key)}
                                        sx={{maxWidth: "168px", width: "100%"}}
                                    >
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
                        <DialogTitle sx={{pt: 3}}>{listToRemove}を削除しますか？</DialogTitle>
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
                    {/* League Remove Snackbar */}
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
                    {/* League Move Snackbar */}
                    <Snackbar
                        open={moveSnackOpen}
                        autoHideDuration={6000}
                        onClose={handleMoveSnackClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={handleMoveSnackClose}
                            severity="info"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            変更を保存しました
                        </Alert>
                    </Snackbar>
                    {/* DragOverlay */}
                    <DragOverlay>{activeId ? <Item id={activeId}/> : null}</DragOverlay>
                </DndContext>
            </Stack>
        </>
    );
};