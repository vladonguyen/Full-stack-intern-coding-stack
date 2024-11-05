import { Form, Link, redirect, useLoaderData } from "react-router-dom";

export default function NoteDetails() {

    const noteData = useLoaderData();

    return (
        <>
            <h1>{noteData.title}</h1>
            <p>{noteData.description}</p>
            <p><Link to="edit">Edit</Link></p>
            <Form method="delete">
                <button>Delete</button>
            </Form>
        </>
    )
}

export async function loader({ params }) {
    const paramId = params.id;

    const response = await fetch("http://localhost:8080/api/notes/" + params.id, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    return await response.json();
}

export async function  action({params}){
    await fetch("http://localhost:8080/api/notes/" + params.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return redirect('/');

}