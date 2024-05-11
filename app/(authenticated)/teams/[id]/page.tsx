import { Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import React from "react";
import UserEditor from "@/components/users/userEditor";
import {teamFactory} from "@/src/models/TeamModel";
import TeamEditor from "@/components/teams/teamEditor";
import {classFactory} from "@/src/models/ClassModel";

export default async function TeamDetailPage({ params }: { params: { id: string } }) {
    const teamId = parseInt(params.id, 10)
    const teamInfo = await teamFactory().show(teamId)
    const classes = await classFactory().show(teamInfo.classId)
    const teamUsers = await teamFactory().getTeamUsers(teamId);

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/teams/">
                    チーム管理
                </Link>
                <Typography color="text.primary">{teamInfo  .name}</Typography>
            </Breadcrumbs>

            <CardBackground title={`${teamInfo.name} の情報`}>
                <TeamEditor team={teamInfo} teamUser={teamUsers} class={classes}/>
            </CardBackground>
        </Stack>
    )
}
