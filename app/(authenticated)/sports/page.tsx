import {Breadcrumbs, Grid, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import CardLarge from "@/components/layout/cardLarge";
import {ButtonLarge} from "@/components/layout/buttonLarge";
import {SportInfoField} from "@/components/sports/sportInfoField";

export default function SportsPage() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">競技管理</Typography>
            </Breadcrumbs>
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
