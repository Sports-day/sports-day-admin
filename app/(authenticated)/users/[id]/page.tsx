import {Alert, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {userFactory} from "@/src/models/UserModel";
import React from "react";
import UserEditor from "@/components/users/userEditor";
import {roleFactory} from "@/src/models/RoleModel";
import {classFactory} from "@/src/models/ClassModel";
import NextLink from "next/link";

export default async function UserDetailPage({params}: { params: { id: string } }) {
    const userId = parseInt(params.id, 10)
    const user = await userFactory().show(userId)
    const userRole = await userFactory().getRole(userId)
    const classes = await classFactory().index()
    const roles = await roleFactory().index()

    if (isNaN(userId) || !user) {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>ユーザーが存在しません。</Typography>
                </Alert>

                <Button
                    variant="contained"
                    href="/users/"
                    component={NextLink}
                >
                    ユーザー管理に戻る
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
                    href="/users/"
                    component={NextLink}
                >
                    ユーザー管理
                </Link>
                <Typography color="text.primary">{user.name}</Typography>
            </Breadcrumbs>

            <CardBackground title={`${user.name} さんの情報`}>
                <UserEditor
                    user={user}
                    userRole={userRole}
                    classes={classes}
                    roles={roles}
                />
            </CardBackground>
        </Stack>
    )
}
