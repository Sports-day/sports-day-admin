'use client'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {GameEntryContent} from "./GameEntryContent";
import {Team} from "@/src/models/TeamModel";
import {Game} from "@/src/models/GameModel";

export type GameEntryListProps = {
    game: Game
    entries: Team[]
}

export function GameEntryList(props: GameEntryListProps) {
    const gameEntryComponents = props.entries.map(entry => {
        return (
            <GameEntryContent
                game={props.game}
                entryTeam={entry}
                key={entry.id}
            />
        )
    })

    return (
        <>
            <TableContainer>
                <Table
                    sx={{
                        minWidth: 400,
                    }}
                    aria-label={"game entries table"}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                名前
                            </TableCell>
                            <TableCell>
                                説明
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "200px"
                                }}
                            >
                                アクション
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gameEntryComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
