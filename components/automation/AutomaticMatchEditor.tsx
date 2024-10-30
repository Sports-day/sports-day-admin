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
import {Game, gameFactory} from "@/src/models/GameModel";
import {Team} from "@/src/models/TeamModel";
import {Location, locationFactory} from "@/src/models/LocationModel";
import {Match, matchFactory} from "@/src/models/MatchModel";
import {useAsync} from "react-use";
import {useRouter} from "next/navigation";
import Loading from "@/app/(authenticated)/loading";
import {DateTimePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {HiArrowPath, HiCheck} from "react-icons/hi2";
import MatchEditorStatus from "@/components/automation/matchEditorStatus";
import NextLink from "next/link";

export type AutomaticMatchEditorProps = {
    game: Game
}

export type EditedMatch = {
    id: number
    leftTeamName: string
    rightTeamName: string
    judgeTeamName: string
    startAt: string
    status: "success" | "not_found_match" | "not_link_yet" | "team_invalid"
}

export function AutomaticMatchEditor(props: AutomaticMatchEditorProps) {
    const router = useRouter()
    //  resources
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [locations, setLocations] = useState<Location[]>([])
    const [teams, setTeams] = useState<Team[]>([])
    const [matches, setMatches] = useState<Match[]>([])
    //  ref
    const durationMinutesRef = useRef<TextFieldProps>(null)
    const csvDataRef = useRef<TextFieldProps>(null)
    //  state
    const [startDateTime, setStartDateTime] = useState<Dayjs | null>(dayjs())
    const [locationId, setLocationId] = useState<string>("-1")
    const [editedMatchesState, setEditedMatchesState] = useState<EditedMatch[]>([])
    const [isDeleteUnlinkedMatch, setIsDeleteUnlinkedMatch] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [isExecuting, setIsExecuting] = useState<boolean>(false)

    useAsync(async () => {
        const fetchedLocations = await locationFactory().index()
        setLocations(fetchedLocations)

        const fetchedTeams = await gameFactory().getGameEntries(props.game.id)
        setTeams(fetchedTeams)

        const fetchedMatches = await gameFactory().getGameMatches(props.game.id)
        setMatches(fetchedMatches)

        setIsFetching(false)
    }, [props.game])

    const handleSubmit = async () => {
        if (isExecuting) {
            alert("処理中です")
            return
        }

        //  validation
        //  exists location
        if (!locations.some(location => location.id === parseInt(locationId))) {
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

        let index = 0;
        for (const match of editedMatchesState) {
            //  original
            const originalMatch = matches.find(value => value.id === match.id)
            const judgeTeam = teams.find(value => value.name === match.judgeTeamName)
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
        //  refresh
        router.push(`/sports/${props.game.sportId}/games/${props.game.id}`)
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
            const leftTeam = teams.find(team => team.name === leftTeamName)
            const rightTeam = teams.find(team => team.name === rightTeamName)
            const judge = teams.find(team => team.name === judgeTeamName)
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
            const match = matches.find(match => {
                return (leftTeam.id === match.leftTeamId && rightTeam.id === match.rightTeamId)
                    || (leftTeam.id === match.rightTeamId && rightTeam.id === match.leftTeamId)
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
        const notExistMatches = matches.filter(match => {
            return !editedMatches.some(editedMatch => editedMatch.id === match.id)
        }).map(match => {
            const leftTeam = teams.find(team => team.id === match.leftTeamId)
            const rightTeam = teams.find(team => team.id === match.rightTeamId)
            const judgeTeam = teams.find(team => team.id === match.judgeTeamId)

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

    if (isFetching) {
        return (
            <Loading/>
        )
    }


    return (
        <Stack m={0} spacing={1} direction={"column"}>
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

            <Typography pt={2}>開催場所</Typography>
            <FormControl fullWidth size={"small"}>
                <InputLabel id="location-select">開催場所</InputLabel>
                <Select
                    variant={"outlined"}
                    labelId={"location-select"}
                    id={"location"}
                    label={"開催場所"}
                    value={locationId}
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
            </FormControl>

            <FormControl fullWidth size={"small"}>
                <InputLabel id="delete-unlinked-match-label">未リンクの試合を削除する</InputLabel>
                <Checkbox
                    id={"delete-unlinked-match"}
                    checked={isDeleteUnlinkedMatch}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setIsDeleteUnlinkedMatch(event.target.checked)
                    }
                    size="small"
                />
            </FormControl>

            <Typography>
                CSVデータ
            </Typography>
            <TextField
                type={"text"}
                name={"csv-data"}
                id={"csv-data"}
                placeholder={"CSVデータ"}
                inputRef={csvDataRef}
                multiline
                rows={10}
                fullWidth
                required
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
                    href={`/sports/${props.game.sportId}/games/${props.game.id}`}
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
