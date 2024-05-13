import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import TeamsAgGrid from "@/components/teams/teamsTable";

export default function  LocationPage() {
    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/public">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">場所管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"すべての場所"} button={"場所を新規作成"}>
                none
            </CardBackground>
        </Stack>
    )
}
