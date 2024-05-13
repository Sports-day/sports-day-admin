import {Breadcrumbs, Grid, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import CardLarge from "@/components/layout/cardLarge";
import CardList from "@/components/layout/cardList";
import SportsList from "@/components/sports/sportsList";
import {sportFactory} from "@/src/models/SportModel";

export default async function Home() {
    const sports = await sportFactory().index()
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Typography color="text.primary">管理者のダッシュボード</Typography>
            </Breadcrumbs>
            <CardBackground title={"競技を選ぶ"} button={"競技を作成・編集する"} link={"/sports"}>
                <Grid container spacing={1}>
                    <SportsList sports={sports}/>
                </Grid>
            </CardBackground>
            <CardBackground title={"配信中のお知らせ"} button={"お知らせを作成・編集"}>
                <CardLarge>
                    この機能は開発中です
                </CardLarge>
            </CardBackground>
            <CardBackground title={"現在進行中の試合"}>
                <Grid container spacing={1}>
                    <CardList
                        sport={"バスケットボール"}
                        league={"Aリーグ"}
                        judge={"M5-a"}
                        left={"M1-a"}
                        right={"エコ1"}
                        time={"10:00"}
                        location={"第二体育館"}
                    >
                    </CardList>
                    <CardList
                        sport={"バスケットボール"}
                        league={"Aリーグ"}
                        judge={"M5-a"}
                        left={"M1-a"}
                        right={"エコ1"}
                        time={"10:00"}
                        location={"第二体育館"}
                    >
                    </CardList>
                    <CardList
                        sport={"バスケットボール"}
                        league={"Aリーグ"}
                        judge={"M5-a"}
                        left={"M1-a"}
                        right={"エコ1"}
                        time={"10:00"}
                        location={"第二体育館"}
                    >
                    </CardList>
                    <CardList
                        sport={"バスケットボール"}
                        league={"Aリーグ"}
                        judge={"M5-a"}
                        left={"M1-a"}
                        right={"エコ1"}
                        time={"10:00"}
                        location={"第二体育館"}
                    >
                    </CardList>
                    <CardList
                        sport={"バスケットボール"}
                        league={"Aリーグ"}
                        judge={"M5-a"}
                        left={"M2-a"}
                        right={"エコ1"}
                        time={"10:00"}
                        location={"第二体育館"}
                    >
                    </CardList>
                    <CardList
                        sport={"バスケットボール"}
                        league={"Aリーグ"}
                        judge={"M5-a"}
                        left={"M1-a"}
                        right={"エコ1"}
                        time={"10:00"}
                        location={"第二体育館"}
                    >
                    </CardList>
                </Grid>
            </CardBackground>
        </Stack>
    );
}
