import {ICellRendererParams} from "ag-grid-community";
import Link from "next/link";

export default function TeamLinkRenderer(param: ICellRendererParams) {
    return (
        <Link
            href={`/teams/${param.value}`}
            style={{
                width: '100%',
            }}
        >
            {param.value}
        </Link>
    )
}
