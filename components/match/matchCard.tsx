import {Grid, Button, Avatar, Chip, Stack, Tooltip, Divider} from "@mui/material";
import {HiClock, HiFlag, HiMapPin, HiTableCells, HiUserGroup} from "react-icons/hi2";
import {Match} from "@/src/models/MatchModel";
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {locationFactory} from "@/src/models/LocationModel";
import {teamFactory} from "@/src/models/TeamModel";

type MatchCardProps = {
    match: Match
}

export default async function MatchCard(props: MatchCardProps) {
    const sport = await sportFactory().show(props.match.sportId)
    const game = await gameFactory().show(props.match.gameId)
    const location = props.match.locationId == null ? undefined : await locationFactory().show(props.match.locationId)
    const leftTeam = props.match.leftTeamId == null ? undefined : await teamFactory().show(props.match.leftTeamId)
    const rightTeam = props.match.rightTeamId == null ? undefined : await teamFactory().show(props.match.rightTeamId)
    const judgeTeam = props.match.judgeTeamId == null ? undefined : await teamFactory().show(props.match.judgeTeamId)

    const date = new Date(props.match.startAt)
    const formattedDate = `${date.getHours()}時${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}分`

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
                variant={"contained"}
                sx={{
                    width: "100%",
                    py: 2,
                    px: 2
                }}
                href={`/sports/${props.match.sportId}/games/${props.match.gameId}/matches/${props.match.id}`}
            >
                <Stack
                    width={"100%"}
                    spacing={1}
                    justifyContent={"flex-start"}
                    alignItems="flex-start"
                >

                    <Stack direction={"row"} spacing={0.1}>
                        <Tooltip title={`競技 | ${sport.name}`} placement={"top"} arrow>
                            <Chip
                                color="primary"
                                size={"small"}
                                avatar={<Avatar></Avatar>}
                            />
                        </Tooltip>

                        <Tooltip title={`試合会場 | ${location?.name ?? "未登録"}`} placement={"top"} arrow>
                            <Chip
                                color="primary"
                                size={"small"}
                                icon={<HiMapPin/>}
                            />
                        </Tooltip>

                        <Tooltip title={`試合開始時刻 | ${formattedDate}`} placement={"top"} arrow>
                            <Chip
                                color="primary"
                                label={formattedDate}
                                size={"small"}
                                icon={<HiClock/>}
                            />
                        </Tooltip>
                    </Stack>

                    <Divider/>

                    <Stack
                        spacing={1}
                        width={"100%"}
                        sx={{
                            borderRadius: "10px",
                            backgroundColor: "#7f8cd6",
                            p: 1.5,
                            overflow: "auto"
                        }}
                    >

                        <Stack
                            direction={"row"}
                            spacing={1}
                            width={"100%"}
                        >

                            <Tooltip title={"リーグ"} placement={"top"} arrow>
                                <Chip
                                    sx={{px: 0.5}}
                                    color="info"
                                    label={game.name ?? "不明"}
                                    icon={<HiTableCells/>}
                                />
                            </Tooltip>

                            <Tooltip title={"審判のチーム"} placement={"top"} arrow>
                                <Chip
                                    sx={{px: 0.5}}
                                    color="info"
                                    label={judgeTeam?.name ?? "未登録"}
                                    icon={<HiFlag/>}
                                />
                            </Tooltip>

                        </Stack>

                        <Stack
                            direction={"row"}
                            spacing={1}
                        >
                            <Tooltip title={"対戦するチーム"} placement={"top"} arrow>
                                <Chip
                                    sx={{px: 0.5}}
                                    color="info"
                                    label={`${leftTeam?.name ?? "未登録"} vs ${rightTeam?.name ?? "未登録"}`}
                                    icon={<HiUserGroup/>}
                                />
                            </Tooltip>
                        </Stack>
                    </Stack>

                </Stack>
            </Button>
        </Grid>
    );
};
