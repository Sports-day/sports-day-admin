import {Stack, Breadcrumbs, Button, Link, Container, Box, Typography, Card} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";

export default function Home() {
    return (
        <Stack spacing={1} mx={2} my={3}>
            <Typography pl={2} fontWeight={"600"}>何を管理しますか？</Typography>
            <CardBackground title={"競技を選ぶ"} button={"競技を作成・編集する"} link={"users"}>

            </CardBackground>
        </Stack>
    );
}
