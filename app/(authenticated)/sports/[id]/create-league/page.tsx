import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import LeagueDnd from "@/components/league/create/leagueDnd";
import {sportFactory} from "@/src/models/SportModel";

export default async function LeaguePage({params}: { params: { id: string } }) {
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const sportLink = `/sports/${sportId}`
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/public">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href={"/sports"}>
                    競技管理
                </Link>
                <Link underline="hover" color="inherit" href={sportLink}>
                    {sport.name}
                </Link>
                <Typography color="text.primary">リーグを作成・編集</Typography>
            </Breadcrumbs>
            <CardBackground title={`${sport.name}のリーグ`}>
                <LeagueDnd sport={sport} sportId={sportId}/>
            </CardBackground>
        </Stack>
    );
}
