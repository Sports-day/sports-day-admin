import {Grid, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {ButtonLarge} from "@/components/layout/buttonLarge";
import CardLarge from "@/components/layout/cardLarge";
import CardList from "@/components/layout/cardList";

export default function Home() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Typography pl={2} fontWeight={"600"}>何を管理しますか？</Typography>
            <CardBackground title={"競技を選ぶ"} button={"競技を作成・編集する"} link={"users"}>
                <Grid container spacing={1}>
                    <ButtonLarge img={"a"}>
                        バスケットボール
                    </ButtonLarge>
                    <ButtonLarge img={"a"}>
                        ドッジビー
                    </ButtonLarge>
                    <ButtonLarge img={"a"}>
                        フットサル
                    </ButtonLarge>
                    <ButtonLarge img={"a"}>
                        ビーチボール
                    </ButtonLarge>
                    <ButtonLarge img={"a"}>
                        ペタンク
                    </ButtonLarge>
                    <ButtonLarge img={"a"}>
                        ストラックアウト
                    </ButtonLarge>
                </Grid>
            </CardBackground>
            <CardBackground title={"配信中のお知らせ"} button={"お知らせを作成・編集"}>
                <CardLarge>
                    あ
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
