'use client'
import {
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Stack,
    Button,
    SelectChangeEvent,
    Dialog,
    DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import {Game, gameFactory} from "@/src/models/GameModel";
import {Location} from "@/src/models/LocationModel";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {HiCheck} from "react-icons/hi2";

export type MakeLeagueMatchesProps = {
    game: Game
    locations: Location[]
}

export default function MakeLeagueMatches(props: MakeLeagueMatchesProps) {
    const router = useRouter()
    const [locationId, setLocationId] = useState<string>("-1")
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false)

    const handleLocationChange = (e: SelectChangeEvent) => {
        setLocationId(e.target.value)
    }

    const handleSubmit = async () => {
        //  location validate
        if (locationId !== "-1" && !props.locations.some(location => location.id === +locationId)) {
            alert("場所が不正です")
            return
        }

        //  delete
        await gameFactory().deleteGameMatches(props.game.id)
        //  generate
        await gameFactory().makeLeagueMatches(
            props.game.id,
            locationId === "-1" ? null : +locationId
        )

        //  redirect
        router.push(`/sports/${props.game.sportId}/games/${props.game.id}`)
    }

    return (
        <Stack
            spacing={1}
        >
            <FormControl>
                <InputLabel id="location-select">場所(後から変更できます)</InputLabel>
                <Select
                    variant={"outlined"}
                    labelId={"location-select"}
                    id={"location"}
                    label={"場所"}
                    value={locationId}
                    sx={{
                        width: "300px",
                        mb: '20px'
                    }}
                    onChange={handleLocationChange}
                >
                    <MenuItem
                        value={"-1"}
                        sx={{
                            color: "red"
                        }}
                    >
                        未選択
                    </MenuItem>
                    {
                        props.locations.map((location) => {
                            return (
                                <MenuItem
                                    value={location.id}
                                    key={location.id}
                                >
                                    {location.name}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>

            <Button
                variant={"contained"}
                color={"info"}
                sx={{flexGrow: 3}}
                startIcon={<HiCheck/>}
                onClick={() => {
                    setIsOpenConfirm(true)
                }}
            >
                作成
            </Button>

            <Dialog
                open={isOpenConfirm}
                onClose={() => {
                    setIsOpenConfirm(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color='s-darkest.main' fontWeight='bold'>
                    {"試合を作成しますか? すでにある試合が削除されます"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" color='black'>
                        この操作は元に戻せません。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setIsOpenConfirm(false)
                        }}
                        color="primary"
                        autoFocus
                    >
                        キャンセル
                    </Button>
                    <Button
                        onClick={() =>
                            handleSubmit()
                        }
                        color="error"
                        autoFocus
                    >
                        作成
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}