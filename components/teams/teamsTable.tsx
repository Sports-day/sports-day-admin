'use client'
import {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry, RowClickedEvent} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {Team} from "@/src/models/TeamModel";
import {Class} from '@/src/models/ClassModel';
import {TeamTag} from "@/src/models/TeamTagModel";
import {useRouter} from "next/navigation";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type TeamsAgGridProps = {
    classes: Class[]
    teams: Team[]
    teamTags: TeamTag[]
}

// Row Data Interface
type IRow = {
    teamId: number;
    teamName: string;
    className: string;
    teamTagName: string;
}


// Create new GridExample component
const TeamsAgGrid = (props: TeamsAgGridProps) => {
    const height = 'calc(100vh - 230px)';
    const router = useRouter()
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs,] = useState<ColDef<IRow>[]>([
        {field: "teamId", headerName: "チームID"},
        {field: "teamName", headerName: "チーム名"},
        {field: "className", headerName: "クラス"},
        {field: "teamTagName", headerName: "タグ"},
    ]);

    useEffect(() => {
            const rows = props.teams.map((team): IRow => {
                const className = props.classes.find((c) => c.id === team.classId)?.name
                const teamTagName = props.teamTags.find((t) => t.id === team.teamTagId)?.name

                return {
                    teamId: team.id,
                    teamName: team.name,
                    className: className ?? "不明",
                    teamTagName: teamTagName ?? "不明",
                }
            })

            //  set row data
            setRowData(rows)
        },
        [props.classes, props.teams, props.teamTags]
    )

    const handleRowClick = (e: RowClickedEvent<IRow>) => {
        const data = e.data

        //  ignore undefined
        if (!data) return

        //  redirect
        router.push(`/teams/${data.teamId}`)
    }


    // Container: Defines the grid's theme & dimensions.
    return (
        <div className={"ag-theme-quartz"} style={{width: '100%', height: height, borderRadius: "10px"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onRowClicked={handleRowClick}
            />
        </div>
    );
}

export default TeamsAgGrid;
