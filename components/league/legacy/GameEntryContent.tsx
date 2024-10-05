'use client'
import {Button, Link, TableCell, TableRow} from "@mui/material";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Game, gameFactory} from "@/src/models/GameModel";
import {Team} from "@/src/models/TeamModel";
import {ConfirmDialog} from "@/components/league/legacy/ConfirmDialog";
import NextLink from "next/link";

export type GameEntryContentProps = {
    game: Game
    entryTeam: Team
}

export function GameEntryContent(props: GameEntryContentProps) {
    const router = useRouter()
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteEntry = async () => {
        await gameFactory().removeGameEntry(
            props.game.id,
            props.entryTeam.id
        )

        //  refresh
        router.refresh()
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    <Link
                            href={`/admin/teams/${props.entryTeam.id}`}
                            component={NextLink}
                    >
                        {props.entryTeam.id}
                    </Link>
                </TableCell>
                <TableCell>{props.entryTeam.name}</TableCell>
                <TableCell>{props.entryTeam.description}</TableCell>
                <TableCell
                    sx={{
                        width: "200px"
                    }}
                >
                    <Button
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        削除
                    </Button>
                </TableCell>
            </TableRow>
            {/*delete*/}
            <ConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => deleteEntry()}
                confirmText={"削除"}
                confirmColor={"error"}
            >
                <p>{props.entryTeam.name}を削除しますか？</p>
            </ConfirmDialog>
        </>
    )
}