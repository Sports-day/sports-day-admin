"use client"
import {Sport} from "@/src/models/SportModel";
import {Game, gameFactory} from "@/src/models/GameModel";
import {Match, matchFactory} from "@/src/models/MatchModel";
import {locationFactory, Location} from "@/src/models/LocationModel";
import {Stack, Typography} from "@mui/material";
import {useState} from "react";
import {useAsync} from "react-use";
import ActiveLocationSelector from "./activeLocationSelector";
import DndWrapper, {ContainerData, ItemData} from "@/components/dnd/dndWrapper";
import {UniqueIdentifier} from "@dnd-kit/core";

export type SportSchedulerProps = {
    sport: Sport
}

/**
 * Game match set
 */
type GameMatchSet = {
    game: Game
    matches: Match[]
}

/**
 * Fetch league list
 */
const fetchLeagueList = async (sportId: number) => {
    const games = await gameFactory().index()
    return games
        //  filter by sport
        .filter(game => game.sportId === sportId)
        //  filter by game type
        .filter(game => game.type === 'league')
}

/**
 * Fetch game match list
 */
const fetchGameMatchList = async (sportId: number): Promise<GameMatchSet[]> => {
    const leagueList = await fetchLeagueList(sportId)

    const matchMap: GameMatchSet[] = []
    for (const game of leagueList) {
        const matches = await gameFactory().getGameMatches(game.id)
        matchMap.push({
            game: game,
            matches: matches
        })
    }
    return matchMap
}

export default function SportScheduler(props: SportSchedulerProps) {
    /*
    必要な情報:
    - リーグ一覧 done
    - リーグに属する試合一覧 done
    - 場所一覧 done
    - 選択されている場所一覧 done
    - リーグに属する試合の場所一覧(すでに登録されている場合など？)
     */
    const [gameMatchList, setGameMatchList] = useState<GameMatchSet[]>([])
    const [locations, setLocations] = useState<Location[]>([])
    const [activeLocations, setActiveLocations] = useState<Location[]>([])
    //  dnd data
    const [dndData, setDndData] = useState<ContainerData<Location, Match>[]>([])

    useAsync(async () => {
        //  Fetch game match list
        const fetchedGameMatchList = await fetchGameMatchList(props.sport.id)
        setGameMatchList(fetchedGameMatchList)

        //  Fetch location list
        const fetchedLocations = await locationFactory().index()
        setLocations(fetchedLocations)

        //  debug
        const matches = await matchFactory().index()
        console.log(matches)
        //  ３要素ずつ分けた２次元配列を作成
        const chunkedMatches = matches.reduce((acc, cur, index) => {
            const chunkIndex = Math.floor(index / 3)
            if (!acc[chunkIndex]) {
                acc[chunkIndex] = []
            }
            acc[chunkIndex].push(cur)
            return acc
        }, [] as Match[][])

        const data: ContainerData<Location, Match>[] = []
        fetchedLocations.forEach((location, index) => {
            //  append
            data.push({
                containerId: `Location-${location.id}`,
                containerData: location,
                itemDataList: chunkedMatches[index].filter(match => match !== undefined).map((match): ItemData<Match> => {
                    return {
                        itemId: `Match-${match.id}` as UniqueIdentifier,
                        itemData: match
                    }
                })
            })
        })

        console.log("data is: ", data)

        //  set data
        setDndData(data)
    }, [props.sport.id])


    return (
        <Stack
            spacing={1}
        >
            {/* Active Location Selector */}
            <Typography>
                ＜ステップ１＞ この競技の開催場所を全て選択してください
            </Typography>
            <ActiveLocationSelector
                locations={locations}
                activeLocations={activeLocations}
                setActiveLocations={(locations) => {
                    setActiveLocations(locations)
                }}
            />

            {/*Editor*/}
            <Typography>
                ＜ステップ２＞ いい感じになんとかしてください
            </Typography>
            <DndWrapper<Location, Match>
                data={dndData}
                setData={setDndData}
                containerRenderer={(containerData, itemComponents) => (
                    <Stack
                        spacing={2}
                        sx={{
                            mx: 1,
                            backgroundColor: "#F3F3F3"
                        }}
                        direction={"column"}
                    >
                        <Typography>
                            {containerData.name}
                        </Typography>
                        {itemComponents}
                    </Stack>
                )}
                itemRenderer={(itemData) => (
                    <Typography
                        sx={{
                            backgroundColor: "#D3D3D3"
                        }}
                    >
                        id: {itemData.id}
                        result: {itemData.result}
                    </Typography>
                )}
            />
        </Stack>
    )

}
