import { NavLink } from "react-router-dom"
export default function Navigation() {

    return (
        <>
            <ul>
                <li>
                    <NavLink to="/notes">All notes</NavLink></li>
                <li>  
                    <NavLink to="/create">Create new note</NavLink></li>
            </ul>


        </>
    )
}