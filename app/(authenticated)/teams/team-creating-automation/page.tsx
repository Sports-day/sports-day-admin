import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import React from "react";
import NextLink from "next/link";
import TeamCreatingAutomation from "@/components/teams/automatic-entry/teamCreatingAutomation";

export default async function TeamAutomaticRenamePage() {

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
                    射水チーム作成
                </Typography>
            </Breadcrumbs>
            <CardBackground>
                <TeamCreatingAutomation/>
            </CardBackground>
        </Stack>
    )
}
