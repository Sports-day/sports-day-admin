import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import UsersAgGrid from "@/components/users/usersAgGrid";
import {userFactory} from "@/src/models/UserModel";
import {classFactory} from "@/src/models/ClassModel";
import {teamFactory} from "@/src/models/TeamModel";
import NextLink from "next/link";

export default async function UsersPage() {
    const users = await userFactory().index()
    const classes = await classFactory().index()
    const teams = await teamFactory().index()

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
                <Typography color="text.primary">ユーザー管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"すべてのユーザー"} button={"CSVで一括作成"} link={"/users/csv"}>
                <UsersAgGrid
                    users={users}
                    classes={classes}
                    teams={teams}
                />
            </CardBackground>
        </Stack>
    );
}
