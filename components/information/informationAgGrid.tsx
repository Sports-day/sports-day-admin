'use client'
import {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry, RowClickedEvent} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {useRouter} from "next/navigation";
import {Information} from "@/src/models/InformationModel";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type InformationAgGridProps = {
    informationList: Information[]
}

// Row Data Interface
type IRow = {
    id: number,
    name: string,
    content: string,
}

// Create new GridExample component
export default function InformationAgGrid(props: InformationAgGridProps) {
    const height = 'calc(100vh - 230px)';
    const router = useRouter()
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([])
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef<IRow>[]>([
        {field: "id", headerName: "ID"},
        {field: "name", headerName: "名前"},
        {field: "content", headerName: "内容"},
    ]);

    useEffect(() => {
        const informationList = props.informationList.map((information): IRow => {
            return {
                id: information.id,
                name: information.name,
                content: information.content
            }
        })

        //  set row data
        setRowData(informationList)
    }, [props.informationList])

    const handleRowClick = (e: RowClickedEvent<IRow>) => {
        const data = e.data

        //  ignore undefined
        if (!data) return

        //  redirect
        router.push(`/information/${data.id}`)
    }

    // Container: Defines the grid's theme & dimensions.
    return (
        <div
            className={"ag-theme-quartz"}
            style={{
                width: '100%',
                height: height,
                borderRadius: "10px"
            }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onRowClicked={handleRowClick}
            />
        </div>
    );
}