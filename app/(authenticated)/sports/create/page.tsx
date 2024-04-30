import {Stack, Breadcrumbs, Link, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {SportInfoField} from "@/components/sports/sportInfoField";
import {sportFactory} from "@/src/models/SportModel";

export default async function CreateSport() {
    const sports = await sportFactory().index()
    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/sports" >
                    競技管理
                </Link>
                <Typography color="text.primary">競技を新規作成</Typography>
            </Breadcrumbs>

            <CardBackground title={"競技を新規作成"} link={"/sports/create"}>
                <SportInfoField sports={sports} create={true}/>
            </CardBackground>
        </Stack>
    );
}
