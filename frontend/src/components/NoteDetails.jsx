import { Link, useLoaderData } from "react-router-dom";

export default function NoteDetails(){

const noteData = useLoaderData();

    return(
        <>
        <h1>{noteData.title}</h1>
        <p>{noteData.description}</p>
        <p><Link to="edit">Edit</Link></p>
        <p><Link to="delete">Delete</Link></p>
        </>
    )
}

export async function loader({params}){
const paramId = params.id;

const response = await fetch("http://localhost:8080/api/notes/" + params.id, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
});

return await response.json();
}