'use client'
import {
    TextField,
    ToggleButtonGroup,
    ToggleButton,
    Avatar, Button,
    Stack, Grid, Paper,
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
    Theme
} from "@mui/material";
import React, {ReactNode} from "react";

type SportInfoFieldProps = {
    img?: string;
    children?: ReactNode;
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


export const SportInfoField: React.FC<SportInfoFieldProps> = ({img, children})=> {
    //天候
    const [weather, setWeather] = React.useState('web');
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

    return(
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card sx={{backgroundColor:"e1e4f6", color:"primary"}} variant={"outlined"}>
                <Stack mx={2} my={2} spacing={2} direction={"column"}>
                    <Typography pl={1} fontWeight={"500"}>競技の情報</Typography>

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
                    <TextField
                        color={"info"}
                        hiddenLabel={true}
                        id="outlined-size-small"
                        placeholder="競技名"
                        size="small"
                        helperText="例: バスケットボール晴天時"
                    />

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
                </Stack>
            </Card>
        </Grid>
    )
}