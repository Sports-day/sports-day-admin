import {Stack, Breadcrumbs, Link, Typography, Avatar, Button} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {tagFactory} from "@/src/models/TagModel";
import {imageFactory} from "@/src/models/ImageModel";
import React from "react";

export default async function TagsPage() {
    const tags = await tagFactory().index()
    const images = await imageFactory().index()

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">画像管理</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"すべてのタグ"}
                button={"作成"}
                link={"/images/create"}
            >
                <Stack spacing={1}>
                    {images?.map((image) => (
                        <Button variant={"contained"} fullWidth href={`/images/${image.id}`}>
                            <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{width:"100%"}}>
                                <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}/images/${image.id}/file`}/>
                                <Typography>
                                    {image.id}
                                </Typography>
                            </Stack>
                        </Button>
                    ))}
                </Stack>
            </CardBackground>
        </Stack>
    );
}
