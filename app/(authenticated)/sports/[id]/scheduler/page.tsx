import {Alert, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {sportFactory} from "@/src/models/SportModel";
import SportScheduler from "@/components/sports/scheduler/sportScheduler";

export default async function SchedulerPage({params}: { params: { id: string } }) {
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)

    if (isNaN(sportId) || !sport) {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>競技が存在しません。</Typography>
                </Alert>

                <Button variant="contained" href="/sports/">
                    競技管理に戻る
                </Button>
            </Stack>
        )
    }

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label={"breadcrumb"} sx={{pl: 2}}>
                <Link underline={"hover"} color={"inherit"} href={"/"}>
                    管理者のダッシュボード
                </Link>
                <Link underline={"hover"} color={"inherit"} href={"/sports/"}>
                    競技管理
                </Link>
                <Link underline={"hover"} color={"inherit"} href={`/sports/${sportId}`}>
                    {sport.name}
                </Link>
                <Typography color={"text.primary"}>時間調整</Typography>
            </Breadcrumbs>

            <CardBackground>
                <SportScheduler sport={sport}/>
            </CardBackground>
        </Stack>
    )
}
