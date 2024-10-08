import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import NextLink from "next/link";
import InformationCreator from "@/components/information/informationCreator";

export default function InformationCreatePage() {

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
                    href={"/tags/"}
                    component={NextLink}
                >
                    お知らせ管理
                </Link>
                <Typography color="text.primary">お知らせ作成</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"お知らせ作成"}
            >
                <InformationCreator />
            </CardBackground>
        </Stack>
    );
}
