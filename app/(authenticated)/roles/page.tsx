import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import {roleFactory} from "@/src/models/RoleModel";
import RolesAgGrid from "@/components/roles/rolesAgGrid";
import CardBackground from "@/components/layout/cardBackground";
import NextLink from "next/link";

export default async function RolesPage() {
    const roles = await roleFactory().index()

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
                <Typography color="text.primary">ロール管理</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"すべてのロール"}
                button={"作成"}
                link={"/roles/create"}
            >
                <RolesAgGrid roles={roles}/>
            </CardBackground>
        </Stack>
    );
}
