import {Alert, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import NextLink from "next/link";
import {informationFactory} from "@/src/models/InformationModel";
import InformationEditor from "@/components/information/informationEditor";

export default async function InformationDetailPage({params}: { params: { id: string } }) {
    const informationId = parseInt(params.id, 10)
    const information = await informationFactory().show(informationId)

    if (isNaN(informationId) || !information) {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>お知らせが存在しません。</Typography>
                </Alert>

                <Button
                    variant="contained"
                    href="/information/"
                    component={NextLink}
                >
                    お知らせ管理に戻る
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
                    href={"/information/"}
                    component={NextLink}
                >
                    お知らせ管理
                </Link>
                <Typography color="text.primary">{information.name}</Typography>
            </Breadcrumbs>

            <CardBackground title={`お知らせ`}>
                <InformationEditor information={information} />
            </CardBackground>
        </Stack>
    )
}
