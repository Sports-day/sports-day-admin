import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {roleFactory} from "@/src/models/RoleModel";
import RolesAgGrid from "@/components/roles/rolesAgGrid";

export default async function UsersPage() {
    const roles = await roleFactory().index()

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">ロール管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"すべてのロール"}>
                <RolesAgGrid roles={roles}/>
            </CardBackground>
        </Stack>
    );
}
