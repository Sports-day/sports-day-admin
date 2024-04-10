import {Stack, Grid, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import CardLarge from "@/components/layout/cardLarge";

export default function LeaguePage() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Typography pl={2} fontWeight={"600"}>リーグを編成・管理する</Typography>
            <CardBackground title={"配信中のお知らせ"} button={"お知らせを作成・編集"}>
                <Grid container>

                </Grid>
            </CardBackground>
        </Stack>
    );
}
