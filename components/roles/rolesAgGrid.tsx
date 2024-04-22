'use client'
import {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry, RowClickedEvent} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {useRouter} from "next/navigation";
import {Role} from "@/src/models/RoleModel";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type RolesAgGridProps = {
    roles: Role[]
}

// Row Data Interface
type IRow = {
    roleId: number,
    name: string,
    description: string,
    default: boolean,
}

// Create new GridExample component
export default function RolesAgGrid(props: RolesAgGridProps) {
    const height = 'calc(100vh - 230px)';
    const router = useRouter()
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([])
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef<IRow>[]>([
        {field: "roleId", headerName: "ロールID"},
        {field: "name", headerName: "名前"},
        {field: "description", headerName: "備考"},
        {field: "default", headerName: "初期ロール"},
    ]);

    useEffect(() => {
        const rows = props.roles.map((role): IRow => {
            return {
                roleId: role.id,
                name: role.name,
                description: role.description,
                default: role.default
            }
        })

        //  set row data
        setRowData(rows)
    }, [props.roles])

    const handleRowClick = (e: RowClickedEvent<IRow>) => {
        const data = e.data

        //  ignore undefined
        if (!data) return

        //  redirect
        router.push(`/roles/${data.roleId}`)
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