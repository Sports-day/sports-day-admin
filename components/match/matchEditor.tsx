'use client'
import React, {useRef, useEffect} from "react";
import {useAsync} from "react-use";
import {useRouter} from "next/navigation";
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
    ToggleButtonGroup, Chip, SvgIcon, Avatar
} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {HiCheck, HiChevronDown, HiArrowPath, HiArrowUturnLeft, HiFlag, HiMapPin, HiClock} from "react-icons/hi2";

import {Sport} from "@/src/models/SportModel";
import {Game} from "@/src/models/GameModel";
import {Match, matchFactory, MatchResult, MatchStatus} from "@/src/models/MatchModel";
import {Team, teamFactory} from "@/src/models/TeamModel";
import {Location, locationFactory} from "@/src/models/LocationModel";
import Loading from "@/app/(authenticated)/loading";
import Link from "next/link";

export type MatchEditorProps = {
    sport: Sport
    game: Game
    match: Match
}

export default function MatchEditor(props: MatchEditorProps) {
    const router = useRouter()
    const useState = React.useState;

    const teamUndefined = {
        id: 0,
        name: "取得中",
        description: "取得中",
        classId: 0,
        teamTagId: 0,
        userIds: [],
        enteredGameIds: [],
        createdAt: "0",
        updatedAt: "0"
    };

    // state
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [leftTeam, setLeftTeam] = useState<Team>(teamUndefined);
    const [rightTeam, setRightTeam] = useState<Team>(teamUndefined);
    const [judgeTeam, setJudgeTeam] = useState<Team>(teamUndefined);
    const [matchResult, setMatchResult] = useState<MatchResult>(props.match.result);
    const [matchStatus, setMatchStatus] = useState<MatchStatus>(props.match.status);
    const [locations, setLocations] = useState<Location[]>([]);
    const [locationId, setLocationId] = useState<number | null>(props.match.locationId);
    const [teams, setTeams] = useState<Team[]>([]);
    const [judgeTeamId, setJudgeTeamId] = useState<string | null>(props.match.judgeTeamId);
    const [updateSnackOpen, setUpdateSnackOpen] = React.useState<boolean>(false)
    const [cancelSnackOpen, setCancelSnackOpen] = React.useState<boolean>(false)
    const [scoreError, setScoreError] = useState<boolean>(false);
    const leftRef = useRef<TextFieldProps>(null)
    const rightRef = useRef<TextFieldProps>(null)
    const noteRef = useRef<TextFieldProps>(null)


    // fetch data
    useAsync(async () => {
        const fetchMatchEditor = async () => {
            const left = await teamFactory().show(Number(props.match.leftTeamId));
            const right = await teamFactory().show(Number(props.match.rightTeamId));
            const judge = await teamFactory().show(Number(props.match.judgeTeamId));
            const location = await locationFactory().index();
            const teams = await teamFactory().index();
            setLeftTeam(left);
            setRightTeam(right);
            setJudgeTeam(judge);
            setLocations(location);
            setTeams(teams);
            setIsFetching(false);
        };

        return fetchMatchEditor();
    })

    // reformat data
    const locationName = locations.find(location => location.id === props.match.locationId)?.name;
    const date = new Date(props.match.startAt);
    const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}時${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}分`;

    // handler
    const handleUpdateSnackClose = () => {
        setUpdateSnackOpen(false)
    }
    const handleCancelSnackClose = () => {
        setCancelSnackOpen(false)
    }
    const handleResultChange = (
        event: React.MouseEvent<HTMLElement>,
        newResult: string,
    ) => {
        setMatchResult(newResult as MatchResult);
    };
    const handleStatusChange = (
        event: React.MouseEvent<HTMLElement>,
        newStatus: string,
    ) => {
        setMatchStatus(newStatus as MatchStatus);
    };
    const handleCompare = () => {
        const leftScore = Number(leftRef.current?.value);
        const rightScore = Number(rightRef.current?.value);

        if (leftScore !== 0 || rightScore !== 0) {
            setMatchStatus('finished');
        } else {
            setMatchStatus('standby');
        }

        if (leftScore > rightScore) {
            setMatchResult('left_win');
        } else if (leftScore < rightScore) {
            setMatchResult('right_win');
        } else {
            setMatchResult('draw');
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
        leftRef.current!.value = props.match.leftScore
        rightRef.current!.value = props.match.rightScore
        setCancelSnackOpen(true)
    }

    // update data
    const handleUpdate = async () => {
        const leftScoreValue = leftRef.current?.value;
        const rightScoreValue = rightRef.current?.value;

        if (!leftScoreValue || !rightScoreValue || isNaN(Number(leftScoreValue)) || isNaN(Number(rightScoreValue || Number(leftScoreValue) < 0 || Number(rightScoreValue) < 0 ))){
            setScoreError(true);
            return;
        }

        const leftScore = Number(leftScoreValue);
        const rightScore = Number(rightScoreValue);

        await matchFactory().update(props.match.id,{
            locationId: locationId,
            gameId: props.match.gameId,
            sportId: props.match.sportId,
            startAt: props.match.startAt,
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
    }

    if (isFetching) {
        return (
            <Loading/>
        )
    } else {
        return (
            <Stack spacing={2} pb={10}>
                <CardBackground title={`試合 ${leftTeam.name} vs ${rightTeam.name} の結果を登録`} button={"リーグに戻る"} link={`/sports/${props.sport.id}/${props.game.id}`}>
                    <Card sx={{backgroundColor:"e1e4f6", color:"primary", mb:2, maxWidth:"md"}} variant={"outlined"}>
                        <Stack mx={2} my={2} spacing={2} direction={"column"}>

                            <Stack direction={"row"} spacing={1} overflow={"scrollable"}>
                                <Chip
                                    label={`審判：${judgeTeam.name}`}
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

                            <Divider/>

                            <Stack width={"100%"} maxWidth={"md"} direction={"row"} m={2} spacing={1} alignItems={"end"}>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"}
                                       sx={{
                                             borderRadius: "12px",
                                             backgroundColor: "rgba(49,119,44,0.05)",
                                             p: 2
                                       }}
                                >
                                    <Typography fontWeight={"600"}>{leftTeam.name}のスコア</Typography>
                                    <TextField
                                        fullWidth
                                        color={"success"}
                                        hiddenLabel={true}
                                        id="outlined-size-small"
                                        placeholder="左チームのスコア"
                                        inputRef={leftRef}
                                        defaultValue={props.match.leftScore}
                                        onChange={handleCompare}
                                        error={scoreError}
                                        helperText={scoreError ? "スコアを半角数字で入力してください" : ""}
                                    />
                                </Stack>
                                <Typography pb={2}>
                                    VS
                                </Typography>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"}
                                       sx={{
                                           borderRadius: "12px",
                                           backgroundColor: "rgba(162,31,31,0.05)",
                                           p: 2
                                       }}
                                >
                                    <Typography fontWeight={"600"}>{rightTeam.name}のスコア</Typography>
                                    <TextField
                                        fullWidth
                                        color={"error"}
                                        hiddenLabel={true}
                                        id="outlined-size-small"
                                        placeholder="右チームのスコア"
                                        inputRef={rightRef}
                                        defaultValue={props.match.rightScore}
                                        onChange={handleCompare}
                                        error={scoreError}
                                        helperText={scoreError ? "スコアを半角数字で入力してください" : ""}
                                    />
                                </Stack>
                            </Stack>

                            <Divider/>

                            <Stack width={"100%"} maxWidth={"md"} direction={"row"} m={2} pb={3} spacing={1} alignItems={"end"}>
                                <Stack width={"100%"} direction={"column"} spacing={1} alignItems={"center"}>
                                    <Typography>勝ったのは</Typography>
                                    <ToggleButtonGroup
                                        fullWidth
                                        color={"info"}
                                        value={matchResult}
                                        exclusive
                                        onChange={handleResultChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="left_win" color={"success"}>{leftTeam.name}</ToggleButton>
                                        <ToggleButton value="draw">引き分け</ToggleButton>
                                        <ToggleButton value="right_win" color={"error"}>{rightTeam.name}</ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>
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
                            </Stack>

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
                                    sx={{py:1.5}}
                                    startIcon={<HiArrowPath />}
                                    onClick={handleCancel}
                                >
                                    元に戻す
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={"info"}
                                    sx={{flexGrow: 3, py:1.5}}
                                    startIcon={<HiCheck />}
                                    onClick={handleUpdate}
                                >
                                    保存
                                </Button>
                            </Stack>
                        </Stack>
                    </Card>
                </CardBackground>

                <CardBackground title={"試合の詳細設定"}>
                    <Accordion sx={{backgroundColor:"secondary.main", color:"primary.main", borderRadius:"1px", border: "1px solid #5f6dc2", maxWidth:"md"}}>
                        <AccordionSummary
                            expandIcon={<HiChevronDown color={"secondary"}/>}
                            aria-controls="panel-content"
                            id="panel-header"
                        >
                            <Typography>編集する</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                                <Stack  m={0} spacing={1} direction={"column"}>

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
                                                setJudgeTeamId(e.target.value as string)
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
                                            startIcon={<HiArrowPath />}
                                            onClick={handleCancel}
                                        >
                                            すべて元に戻す
                                        </Button>
                                        <Button
                                            variant={"contained"}
                                            color={"info"}
                                            sx={{flexGrow: 3}}
                                            startIcon={<HiCheck />}
                                            onClick={handleUpdate}
                                        >
                                            すべて保存
                                        </Button>
                                    </Stack>
                                </Stack>
                        </AccordionDetails>
                    </Accordion>
                </CardBackground>
                <Snackbar
                    open={updateSnackOpen}
                    autoHideDuration={8000}
                    onClose={handleUpdateSnackClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleUpdateSnackClose}
                        icon={false}
                        variant="filled"
                        sx={{ width: '100%', backgroundColor:"primary.main" }}
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
                                component={Link}
                                href={`/sports/${props.sport.id}/${props.game.id}`}
                                sx={{border: "1px solid #5f6dc2", py:2}}
                            >
                                リーグに戻る
                            </Button>
                        </Stack>
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={cancelSnackOpen}
                    autoHideDuration={8000}
                    onClose={handleCancelSnackClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCancelSnackClose}
                        icon={false}
                        variant="filled"
                        sx={{ width: '100%', backgroundColor:"primary.main" }}
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
                                component={Link}
                                href={`/sports/${props.sport.id}/${props.game.id}`}
                                sx={{border: "1px solid #5f6dc2", py:2}}
                            >
                                リーグに戻る
                            </Button>
                        </Stack>
                    </Alert>
                </Snackbar>
            </Stack>
        )
    }
}