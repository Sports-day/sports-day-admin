import {SvgIcon, Grid, Button, Avatar, Chip, Stack, Typography, Tooltip} from "@mui/material";
import React, {ReactNode} from 'react';
import {HiClock, HiFlag, HiMapPin, HiTableCells, HiUserGroup} from "react-icons/hi2";

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
                    <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                        <Avatar
                            sx={{height: "1em", width: "1em"}}
                        >
                        </Avatar>
                        <Typography>{sport}</Typography>
                    </Stack>

                    <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                        <Tooltip title={"試合開始時刻"} placement={"left"} arrow>
                            <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiClock/>
                                </SvgIcon>
                                <Typography sx={{pr: 2}}>{time}</Typography>
                            </Stack>
                        </Tooltip>

                        <Tooltip title={"リーグ"} placement={"right"} arrow>
                            <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiTableCells/>
                                </SvgIcon>
                                <Typography>{league}</Typography>
                            </Stack>
                        </Tooltip>

                    </Stack>

                    <Tooltip title={"審判チーム"} placement={"left"} arrow>
                        <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                            <SvgIcon fontSize={"small"}>
                                <HiFlag/>
                            </SvgIcon>
                            <Typography>{judge}</Typography>
                        </Stack>
                    </Tooltip>

                    <Tooltip title={"対戦チーム"} placement={"left"} arrow>
                        <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                            <SvgIcon fontSize={"small"}>
                                <HiUserGroup/>
                            </SvgIcon>
                            <Typography>{left} vs {right}</Typography>
                        </Stack>
                    </Tooltip>

                    <Tooltip title={"場所"} placement={"left"} arrow>

                        <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center"> <SvgIcon
                            fontSize={"small"}>
                            <HiMapPin/>
                        </SvgIcon>
                            <Typography>{location}</Typography>
                        </Stack>
                    </Tooltip>

                </Stack>
            </Button>
        </Grid>
    );
};

export default CardList;
