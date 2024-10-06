import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import ImageCreator from "@/components/images/imageCreator";
import NextLink from "next/link";

export default function ImageCreatePage() {

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
                    href={"/images/"}
                    component={NextLink}
                >
                    画像管理
                </Link>
                <Typography color="text.primary">画像作成</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"画像作成"}
            >
                <ImageCreator/>
            </CardBackground>
        </Stack>
    );
}
