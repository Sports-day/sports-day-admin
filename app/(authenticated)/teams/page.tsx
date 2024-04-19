import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import TeamsAgGrid from "@/components/teams/teamsTable";

export default function  TeamPage() {
    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">チーム管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"すべてのチーム"} button={"CSVで一括作成"}>
                <TeamsAgGrid/>
            </CardBackground>
        </Stack>
    )
}
