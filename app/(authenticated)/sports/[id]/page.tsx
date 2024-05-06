import CardBackground from "@/components/layout/cardBackground";
import {Accordion, AccordionSummary, AccordionDetails, Stack, Grid, Link, Typography, Breadcrumbs} from "@mui/material";
import {ButtonLarge} from "@/components/layout/buttonLarge";
import CardList from "@/components/layout/cardList";
import {sportFactory} from "@/src/models/SportModel";
import SportEditor from "@/components/sports/sportEditor";

export default async function SportPage({params}: { params: { id: string } }) {
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    return(
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/sports">
                    競技管理
                </Link>
                <Typography color="text.primary">{sport.name}</Typography>
            </Breadcrumbs>
            <CardBackground title={`${sport.name}`}>
                <SportEditor sport={sport}/>
            </CardBackground>
            <CardBackground title={"リーグ一覧"} button={"編集"}>
                <Grid container spacing={1}>
                    <ButtonLarge>Aリーグ</ButtonLarge>
                    <ButtonLarge>Bリーグ</ButtonLarge>
                </Grid>
            </CardBackground>
            <CardBackground title={"競技名の現在進行中の試合"}>
                <Grid container>
                    <CardList sport={"a"} league={"a"} judge={"a"} left={"a"} right={"a"} time={"11:11"} location={"a"}/>
                </Grid>
            </CardBackground>
        </Stack>
    )
}