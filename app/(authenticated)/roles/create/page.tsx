import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import RoleCreator from "@/components/roles/roleCreator";
import NextLink from "next/link";

export default function RoleCreatePage() {


    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link
                    underline="hover"
                    color="inherit"
                    component={NextLink}
                    href="/"
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
                <Typography color="text.primary">ロール作成</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"ロール作成"}
            >
                <RoleCreator />
            </CardBackground>
        </Stack>
    );
}
