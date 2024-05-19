import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import TagCreator from "@/components/tags/tagCreator";

export default function TagCreatePage() {

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href={"/tags/"}>
                    タグ管理
                </Link>
                <Typography color="text.primary">タグ作成</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"タグ作成"}
            >
                <TagCreator />
            </CardBackground>
        </Stack>
    );
}
