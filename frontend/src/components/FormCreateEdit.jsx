import { redirect, json } from "react-router-dom"

import { Form } from "react-router-dom"

export default function FormCreateEdit() {

    return (

        <Form method="POST">
            <input name="title" placeholder="Title" />
            <input name="description" placeholder="Description" />
            <button>Submit</button>

        </Form>
    )
}

export async function action({ request }) {
    const method = "POST";


    const data = await request.formData();
    const resData = {
        title: data.get("title"),
        description: data.get("description"),
    };

    let url = "http://localhost:8080/api/notes";


    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(resData),
    });


    if (response.status === 442) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: "Couldn't save note." }, { status: 500 });
    }

    return redirect("/")
}