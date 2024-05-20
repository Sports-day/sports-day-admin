'use client'
import {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry, RowClickedEvent} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {useRouter} from "next/navigation";
import {Tag} from "@/src/models/TagModel";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type TagsAgGridProps = {
    tags: Tag[]
}

// Row Data Interface
type IRow = {
    tagId: number,
    name: string,
    enabled: boolean,
}

// Create new GridExample component
export default function TagsAgGrid(props: TagsAgGridProps) {
    const height = 'calc(100vh - 230px)';
    const router = useRouter()
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([])
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef<IRow>[]>([
        {field: "tagId", headerName: "タグID"},
        {field: "name", headerName: "名前"},
        {field: "enabled", headerName: "有効"},
    ]);

    useEffect(() => {
        const tags = props.tags.map((tag): IRow => {
            return {
                tagId: tag.id,
                name: tag.name,
                enabled: tag.enabled
            }
        })

        //  set row data
        setRowData(tags)
    }, [props.tags])

    const handleRowClick = (e: RowClickedEvent<IRow>) => {
        const data = e.data

        //  ignore undefined
        if (!data) return

        //  redirect
        router.push(`/tags/${data.tagId}`)
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