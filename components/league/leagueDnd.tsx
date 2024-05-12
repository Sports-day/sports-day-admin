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
import {HiCheck, HiPlus, HiTrash, HiXMark} from "react-icons/hi2";
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

    const removeList = async (key: string) => {
        const games = await gameFactory().index();

        // Find the game to delete
        const gameToDelete = games.find(game => game.name === key);

        if (gameToDelete) {
            // Delete the game
            await gameFactory().delete(gameToDelete.id);

            setItems(prevItems => {
                const newItems = {...prevItems};

                // Move the teams from the deleted game to the 'All' list
                if (newItems[key].length > 0) {
                    newItems['All'] = [...newItems['All'], ...newItems[key]];
                }

                // Delete the game from the list
                delete newItems[key];

                // Create a new object and copy all lists except the deleted one
                const reorderedItems = Object.keys(newItems).sort().reduce<{ [key: string]: string[]; }>((obj, listKey) => {
                    obj[listKey] = newItems[listKey];
                    return obj;
                }, {});

                return reorderedItems;
            });

            setDelSnackOpen(true);
        } else {
            console.error(`Game with name ${key} not found.`);
        }
    };

    const updateGames = async () => {
        // Fetch games and teams from the server
        const games = await gameFactory().index();
        const teams = await teamFactory().index();

        // Compare the current state with the server state and update if necessary
        for (const [key, value] of Object.entries(items)) {
            if (key !== 'All') {
                const game = games.find(game => game.name === key && game.sportId === props.sport.id);

                // Check if the game is not undefined
                if (!game) {
                    console.error(`Game with name ${key} not found.`);
                    continue;
                }

                const serverTeams = teams.filter(team => team.enteredGameIds.includes(game.id));

                // Check if the teams in the server match with the current state
                const isSame = value.length === serverTeams.length && value.every((teamId, index) => serverTeams[index]?.id.toString() === teamId);

                // If not, update the game with the current state
                if (!isSame) {
                    await gameFactory().update(game.id, {
                        name: key,
                        sportId: props.sport.id,
                        description: props.sport.name,
                        type: "league",
                        calculationType: "total_score",
                        weight: 0,
                        tagId: null
                    });

                    // Find teams that are no longer in the array and remove them
                    const teamsToRemove = serverTeams.filter(serverTeam => !value.includes(serverTeam.id.toString()));
                    for (const team of teamsToRemove) {
                        try {
                            await gameFactory().removeGameEntry(game.id, team.id);
                        } catch (error) {
                            console.error(`Failed to remove team with id ${team.id} from game with id ${game.id}. Error: ${error}`);
                        }
                    }

                    // Add new teams to the game
                    for (const teamId of value) {
                        // Check if the team is not in the list of teams to remove
                        if (!teamsToRemove.some(team => team.id.toString() === teamId)) {
                            await gameFactory().addGameEntries(game.id, [parseInt(teamId)]);
                        }
                    }

                    setMoveSnackMessage(`変更が保存されました。`)
                    setMoveSnackOpen(true)
                }
            }
        }
    };

    // state
    const [openDialog, setOpenDialog] = useState(false);
    const [listToRemove, setListToRemove] = useState("");
    const [delSnackOpen, setDelSnackOpen] = useState<boolean>(false)
    const [moveSnackOpen, setMoveSnackOpen] = useState<boolean>(false)
    const [moveSnackMessage, setMoveSnackMessage] = useState<string>("")
    const [openRenameDialog, setOpenRenameDialog] = useState(false);
    const [gameToRename, setGameToRename] = useState("");
    const [newGameName, setNewGameName] = useState("");
    const [openNewGameDialog, setOpenNewGameDialog] = useState(false);
    const [addGameName, setAddGameName] = useState("");
    const [newErrorMessage, setNewErrorMessage] = useState("");
    const [editErrorMessage, setEditErrorMessage] = useState("");

// Open the dialog
    const handleOpenNewGameDialog = () => {
        setOpenNewGameDialog(true);
    };

// Close the dialog
    const handleCloseNewGameDialog = () => {
        setOpenNewGameDialog(false);
    };

// Create a new game and close the dialog
    const handleCreateNewGame = async () => {
        // Fetch all games
        const games = await gameFactory().index();

        // Check if the new game name already exists
        if (games.some(game => game.name === addGameName && game.sportId === props.sport.id)) {
            setNewErrorMessage("この名前は既に存在します。");
            return;
        }

        // Create the new game
        const newGame = await gameFactory().create({
            name: addGameName,
            sportId: props.sport.id,
            description: props.sport.name,
            type: "league",
            calculationType: "total_score",
            weight: 0,
            tagId: null
        });

        // Add the new game to the items
        setItems(prevItems => ({
            ...prevItems,
            [addGameName]: [],
        }));

        // Reset the new game name and close the dialog
        setAddGameName("");
        setOpenNewGameDialog(false);
        setNewErrorMessage(""); // Reset the error message
    };

