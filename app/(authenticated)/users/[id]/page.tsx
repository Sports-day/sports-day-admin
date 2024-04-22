import {Alert, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {userFactory} from "@/src/models/UserModel";

export default async function UserDetailPage({params}: { params: { id: string } }) {
    const userId = parseInt(params.id, 10)
    const user = await userFactory().show(userId)

    if (isNaN(userId) || !user) {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>ユーザーが存在しません。</Typography>
                </Alert>

                <Button variant="contained" href="/users/">
                    ユーザー管理に戻る
                </Button>
            </Stack>
        )
    }

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/users/">
                    ユーザー管理
                </Link>
                <Typography color="text.primary">{user.name}</Typography>
            </Breadcrumbs>

            <CardBackground title={`${user.name} さんの情報`}>
                <Typography>
                </Typography>
            </CardBackground>
        </Stack>
    )
}
