import {Breadcrumbs, Grid, Stack, Typography} from "@mui/material"
import CardBackground from "@/components/layout/cardBackground"
import SportsList from "@/components/sports/sportsList"
import {sportFactory} from "@/src/models/SportModel"
import InProgressMatchList from "@/components/match/inProgressMatchList"
import {informationFactory} from "@/src/models/InformationModel";
import InformationList from "@/components/information/informationList";

export default async function Home() {
    const sports = await sportFactory().index()
    const informationList = await informationFactory().index()

    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Typography color="text.primary">管理者のダッシュボード</Typography>
            </Breadcrumbs>
            <CardBackground title={"配信中のお知らせ"} button={"お知らせを作成・編集"} link={"/information"}>
                <InformationList informationList={informationList}/>
            </CardBackground>
            <CardBackground title={"競技から選ぶ"} button={"競技を作成・編集する"} link={"/sports"}>
                <Grid container spacing={1}>
                    <SportsList sports={sports}/>
                </Grid>
            </CardBackground>
            <CardBackground title={"進行中の全ての試合から選ぶ"}>
                <InProgressMatchList/>
            </CardBackground>
        </Stack>
    )
}
