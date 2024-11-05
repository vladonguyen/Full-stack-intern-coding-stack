
import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import FormCreateEdit from "./FormCreateEdit"

export default function Edit() {
    const noteDetail = useLoaderData()


    return (
        <>
        <h1>Edit note</h1>
        <div className="form">
            <FormCreateEdit title={noteDetail.title} description={noteDetail.description} />
        </div>
        </>
    )
}


