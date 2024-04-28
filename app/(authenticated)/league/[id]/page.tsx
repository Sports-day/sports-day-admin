import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import LeagueDnd from "@/components/league/leagueDnd";

export default function LeagueTestPage() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/league">
                    リーグ管理
                </Link>
                <Typography color="text.primary">競技名</Typography>
            </Breadcrumbs>
            <CardBackground title={"競技名のリーグ"}>
                <LeagueDnd/>
            </CardBackground>
        </Stack>
    );
}
