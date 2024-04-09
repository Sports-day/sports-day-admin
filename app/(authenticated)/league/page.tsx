import {Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import CardLarge from "@/components/layout/cardLarge";

export default function LeaguePage() {
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Typography pl={2} fontWeight={"600"}>リーグを編成・管理する</Typography>
            <CardBackground title={"配信中のお知らせ"} button={"お知らせを作成・編集"}>
                <CardLarge>
                    現在集計中です。教室で放送による結果発表をお待ちください。
                </CardLarge>
            </CardBackground>
        </Stack>
    );
}
