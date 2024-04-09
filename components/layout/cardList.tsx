import {SvgIcon, Grid, Button, Avatar, Chip, Stack, Typography, Tooltip, Divider} from "@mui/material";
import React, {ReactNode} from 'react';
import {HiClock, HiFlag, HiMapPin, HiTableCells, HiUserGroup} from "react-icons/hi2";
import {MdFlagCircle} from "react-icons/md";

type CardProps = {
    link?: string;
    sport: string;
    league: string;
    judge: string;
    left: string;
    right: string;
    time: string;
    location: string;
    children?: ReactNode;
}

const CardList: React.FC<CardProps> = ({link, location, sport, league, judge, left, right, time, children}) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button variant={"contained"} sx={{width: "100%", py: 2, px: 2}} href={link}>
                <Stack
                    width={"100%"}
                    spacing={1}
                    justifyContent={"flex-start"}
                    alignItems="flex-start"
                >

                    <Stack direction={"row"} spacing={0.1}>
                        <Tooltip title={`競技 | ${sport}`} placement={"top"} arrow>
                            <Chip
                                color="primary"
                                size={"small"}
                                avatar={<Avatar></Avatar>}
                            />
                        </Tooltip>

                        <Tooltip title={`試合会場 | ${location}`} placement={"top"} arrow>
                            <Chip
                                color="primary"
                                size={"small"}
                                icon={<HiMapPin/>}
                            />
                        </Tooltip>

                        <Tooltip title={`試合開始時刻 | ${time}`} placement={"top"} arrow>
                            <Chip
                                color="primary"
                                label={time}
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
                            borderRadius:"10px",
                            backgroundColor:"#7f8cd6",
                            p:1.5,
                            overflow:"auto"
                    }}
                    >

                        <Stack
                            direction={"row"}
                            spacing={1}
                            width={"100%"}
                        >

                            <Tooltip title={"リーグ"} placement={"top"} arrow>
                                <Chip
                                    sx={{px:0.5}}
                                    color="info"
                                    label={league}
                                    icon={<HiTableCells/>}
                                />
                            </Tooltip>

                            <Tooltip title={"審判のチーム"} placement={"top"} arrow>
                                <Chip
                                    sx={{px:0.5}}
                                    color="info"
                                    label={judge}
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
                                    sx={{px:0.5}}
                                    color="info"
                                    label={`${left} vs ${right}`}
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

export default CardList;