// Open the dialog
    const handleOpenRenameDialog = (key: string) => {
        setGameToRename(key);
        setNewGameName(key); // Set the new game name to the current game name
        setOpenRenameDialog(true);
    };

// Close the dialog
    const handleCloseRenameDialog = () => {
        setOpenRenameDialog(false);
    };

// Rename the game and close the dialog
    const handleRenameGame = async () => {
        // Fetch the game to update
        const games = await gameFactory().index();
        const gameToUpdate = games.find(game => game.name === gameToRename && game.sportId === props.sport.id);

        if (games.some(game => game.name === newGameName && game.sportId === props.sport.id)) {
            setEditErrorMessage("この名前は既に存在します。");
            return;
        }
        if (gameToUpdate) {
            // Update the game name
            await gameFactory().update(gameToUpdate.id,
                {
                    name: newGameName,
                    description: gameToUpdate.description,
                    sportId: gameToUpdate.sportId,
                    type: gameToUpdate.type,
                    calculationType: gameToUpdate.calculationType,
                    weight: gameToUpdate.weight,
                    tagId: gameToUpdate.tagId
                }
            );
        } else {
            console.error(`Game with name ${gameToRename} not found.`);
        }

        setItems(prevItems => {
            const newItems = {...prevItems};
            newItems[newGameName] = newItems[gameToRename];
            delete newItems[gameToRename];
            return newItems;
        });

        setOpenRenameDialog(false);
        setEditErrorMessage(""); // Reset the error message
    };

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

        const container = Object.keys(items).find((key: string) =>
            items[key].includes(id.toString())
        );

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
        // console.log("Over1", id, over?.id.toString())

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
            // console.log ("Over2", id, overId.toString())

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
        await updateGames();

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
                                        onClick={handleOpenNewGameDialog}
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
                                    <Stack direction={"row"} spacing={1}>
                                        <Button
                                            size={"small"}
                                            variant={"outlined"}
                                            startIcon={<HiTrash/>}
                                            color={"error"}
                                            onClick={() => handleOpenDialog(key)}
                                        >
                                            削除
                                        </Button>
                                        <Button
                                            size={"small"}
                                            variant={"contained"}
                                            color={"primary"}
                                            sx={{flexGrow: 1}}
                                            onClick={() => handleOpenRenameDialog(key)}
                                        >
                                            名前変更
                                        </Button>
                                    </Stack>
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
                        fullWidth={true}
                        maxWidth={"sm"}
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
                    {/* "New Game" Dialog */}
                    <Dialog
                        open={openNewGameDialog}
                        onClose={handleCloseNewGameDialog}
                        fullWidth={true}
                        maxWidth={"sm"}
                    >
                        <DialogTitle sx={{pt: 3}}>新しいリーグを作成します</DialogTitle>
                        <DialogContent>
                            <Typography>
                                リーグにつける名前を決めましょう
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="リーグ名"
                                type="text"
                                fullWidth
                                value={addGameName}
                                onChange={(event) => setAddGameName(event.target.value)}
                                error={!!newErrorMessage} // Show the error if the error message is not empty
                                helperText={newErrorMessage}
                            />
                        </DialogContent>
                        <DialogActions sx={{p:3}}>
                            <Button startIcon={<HiXMark/>} variant={"outlined"} onClick={handleCloseNewGameDialog}>
                                キャンセル
                            </Button>
                            <Button sx={{flexGrow:1}} startIcon={<HiPlus/>} variant={"contained"} onClick={handleCreateNewGame}>
                                作成
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* Rename Dialog */}
                    <Dialog
                        open={openRenameDialog}
                        onClose={handleCloseRenameDialog}
                        fullWidth={true}
                        maxWidth={"sm"}
                    >
                        <DialogTitle sx={{pt: 3}}>リーグ名を変更します</DialogTitle>
                        <DialogContent>
                            <Typography>
                                新しい名前は何にしますか？
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="新しいリーグ名"
                                type="text"
                                fullWidth
                                defaultValue={gameToRename} // Set the default value to the current game name
                                value={newGameName}
                                onChange={(event) => setNewGameName(event.target.value)}
                                error={!!editErrorMessage} // Show the error if the error message is not empty
                                helperText={editErrorMessage}
                            />
                        </DialogContent>
                        <DialogActions sx={{p:3}}>
                            <Button startIcon={<HiXMark/>} variant={"outlined"}　onClick={handleCloseRenameDialog} color="primary">
                                キャンセル
                            </Button>
                            <Button sx={{flexGrow:1}} startIcon={<HiCheck/>} variant={"contained"} onClick={handleRenameGame} color="primary">
                                保存
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
                            {moveSnackMessage}
                        </Alert>
                    </Snackbar>
                    {/* DragOverlay */}
                    <DragOverlay>{activeId ? <Item id={activeId}/> : null}</DragOverlay>
                </DndContext>
            </Stack>
        </>
    );
};