'use client'
import React, {useEffect, useRef, useState} from "react"
import {useAsync} from "react-use"
import {useRouter} from "next/navigation"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Button,
    Card, Divider, FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    TextFieldProps,
    Typography,
    ToggleButton,
    ToggleButtonGroup, Chip, SvgIcon, Avatar, Box
} from "@mui/material"
import CardBackground from "@/components/layout/cardBackground"
import {HiCheck, HiChevronDown, HiArrowPath, HiFlag, HiMapPin, HiClock, HiMiniNoSymbol} from "react-icons/hi2"
import {Sport} from "@/src/models/SportModel"
import {Game, gameFactory} from "@/src/models/GameModel"
import {Match, matchFactory, MatchResult, MatchStatus} from "@/src/models/MatchModel"
import {Team, teamFactory} from "@/src/models/TeamModel"
import {Location, locationFactory} from "@/src/models/LocationModel"
import Loading from "@/app/(authenticated)/loading"
import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid";
import NextLink from "next/link";

export type MatchEditorProps = {
    sport: Sport
    game: Game
    match: Match
}

export default function MatchEditor(props: MatchEditorProps) {
    const router = useRouter()
    //  loading state
    const [isFetching, setIsFetching] = useState<boolean>(true)
    //  index
    const [teams, setTeams] = useState<Team[]>([])
    const [locations, setLocations] = useState<Location[]>([])
    //  match result state
    const [matchResult, setMatchResult] = useState<MatchResult>(props.match.result)
    const [matchStatus, setMatchStatus] = useState<MatchStatus>(props.match.status)
    //  location and team state
    const [locationId, setLocationId] = useState<number | null>(props.match.locationId)
    const [judgeTeamId, setJudgeTeamId] = useState<number | null>(props.match.judgeTeamId)
    //  date time state
    const [startDateTime, setStartDateTime] = useState<Dayjs>(dayjs())
    //  UX state
    const [updateSnackOpen, setUpdateSnackOpen] = useState<boolean>(false)
    const [cancelSnackOpen, setCancelSnackOpen] = useState<boolean>(false)
    const [scoreError, setScoreError] = useState<boolean>(false)
    const [matchStateError, setMatchStateError] = useState<boolean>(false)
    const leftScoreRef = useRef<TextFieldProps>(null)
    const rightScoreRef = useRef<TextFieldProps>(null)
    const noteRef = useRef<TextFieldProps>(null)


    // fetch data
    useAsync(async () => {
        const fetchedLocations = await locationFactory().index()
        setLocations(fetchedLocations)

        const fetchedGames = await gameFactory().index()
        const sportGames = fetchedGames.filter(game => game.sportId === props.sport.id)
        const sportGameIds = sportGames.map(game => game.id)

        const fetchedTeams = await teamFactory().index()
        //  filter by game id
        const filteredTeams = fetchedTeams.filter(team => team.enteredGameIds.some(id => sportGameIds.includes(id)))
        setTeams(filteredTeams)

        //  finish loading
        setIsFetching(false)
    })

    useEffect(() => {
        setStartDateTime(dayjs(props.match.startAt))
    }, [props.match.startAt])

    // reformat data
    const locationName = locations.find(location => location.id === props.match.locationId)?.name
    const date = new Date(props.match.startAt)
    const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}時${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}分`

    //  snack bar close handler
    const handleUpdateSnackClose = () => {
        setUpdateSnackOpen(false)
    }
    //  snack bar close handler
    const handleCancelSnackClose = () => {
        setCancelSnackOpen(false)
    }

    //  match result change handler
    const handleResultChange = (
        _: React.MouseEvent<HTMLElement>,
        newResult: string,
    ) => {
        setMatchResult(newResult as MatchResult)
    }

    //  match status change handler
    const handleStatusChange = (
        _: React.MouseEvent<HTMLElement>,
        newStatus: string,
    ) => {
        setMatchStatus(newStatus as MatchStatus)
    }

    const handleMatchStateErrorClose = () => {
        setMatchStateError(false)
    }

    //  auto compare
    const handleCompare = () => {
        const leftScore = Number(leftScoreRef.current?.value)
        const rightScore = Number(rightScoreRef.current?.value)

        if (leftScore !== 0 || rightScore !== 0) {
            setMatchStatus('finished')
        } else {
            setMatchStatus('standby')
        }

        if (leftScore > rightScore) {
            setMatchResult('left_win')
        } else if (leftScore < rightScore) {
            setMatchResult('right_win')
        } else {
            setMatchResult('draw')
        }
        setScoreError(false)
    }

    // cancel
    const handleCancel = () => {
        setMatchResult(props.match.result)
        setMatchStatus(props.match.status)
        setLocationId(props.match.locationId)
        setJudgeTeamId(props.match.judgeTeamId)
        noteRef.current!.value = props.match.note
        leftScoreRef.current!.value = props.match.leftScore
        rightScoreRef.current!.value = props.match.rightScore
        setStartDateTime(dayjs(props.match.startAt))
        setCancelSnackOpen(true)
    }

    // update data
    const handleUpdate = async () => {
        const leftScoreValue = leftScoreRef.current?.value
        const rightScoreValue = rightScoreRef.current?.value

        if (!leftScoreValue || !rightScoreValue || isNaN(Number(leftScoreValue)) || isNaN(Number(rightScoreValue || Number(leftScoreValue) < 0 || Number(rightScoreValue) < 0))) {
            setScoreError(true)
            return
        }

        const leftScore = Number(leftScoreValue)
        const rightScore = Number(rightScoreValue)

        if (!matchResult || !matchStatus) {
            setMatchStateError(true)
            return
        }

        await matchFactory().update(props.match.id, {
            locationId: locationId,
            gameId: props.match.gameId,
            sportId: props.match.sportId,
            startAt: startDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS"),
            leftTeamId: props.match.leftTeamId,
            rightTeamId: props.match.rightTeamId,
            leftScore: leftScore,
            rightScore: rightScore,
            result: matchResult,
            status: matchStatus,
            note: noteRef.current?.value as string,
            judgeTeamId: judgeTeamId
        })

        router.refresh()
        setUpdateSnackOpen(true)
        setScoreError(false)
        setMatchStateError(false)
    }

    if (isFetching) {
        return (
            <Loading/>
        )
    }

    const leftTeamName = teams.find(team => team.id === props.match.leftTeamId)?.name ?? "未登録"
    const rightTeamName = teams.find(team => team.id === props.match.rightTeamId)?.name ?? "未登録"
    const judgeTeamName = teams.find(team => team.id === props.match.judgeTeamId)?.name ?? "未登録"

    return (
        <Stack spacing={2} pb={10}>
            <CardBackground
                title={`試合 ${leftTeamName} vs ${rightTeamName} の結果を登録`}
                button={"リーグに戻る"}
                link={`/sports/${props.sport.id}/games/${props.game.id}`}
            >
                <Card sx={{backgroundColor: "e1e4f6", color: "primary", mb: 2, maxWidth: "md"}}
                      variant={"outlined"}>
                    <Stack mx={2} my={2} spacing={2} direction={"column"}>

                        <Stack
                            sx={{width:"100%", overflow:"auto"}}
                        >
                            <Stack width={"100%"} direction={"row"} >
                                <Chip
                                    label={`審判：${judgeTeamName}`}
                                    avatar={<Avatar><HiFlag/></Avatar>} color={"secondary"}
                                />
                                <Chip
                                    label={`試合場所：${locationName}`}
                                    avatar={<Avatar><HiMapPin/></Avatar>} color={"secondary"}
                                />
                                <Chip
                                    label={`試合開始：${formattedDate}`}
                                    avatar={<Avatar><HiClock/></Avatar>} color={"secondary"}
                                />
                            </Stack>
                        </Stack>

                        <Divider/>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={5.5}>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"}
                                       sx={{
                                           borderRadius: "12px",
                                           backgroundColor: "rgba(49,119,44,0.05)",
                                           p: 2
                                       }}
                                >
                                    <Typography fontWeight={"600"}>{leftTeamName}のスコア</Typography>
                                    <TextField
                                        fullWidth
                                        color={"success"}
                                        hiddenLabel={true}
                                        id="outlined-size-small"
                                        placeholder="左チームのスコア"
                                        inputRef={leftScoreRef}
                                        defaultValue={props.match.leftScore}
                                        onChange={handleCompare}
                                        error={scoreError}
                                        helperText={scoreError ? "スコアを半角数字で入力してください" : ""}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"}>
                                    <Typography py={2}>
                                        VS
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={5.5}>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"}
                                       sx={{
                                           borderRadius: "12px",
                                           backgroundColor: "rgba(162,31,31,0.05)",
                                           p: 2
                                       }}
                                >
                                    <Typography fontWeight={"600"}>{rightTeamName}のスコア</Typography>
                                    <TextField
                                        fullWidth
                                        color={"error"}
                                        hiddenLabel={true}
                                        id="outlined-size-small"
                                        placeholder="右チームのスコア"
                                        inputRef={rightScoreRef}
                                        defaultValue={props.match.rightScore}
                                        onChange={handleCompare}
                                        error={scoreError}
                                        helperText={scoreError ? "スコアを半角数字で入力してください" : ""}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>

                        <Divider/>

                        <Grid container>
                            <Grid item xs={12} sm={5.8}>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"} mb={1}>
                                    <Typography>勝ったのは</Typography>
                                    <ToggleButtonGroup
                                        fullWidth
                                        color={"info"}
                                        value={matchResult}
                                        exclusive
                                        onChange={handleResultChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="left_win" color={"success"}>{leftTeamName}</ToggleButton>
                                        <ToggleButton value="draw">引き分け</ToggleButton>
                                        <ToggleButton value="right_win" color={"error"}>{rightTeamName}</ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={0} sm={0.4}></Grid>
                            <Grid item xs={12} sm={5.8}>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"}>
                                    <Typography>試合の状態</Typography>
                                    <ToggleButtonGroup
                                        fullWidth
                                        color={"primary"}
                                        value={matchStatus}
                                        exclusive
                                        onChange={handleStatusChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value={"cancelled"} color={"error"}>中止</ToggleButton>
                                        <ToggleButton value="standby" color={"success"}>スタンバイ</ToggleButton>
                                        <ToggleButton value="in_progress" color={"warning"}>進行中</ToggleButton>
                                        <ToggleButton value="finished" color={"info"}>完了</ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Stack
                            direction={"row"}
                            my={0.5}
                            spacing={1}
                            width={"100%"}
                            maxWidth="md"
                            justifyContent={"space-between"}
                            alignItems="center"
                        >
                            <Button
                                variant={"outlined"}
                                color={"error"}
                                sx={{py: 1.5}}
                                startIcon={<HiArrowPath/>}
                                onClick={handleCancel}
                            >
                                元に戻す
                            </Button>
                            <Button
                                variant={"contained"}
                                color={"info"}
                                sx={{flexGrow: 3, py: 1.5}}
                                startIcon={<HiCheck/>}
                                onClick={handleUpdate}
                            >
                                保存
                            </Button>
                        </Stack>
                    </Stack>
                </Card>
            </CardBackground>

            <CardBackground title={"試合の詳細設定"}>
                <Accordion sx={{
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    borderRadius: "1px",
                    border: "1px solid #5f6dc2",
                    maxWidth: "md"
                }}>
                    <AccordionSummary
                        expandIcon={<HiChevronDown color={"secondary"}/>}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <Typography>編集する</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack m={0} spacing={1} direction={"column"}>

                            <Typography pl={1.5}>補足</Typography>
                            <TextField
                                fullWidth
                                size={"small"}
                                color={"info"}
                                hiddenLabel={true}
                                id="outlined-size-small"
                                placeholder="補足情報を入力してください(任意)"
                                inputRef={noteRef}
                                defaultValue={props.match.note}
                            />

                            <Typography pl={1.5} pt={2}>審判</Typography>
                            <FormControl fullWidth size={"small"}>
                                <InputLabel id="demo-simple-select-label">審判</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={judgeTeamId}
                                    defaultValue={props.match.judgeTeamId}
                                    label="審判"
                                    onChange={(e) => {
                                        setJudgeTeamId(e.target.value as number)
                                    }}
                                >
                                    {teams.map((team) => (
                                        <MenuItem key={team.id} value={team.id}>
                                            {team.id} - {team.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Typography pl={1.5} pt={2}>試合の場所</Typography>
                            <FormControl fullWidth size={"small"}>
                                <InputLabel id="demo-simple-select-label">場所</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={locationId}
                                    defaultValue={props.match.locationId}
                                    label="場所"
                                    onChange={(e) => {
                                        setLocationId(e.target.value as number)
                                    }}
                                >
                                    {locations.map((location) => (
                                        <MenuItem key={location.id} value={location.id}>
                                            {location.id} - {location.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box pt={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label={"開始時刻"}
                                        value={startDateTime}
                                        onChange={(newValue) => {
                                            if (!newValue) return
                                            setStartDateTime(newValue)
                                        }}
                                        sx={{
                                            my: '20px',
                                            width: "300px",
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>

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
                                    onClick={handleCancel}
                                >
                                    すべて元に戻す
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={"info"}
                                    sx={{flexGrow: 3}}
                                    startIcon={<HiCheck/>}
                                    onClick={handleUpdate}
                                >
                                    すべて保存
                                </Button>
                            </Stack>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </CardBackground>

            {/*Update Snack*/}
            <Snackbar
                open={updateSnackOpen}
                autoHideDuration={8000}
                onClose={handleUpdateSnackClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleUpdateSnackClose}
                    icon={false}
                    variant="filled"
                    sx={{width: '100%', backgroundColor: "primary.main"}}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={2} mx={1}>
                        <SvgIcon>
                            <HiCheck/>
                        </SvgIcon>
                        <Typography>
                            変更が保存されました
                        </Typography>
                        <Button
                            variant={"contained"}
                            color={"info"}
                            component={NextLink}
                            href={`/sports/${props.sport.id}/games/${props.game.id}`}
                            sx={{border: "1px solid #5f6dc2", py: 2}}
                        >
                            リーグに戻る
                        </Button>
                    </Stack>
                </Alert>
            </Snackbar>
            {/*Cancel Snack*/}
            <Snackbar
                open={cancelSnackOpen}
                autoHideDuration={8000}
                onClose={handleCancelSnackClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleCancelSnackClose}
                    icon={false}
                    variant="filled"
                    sx={{width: '100%', backgroundColor: "primary.main"}}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={2} mx={1}>
                        <SvgIcon>
                            <HiArrowPath/>
                        </SvgIcon>
                        <Typography>
                            変更を元に戻しました
                        </Typography>
                        <Button
                            variant={"contained"}
                            color={"info"}
                            component={NextLink}
                            href={`/sports/${props.sport.id}/games/${props.game.id}`}
                            sx={{border: "1px solid #5f6dc2", py: 2}}
                        >
                            リーグに戻る
                        </Button>
                    </Stack>
                </Alert>
            </Snackbar>
            {/*Match State Error*/}
            <Snackbar
                open={matchStateError}
                autoHideDuration={8000}
                onClose={handleMatchStateErrorClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleMatchStateErrorClose}
                    icon={false}
                    variant="filled"
                    sx={{width: '100%', backgroundColor: "primary.main"}}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={2} mx={1}>
                        <SvgIcon>
                            <HiMiniNoSymbol/>
                        </SvgIcon>
                        <Typography>
                            勝者、状態を選択してください。
                        </Typography>
                    </Stack>
                </Alert>
            </Snackbar>
        </Stack>
    )
}
