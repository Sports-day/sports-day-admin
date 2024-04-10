import {Stack, Grid, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import CardLarge from "@/components/layout/cardLarge";
import {ButtonLarge} from "@/components/layout/buttonLarge";

export default function LeagueTestPage() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Typography pl={2} fontWeight={"600"}>リーグを編成・管理する</Typography>
            <CardBackground title={"どの競技のリーグを管理しますか？"}>

            </CardBackground>
        </Stack>
    );
}
