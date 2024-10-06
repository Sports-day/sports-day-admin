import {Alert, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {tagFactory} from "@/src/models/TagModel";
import TagEditor from "@/components/tags/tagEditor";
import NextLink from "next/link";

export default async function RoleDetailPage({params}: { params: { id: string } }) {
    const tagId = parseInt(params.id, 10)
    const tag = await tagFactory().show(tagId)

    if (isNaN(tagId) || !tag) {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>タグが存在しません。</Typography>
                </Alert>

                <Button
                    variant="contained"
                    href="/tags/"
                    component={NextLink}
                >
                    タグ管理に戻る
                </Button>
            </Stack>
        )
    }

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
                <Link
                    underline="hover"
                    color="inherit"
                    href={"/tags/"}
                    component={NextLink}
                >
                    タグ管理
                </Link>
                <Typography color="text.primary">{tag.name}</Typography>
            </Breadcrumbs>

            <CardBackground title={`タグ情報`}>
                <TagEditor tag={tag} />
            </CardBackground>
        </Stack>
    )
}
