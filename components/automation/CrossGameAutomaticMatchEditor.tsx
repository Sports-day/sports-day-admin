'use client'
import {
    Button, Checkbox,
    FormControl,
    InputLabel, LinearProgress, MenuItem,
    Select, SelectChangeEvent, Stack, TextField,
    TextFieldProps,
    Typography
} from "@mui/material";
import React, {ChangeEvent, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Game} from "@/src/models/GameModel";
import {Match, matchFactory} from "@/src/models/MatchModel";
import {Team, teamFactory} from "@/src/models/TeamModel";
import {Location, locationFactory} from "@/src/models/LocationModel";
import Loading from "@/app/(authenticated)/loading";
import {EditedMatch} from "@/components/automation/AutomaticMatchEditor";
import MatchEditorStatus from "@/components/automation/matchEditorStatus";
import {HiArrowPath, HiCheck} from "react-icons/hi2";
import {useRouter} from "next/navigation";
import {useAsync} from "react-use";
import NextLink from "next/link";

export type CrossGameAutomaticMatchEditorProps = {
    games: Game[]
}

export function CrossGameAutomaticMatchEditor(props: CrossGameAutomaticMatchEditorProps) {
    const router = useRouter()
    //  hook
    const [locations, setLocations] = useState<Location[]>([])
    const [matches, setMatches] = useState<Match[]>([])
    const [teams, setTeams] = useState<Team[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(true)
    //  ref
    const durationMinutesRef = useRef<TextFieldProps>(null)
    const csvDataRef = useRef<TextFieldProps>(null)
    //  state
    const [gamesSelected, setGamesSelected] = useState<number[]>([])
    const [startDateTime, setStartDateTime] = useState<Dayjs | null>(dayjs())
    const [locationId, setLocationId] = useState<string>("-1")
    const [editedMatchesState, setEditedMatchesState] = useState<EditedMatch[]>([])
    const [isDeleteUnlinkedMatch, setIsDeleteUnlinkedMatch] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [isExecuting, setIsExecuting] = useState<boolean>(false)
    //  value
    const filteredGames = props.games.filter(game => gamesSelected.includes(game.id))
    const filteredMatches = matches.filter(match => filteredGames.some(game => game.id === match.gameId))
    const filteredEntries = teams.filter(value => {
        return filteredMatches.some(match => {
            return match.leftTeamId === value.id || match.rightTeamId === value.id
        })
    })

    useAsync(async () => {
        const fetchedLocations = await locationFactory().index()
        setLocations(fetchedLocations)

        const fetchedTeams = await teamFactory().index()
        setTeams(fetchedTeams)

        const fetchedMatches = await matchFactory().index()
        setMatches(fetchedMatches)

        setIsFetching(false)
    }, [])

    const handleSubmit = async () => {
        if (isExecuting) {
            alert("処理中です")
            return
        }

        //  validation
        //  exists location
        if (!locations.some(value => value.id === parseInt(locationId))) {
            alert("場所を選択してください")
            return
        }

        //  duration not null
        if (durationMinutesRef.current?.value === undefined) {
            alert("試合間隔を入力してください")
            return
        }

        handleCSVDataChange()

        //  execute
        setIsExecuting(true)
        setProgress(0)

        let index = 0
        for (const match of editedMatchesState) {
            //  original
            const originalMatch = matches.find(value => value.id === match.id)
            const judgeTeam = filteredEntries.find(value => value.name === match.judgeTeamName)

            if (originalMatch !== undefined) {
                if (match.status == "success") {
                    //  update match
                    await matchFactory().update(match.id, {
                        startAt: match.startAt,
                        locationId: parseInt(locationId),
                        judgeTeamId: judgeTeam?.id ?? null,
                        //  original data
                        gameId: originalMatch.gameId,
                        sportId: originalMatch.sportId,
                        leftTeamId: originalMatch.leftTeamId,
                        rightTeamId: originalMatch.rightTeamId,
                        leftScore: originalMatch.leftScore,
                        rightScore: originalMatch.rightScore,
                        result: originalMatch.result,
                        status: originalMatch.status,
                        note: originalMatch.note,
                    })
                } else if (match.status == "not_link_yet" && isDeleteUnlinkedMatch) {
                    //  delete match
                    await matchFactory().delete(match.id)
                }
            }

            //  increment progress
            index++
            setProgress((index) / editedMatchesState.length * 100)

            //  delay for api server load
            await timeout(100);
        }


        setIsExecuting(false)
        //  redirect
        router.push(`/sports/${props.games[0].sportId}`)
    }

    const handleCSVDataChange = () => {
        if (csvDataRef.current?.value === undefined) {
            return
        }

        const csvData = csvDataRef.current.value as string
        const rows = csvData.split("\n")
        let currentDay = dayjs(startDateTime)

        const editedMatches: EditedMatch[] = []

        for (const row of rows) {
            const data = row.split(",")
            const leftTeamName = data[0]
            const rightTeamName = data[1]
            const judgeTeamName = data[2]

            //  team
            const leftTeam = filteredEntries.find(team => team.name === leftTeamName)
            const rightTeam = filteredEntries.find(team => team.name === rightTeamName)
            const judge = filteredEntries.find(team => team.name === judgeTeamName)

            //  if team not found
            if (leftTeam === undefined || rightTeam === undefined || (judgeTeamName !== "" && judge === undefined)) {
                //  failed
                editedMatches.push({
                    id: -1,
                    leftTeamName: leftTeamName,
                    rightTeamName: rightTeamName,
                    judgeTeamName: judgeTeamName,
                    startAt: "",
                    status: "team_invalid"
                })
                continue
            }

            //  find match by team name
            const match = filteredMatches.find(value => {
                return (leftTeam.id === value.leftTeamId && rightTeam.id === value.rightTeamId)
                    || (leftTeam.id === value.rightTeamId && rightTeam.id === value.leftTeamId)
            })

            if (match === undefined) {
                //  failed
                editedMatches.push({
                    id: -1,
                    leftTeamName: leftTeamName,
                    rightTeamName: rightTeamName,
                    judgeTeamName: judgeTeamName,
                    startAt: "",
                    status: "not_found_match"
                })
                continue
            }

            //  success
            editedMatches.push({
                id: match.id,
                leftTeamName: leftTeamName,
                rightTeamName: rightTeamName,
                judgeTeamName: judgeTeamName,
                startAt: currentDay.format("YYYY-MM-DDTHH:mm:ss.SSS"),
                status: "success"
            })

            //  increment
            currentDay = currentDay.add(Number(durationMinutesRef.current?.value), "minute")
        }

        //  add matches not exist in csv
        const notExistMatches = filteredMatches.filter(match => {
            return !editedMatches.some(editedMatch => editedMatch.id === match.id)
        }).map(match => {
            const leftTeam = filteredEntries.find(team => team.id === match.leftTeamId)
            const rightTeam = filteredEntries.find(team => team.id === match.rightTeamId)
            const judgeTeam = filteredEntries.find(team => team.id === match.judgeTeamId)

            return {
                id: match.id,
                leftTeamName: leftTeam?.name,
                rightTeamName: rightTeam?.name,
                judgeTeamName: judgeTeam?.name,
                startAt: match.startAt,
                status: "not_link_yet"
            } as EditedMatch
        })

        const results = editedMatches.concat(notExistMatches)

        setEditedMatchesState(results)
    }

    const handleLocationChange = (e: SelectChangeEvent) => {
        setLocationId(e.target.value)
    }

    const handleGamesSelectChange = (event: SelectChangeEvent<typeof gamesSelected>) => {
        const {
            target: {value},
        } = event;

        setGamesSelected(value as number[]);

        handleCSVDataChange()
    }

    if (isFetching) {
        return (
            <Loading/>
        )
    }

    return (
        <Stack m={0} spacing={1} direction={"column"}>

            <Typography pt={2}>リーグ・トーナメント選択</Typography>
            <FormControl fullWidth size={"small"}>
                <InputLabel id="game-select">リーグ・トーナメント選択</InputLabel>
                <Select
                    labelId={"game-select"}
                    id={"game"}
                    placeholder={"リーグ・トーナメント選択"}
                    value={gamesSelected}
                    onChange={handleGamesSelectChange}
                    multiple
                >
                    {
                        props.games
                            .sort((a, b) => b.weight - a.weight)
                            .map(game => {
                                return (
                                    <MenuItem
                                        key={game.id}
                                        value={game.id}
                                    >
                                        {game.name}
                                    </MenuItem>
                                )
                            })
                    }
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label={"1試合目開始時刻"}
                    value={startDateTime}
                    onChange={(newValue) => {
                        setStartDateTime(newValue)
                        //  calculate
                        handleCSVDataChange()
                    }}
                    sx={{
                        my: '20px',
                        width: "300px",
                    }}
                />
            </LocalizationProvider>

            <Typography>
                試合間隔(分)
            </Typography>
            <TextField
                type={"text"}
                name={"duration-time"}
                id={"duration-time"}
                placeholder={"試合間隔を入力してください"}
                hiddenLabel={true}
                inputRef={durationMinutesRef}
                defaultValue={"1"}
                required
                onChange={() => handleCSVDataChange()}
            />

            <InputLabel id="location-select">開催場所</InputLabel>
            <Select
                labelId={"location-select"}
                id={"location"}
                label={"開催場所"}
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
                    locations.map(location => {
                        return (
                            <MenuItem
                                key={location.id}
                                value={location.id}
                            >
                                {location.name}
                            </MenuItem>
                        )
                    })
                }
            </Select>

            <div>
                <InputLabel id="delete_unlinked_match_label">未リンクの試合を削除する</InputLabel>
                <Checkbox
                    id={"delete_unlinked_match"}
                    checked={isDeleteUnlinkedMatch}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setIsDeleteUnlinkedMatch(event.target.checked)
                    }
                    size="small"
                />
            </div>


            <TextField
                type={"text"}
                name={"csv_data"}
                id={"csv_data"}
                label={"CSVデータ"}
                inputRef={csvDataRef}
                multiline
                rows={10}
                fullWidth
                required
                sx={{
                    mb: '20px',
                    width: "600px",
                }}
                onChange={() => handleCSVDataChange()}
            />

            <MatchEditorStatus
                editedMatchList={editedMatchesState}
            />

            <Stack
                direction={"row"}
                my={0.5}
                pt={3}
                spacing={1}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems="center"
            >
                <Button
                    variant={"outlined"}
                    color={"error"}
                    startIcon={<HiArrowPath/>}
                    href={`/sports/${props.games[0].sportId}`}
                    component={NextLink}
                >
                    戻る
                </Button>
                <Button
                    variant={"contained"}
                    color={"info"}
                    sx={{flexGrow: 3}}
                    startIcon={<HiCheck/>}
                    onClick={handleSubmit}
                >
                    実行
                </Button>
            </Stack>

            {isExecuting &&
                <LinearProgress variant="determinate" value={progress}/>
            }


        </Stack>
    )
}

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}