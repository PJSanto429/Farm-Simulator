import { useTable, Column } from "react-table"
import "./index.css"

interface TableProps<T extends object> {
    columns: Column<T>[]
    data: T[]
    align?: "center" | "left" // | "right"
}

export const Table = <T extends object>({
    columns,
    data,
    align
}: TableProps<T>) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    })

    return (
        <div className={`tableMain ${!!align ? align : "center"}`}>
            <table {...getTableProps()}>
                <thead className="tableHeader">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

interface Test {
    name: string
    age: number
    country: string

    out?: {
        thing: number
    }
}

export const TableTest = () => {
    const data: Test[] = [
        {
            name: "peyton",
            age: 19,
            country: "USA",
            out: {
                thing: 12
            }
        },
        {
            name: "mike",
            age: 48,
            country: "italy"
        },
        {
            name: "sarah",
            age: 45,
            country: "china"
        },
        {
            name: "caroline",
            age: 16,
            country: "russia"
        },
        {
            name: "olivia",
            age: 21,
            country: "germany"
        },
    ]

    const columns: Column<Test>[] = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Age",
            accessor: "age"
        },
        {
            Header: "Country",
            accessor: "country"
        },
        {
            Header: "out",
            accessor: "out",
            Cell: ({ row }) => {
                return (
                    <>
                        {row.original.out?.thing || "XX"}
                    </>
                )
            }
        }
    ]

    return (
        <div>
            <h1>Table Example</h1>
            <Table columns={columns} data={data} />
        </div>
    )

}
