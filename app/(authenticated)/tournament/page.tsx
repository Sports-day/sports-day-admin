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
                <Typography color="text.primary">トーナメント管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"どの競技のトーナメントを管理しますか？"}>
                <Grid container spacing={1}>
                    <ButtonLarge img={"a"}>
                        フットサル
                    </ButtonLarge>
                </Grid>
            </CardBackground>
        </Stack>
    );
}
