import {Alert, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {roleFactory} from "@/src/models/RoleModel";
import {permissionFactory} from "@/src/models/PermissionModel";
import RoleEditor from "@/components/roles/roleEditor";
import NextLink from "next/link";

export default async function RoleDetailPage({params}: { params: { id: string } }) {
    const roleId = parseInt(params.id, 10)
    const role = await roleFactory().show(roleId)
    const permissions = await permissionFactory().index()

    if (isNaN(roleId) || !role) {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>ロールが存在しません。</Typography>
                </Alert>

                <Button
                    variant="contained"
                    href="/roles/"
                    component={NextLink}
                >
                    ロール管理に戻る
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
                    href="/roles/"
                    component={NextLink}
                >
                    ロール管理
                </Link>
                <Typography color="text.primary">{role.name}</Typography>
            </Breadcrumbs>

            <CardBackground title={`ロール情報`}>
                <RoleEditor role={role} permissions={permissions}/>
            </CardBackground>
        </Stack>
    )
}
