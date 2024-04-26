import CardBackground from "@/components/layout/cardBackground";
import {SportInfoField} from "@/components/sports/sportInfoField";
import {Accordion, AccordionSummary, AccordionDetails, Stack, Grid, Link, Typography, Breadcrumbs} from "@mui/material";
import {ButtonLarge} from "@/components/layout/buttonLarge";
import {HiChevronDown} from "react-icons/hi2";
import CardList from "@/components/layout/cardList";

export default function SportPage() {
    return(
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/sports">
                    競技管理
                </Link>
                <Typography color="text.primary">競技名</Typography>
            </Breadcrumbs>
            <CardBackground title={"競技名"}>
                <Accordion sx={{backgroundColor:"primary.main", color:"secondary.main", borderRadius:"10px"}}>
                    <AccordionSummary
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <Typography>詳細を見る・編集する</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SportInfoField/>
                    </AccordionDetails>
                </Accordion>
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