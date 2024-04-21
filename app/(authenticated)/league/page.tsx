import {Stack, Grid, Typography, Link, Breadcrumbs} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import CardLarge from "@/components/layout/cardLarge";
import {ButtonLarge} from "@/components/layout/buttonLarge";

export default function LeaguePage() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">リーグ管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"どの競技のリーグを管理しますか？"}>
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
        </Stack>
    );
}
