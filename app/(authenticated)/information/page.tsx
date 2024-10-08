import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import NextLink from "next/link";
import {informationFactory} from "@/src/models/InformationModel";
import InformationAgGrid from "@/components/information/informationAgGrid";

export default async function TagsPage() {
    const informationList = await informationFactory().index()

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
                <Typography color="text.primary">お知らせ管理</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"お知らせ一覧"}
                button={"作成"}
                link={"/information/create"}
            >
                <InformationAgGrid informationList={informationList}/>
            </CardBackground>
        </Stack>
    );
}
