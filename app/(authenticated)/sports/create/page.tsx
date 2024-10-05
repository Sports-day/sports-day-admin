import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import SportCreator from "@/components/sports/sportCreator";
import NextLink from "next/link";

export default async function CreateSport() {
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
                    href="../../sports"
                    component={NextLink}
                >
                    競技管理
                </Link>
                <Typography color="text.primary">競技を新規作成</Typography>
            </Breadcrumbs>

            <CardBackground title={"競技を新規作成"} link={"/sports/create"}>
                <SportCreator/>
            </CardBackground>
        </Stack>
    );
}
