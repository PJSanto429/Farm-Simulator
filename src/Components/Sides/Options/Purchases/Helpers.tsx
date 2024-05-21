import { Column } from "react-table"
import { GameType } from "../../../../classes/Game"
import './index.css'
import { AnimalType } from "../../../../classes/Animals/Animal"
import { Table } from "../../../Tools/Table"
import { ResourceType } from "../../../../classes/Resources/Resource"

export const Helper = (props: {
    game: GameType
}) => {
    const {
        game
    } = props

    const animalColumns: Column<AnimalType>[] = [
        {
            Header: "Name",
            accessor: "name",
            Cell: ({ row }) => (
                <>{row.original.name}</>
            )
        },
        {
            Header: "Price",
            accessor: "price",
            Cell: ({ row }) => (
                <>${row.original.price}</>
            )
        },
        {
            Header: "Food",
            accessor: 'food',
            Cell: ({ row }) => (
                <>{row.original.foodPerDay} {row.original.food}</>
            )
        },
        {
            Header: "Output",
            accessor: "output",
            Cell: ({ row }) => (
                <>{row.original.outputPerDay} {row.original.output}</>
            )
        }
    ]

    const resourceColumns: Column<ResourceType>[] = [
        {
            Header: "Name",
            accessor: "name",
            Cell: ({ row }) => (
                <>{row.original.name}</>
            )
        },
        {
            Header: "Price",
            accessor: "price",
            Cell: ({ row }) => (
                <>${row.original.price}</>
            )
        },
    ]

    return (
        <>
            <span className="infoText">
                Price for each individual resource/animal
            </span>
            <div className="helperMain">

                <div className="oneTable">
                    <Table columns={animalColumns} data={game.farm.animals} />
                </div>
                <div className="oneTable">
                    <Table columns={resourceColumns} data={game.farm.resources} />
                </div>
            </div>
        </>
    )
}
