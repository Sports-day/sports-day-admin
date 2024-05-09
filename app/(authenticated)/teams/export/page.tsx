import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {teamTagFactory} from "@/src/models/TeamTagModel";
import {teamFactory} from "@/src/models/TeamModel";
import React from "react";
import ExportTeams from "@/components/teams/export/exportTeams";
import {userFactory} from "@/src/models/UserModel";
import {classFactory} from "@/src/models/ClassModel";

export default async function TeamPage() {
    const teams = await teamFactory().index()
    const teamTags = await teamTagFactory().index()
    const users = await userFactory().index()
    const classes = await classFactory().index()

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/teams/">
                    チーム管理
                </Link>
                <Typography color="text.primary">
                    チームデータのエクスポート
                </Typography>
            </Breadcrumbs>
            <CardBackground title={"チームデータのエクスポート"}>
                <ExportTeams
                    teams={teams}
                    teamTags={teamTags}
                    users={users}
                    classes={classes}
                />
            </CardBackground>
        </Stack>
    )
}
