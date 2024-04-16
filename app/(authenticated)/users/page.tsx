import {Stack, Breadcrumbs, Button, Link, Typography, Card} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import UsersTable from "@/components/users/usersTable";

export default function UsersPage() {
    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">ユーザー管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"すべてのユーザー"} button={"CSVで一括作成"}>
                <UsersTable/>
            </CardBackground>
        </Stack>
    );
}
