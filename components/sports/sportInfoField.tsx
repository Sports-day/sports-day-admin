'use client'
import {
    TextField,
    ToggleButtonGroup,
    ToggleButton,
    Stack, Grid,
    Card, Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Box,
    OutlinedInput,
    Chip,
    useTheme,
    Theme, Avatar, Button
} from "@mui/material";
import React, {ReactNode} from "react";
import { HiCheck } from "react-icons/hi2"
import {Sport, sportFactory} from "@/src/models/SportModel";

type SportInfoFieldProps = {
    img?: string;
    children?: ReactNode;
    create: boolean;
    sports: Sport[];
}

//タグ
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const tags = [
    'タグ１',
    'タグ２',
];

function getStyles(name: string, tagName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            tagName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export function SportInfoField(props: SportInfoFieldProps) {
    const [sportName, setSportName] = React.useState('')
    //天候
    const [weather, setWeather] = React.useState('');
    const handleWeatherChange = (
        event: React.MouseEvent<HTMLElement>,
        newWeather: string,
    ) => {
        setWeather(newWeather);
    };

    //試合形式
    const [sporttype, setSportType] = React.useState('web');
    const handleSportTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newSportType: string,
    ) => {
        setSportType(newSportType);
    };

    //ルール
    const [rule, setRule] = React.useState('');
    const handleRuleChange = (event: SelectChangeEvent) => {
        setRule(event.target.value as string);
    };

    //タグ
    const theme = useTheme();
    const [tagName, setTag] = React.useState<string[]>([]);
    const handleTagChange = (event: SelectChangeEvent<typeof tagName>) => {
        const {
            target: { value },
        } = event;
        setTag(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const create = props.create;

    const handleSubmit = async() => {
        if (create) {
            await sportFactory().create({
                name: sportName,
                description: "test",
                iconId: 1,
                weight: 1,
                ruleId: 1,
                tagId: 1,
            })
        }
    }



    return(
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card sx={{backgroundColor:"e1e4f6", color:"primary"}} variant={"outlined"}>
                <Stack mx={2} my={2} spacing={2} direction={"column"}>
                    <Typography pl={1} fontWeight={"500"}>競技の情報</Typography>

                    <TextField
                        color={"info"}
                        hiddenLabel={true}
                        id="outlined-size-small"
                        placeholder="競技名"
                        size="small"
                        helperText="例: バスケットボール晴天時"
                        value={sportName}
                        onChange={(e) => setSportName(e.target.value)}
                    />

                    <Stack
                        direction={"row"}
                        width={"100%"}
                        justifyContent={"flex-start"}
                        alignItems="center"
                        sx={{border: "1px solid #5f6dc2", borderRadius:"15px", p:1}}
                    >
                        <Avatar sx={{mr:1.5, height: "1.5em", width: "1.5em"}}>

                        </Avatar>
                        <Button variant={"contained"} size={"small"}>アイコンをアップロード</Button>
                    </Stack>

                    <ToggleButtonGroup
                        size={"small"}
                        value={weather}
                        exclusive
                        onChange={handleWeatherChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="リーグ形式">晴天時</ToggleButton>
                        <ToggleButton value="トーナメント形式">雨天時</ToggleButton>
                    </ToggleButtonGroup>

                    <ToggleButtonGroup
                        size={"small"}
                        value={sporttype}
                        exclusive
                        onChange={handleSportTypeChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="リーグ形式">リーグ</ToggleButton>
                        <ToggleButton value="トーナメント形式">トーナメント</ToggleButton>
                    </ToggleButtonGroup>

                    <FormControl sx={{ m: 1, width: "100%" }} size="small">
                        <InputLabel id="taglabel">タグ</InputLabel>
                        <Select
                            labelId="taglabel"
                            id="tags"
                            multiple
                            value={tagName}
                            onChange={handleTagChange}
                            input={<OutlinedInput id="tags" label="Tag" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {tags.map((tag) => (
                                <MenuItem
                                    key={tag}
                                    value={tag}
                                    style={getStyles(tag, tagName, theme)}
                                >
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size={"small"}>
                        <InputLabel id="demo-simple-select-label">ルール</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rule}
                            label="ルール"
                            onChange={handleRuleChange}
                        >
                            <MenuItem value={10}>バスケットボール晴天時</MenuItem>
                            <MenuItem value={20}>ビーチボール雨天時</MenuItem>
                            <MenuItem value={30}>（ルール作成時に設定したタイトルを一覧表示する）</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack
                        direction={"row"}
                        my={0.5}
                        spacing={1}
                        width={"100%"}
                        justifyContent={"space-between"}
                        alignItems="center"
                    >
                        <Button
                            variant={"contained"}
                            color={"info"}
                            sx={{flexGrow: 3}}
                            startIcon={<HiCheck />}
                            onClick={handleSubmit}
                        >
                            保存
                        </Button>
                    </Stack>

                </Stack>
            </Card>
        </Grid>
    )
}