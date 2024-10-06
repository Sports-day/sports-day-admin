import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {classFactory} from "@/src/models/ClassModel";
import UserCreatingAutomation from "@/components/users/csv/userCreatingAutomation";
import NextLink from "next/link";

export default async function UsersCsv() {
    const classes = await classFactory().index()

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
                    href="/users/"
                    component={NextLink}
                >
                    ユーザー管理
                </Link>
                <Typography color="text.primary">CSV</Typography>
            </Breadcrumbs>

            <CardBackground title={"ユーザーのCSV一括作成"} >
                <UserCreatingAutomation classes={classes} />
            </CardBackground>
        </Stack>
    );
}
