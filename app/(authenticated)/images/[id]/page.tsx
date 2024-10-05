import {Alert, Breadcrumbs, Button, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {imageFactory} from "@/src/models/ImageModel";
import ImageEditor from "@/components/images/imageEditor";
import NextLink from "next/link";

export default async function ImageEditPage({params}: { params: { id: string } }) {
    const imageId = parseInt(params.id, 10)
    const image = await imageFactory().show(imageId)

    if (isNaN(imageId) || !image) {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>画像が削除されました。</Typography>
                </Alert>

                <Button
                    variant="contained"
                    href="/images/"
                    component={NextLink}
                >
                    画像管理に戻る
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
                    href={"/images/"}
                    component={NextLink}
                >
                    画像管理
                </Link>
                <Typography color="text.primary">{image.id}</Typography>
            </Breadcrumbs>

            <CardBackground title={`画像の情報`}>
                <ImageEditor image={image}/>
            </CardBackground>
        </Stack>
    )
}
