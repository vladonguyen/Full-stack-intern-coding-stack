import {json, useLoaderData} from "react-router-dom";

import Allnotes from "./Allnotes"
import "./home.css"

export default function Home() {

    const loaderData = useLoaderData();

    return (
        <>
            <div className="allnotes">
                <Allnotes />
            </div>
        </>
    )
}

export async function loader(){
    const response = await fetch("http://localhost:8080/notes");

    if (!response.ok) {
      throw json(
        { message: "Could not fetch events." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData.notes;
    }
}