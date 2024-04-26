import {ICellRendererParams} from "ag-grid-community";
import Link from "next/link";

export default function UserLinkRenderer(param: ICellRendererParams) {
    return (
        <Link
            href={`/users/${param.value}`}
            style={{
                width: '100%',
            }}
        >
            {param.value}
        </Link>
    )
}
