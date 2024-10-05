import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {teamFactory} from "@/src/models/TeamModel";
import React from "react";
import AutomaticRename from "@/components/teams/automatic-rename/automaticRename";
import NextLink from "next/link";

export default async function TeamAutomaticRenamePage() {
    const teams = await teamFactory().index()

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    component={NextLink}
                >
                    管理者のダッシュボード
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={"/teams/"}
                    component={NextLink}
                >
                    チーム管理
                </Link>
                <Typography color="text.primary">
                    チーム名の一括変更
                </Typography>
            </Breadcrumbs>
            <CardBackground>
                <AutomaticRename
                    teams={teams}
                />
            </CardBackground>
        </Stack>
    )
}
