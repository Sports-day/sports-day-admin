import {Grid, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import CardLarge from "@/components/layout/cardLarge";
import {ButtonLarge} from "@/components/layout/buttonLarge";
import {SportInfoField} from "@/components/sports/sportInfoField";

export default function SportsPage() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Typography pl={2} fontWeight={"600"}>競技を作成・編集する</Typography>
            <CardBackground title={"競技一覧"}>
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
            <CardBackground title={"競技を管理"} button={"競技を追加"}>
                <Grid container spacing={1}>
                    <SportInfoField/>
                    <SportInfoField/>
                    <SportInfoField/>
                </Grid>
            </CardBackground>
        </Stack>
    );
}
