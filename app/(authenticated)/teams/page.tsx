import {Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import TeamsAgGrid from "@/components/teams/teamsTable";
import {classFactory} from "@/src/models/ClassModel";
import {teamFactory} from "@/src/models/TeamModel";
import {teamTagFactory} from "@/src/models/TeamTagModel";
import NextLink from "next/link";

export default async function TeamPage() {
    const classes = await classFactory().index()
    const teams = await teamFactory().index()
    const teamTags = await teamTagFactory().index()

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
                <Typography color="text.primary">チーム管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"すべてのチーム"}>
                <Stack
                    spacing={1}
                    direction={"row"}
                    pb={1.5}
                >
                    <Button
                        variant={"contained"}
                        href={"/teams/export"}
                        component={NextLink}
                    >
                        エクスポート
                    </Button>

                    <Button
                        variant={"contained"}
                        href={"/teams/automatic-rename"}
                        component={NextLink}
                    >
                        一括名前変更
                    </Button>
                </Stack>
                <TeamsAgGrid
                    classes={classes}
                    teams={teams}
                    teamTags={teamTags}
                />
            </CardBackground>
        </Stack>
    )
}
