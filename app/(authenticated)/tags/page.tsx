import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {tagFactory} from "@/src/models/TagModel";
import TagsAgGrid from "@/components/tags/tagsAgGrid";
import NextLink from "next/link";

export default async function TagsPage() {
    const tags = await tagFactory().index()

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    component={NextLink}
                >
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">タグ管理</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"すべてのタグ"}
                button={"作成"}
                link={"/tags/create"}
            >
                <TagsAgGrid tags={tags}/>
            </CardBackground>
        </Stack>
    );
}
