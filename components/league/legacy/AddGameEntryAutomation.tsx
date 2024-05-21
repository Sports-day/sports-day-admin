'use client'
import {Game, gameFactory} from "@/src/models/GameModel";
import {Team} from "@/src/models/TeamModel";
import {useRouter} from "next/navigation";
import React, {useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Stack,
    TextField,
    TextFieldProps,
    Typography
} from "@mui/material";

export type AddGameEntryAutomationProps = {
    game: Game
    teams: Team[]
    entries: Team[]
}

export default function AddGameEntryAutomation(props: AddGameEntryAutomationProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const dataRef = useRef<TextFieldProps>(null)

    const handleSubmit = async () => {
        if (!dataRef.current) {
            alert("エラーが発生しました")
            return
        }

        //  get data
        const data = dataRef.current.value as string
        const splitData = data.split("\t")

        console.log(splitData)

        //  find teams
        const selectedTeams = props.teams.filter((team) => splitData.includes(team.name))

        if (selectedTeams.length === 0
        ) {
            alert("チームを選択してください")
            return
        }

        //  add team user
        await gameFactory().addGameEntries(props.game.id, selectedTeams.map((team) => team.id))

        //  refresh
        router.refresh()
        //  close
        setIsOpen(false)
    }

    return (
        <>
            <Button
                variant={"contained"}
                onClick={() => setIsOpen(true)}
            >
                エントリー追加(コピペ)
            </Button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                maxWidth={"md"}
                fullWidth
            >
                <DialogTitle>
                    <Typography>
                        エントリーの追加
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography>
                            データ
                        </Typography>
                        <TextField
                            type={"text"}
                            name={"data"}
                            id={"data"}
                            placeholder={"データ"}
                            inputRef={dataRef}
                            fullWidth
                            required
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"outlined"}
                        onClick={() => setIsOpen(false)}
                    >
                        キャンセル
                    </Button>
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        onClick={handleSubmit}
                    >
                        追加
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}