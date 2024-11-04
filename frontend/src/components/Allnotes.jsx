export default function Allnotes({ notes }) {
    console.log(notes);

    return (
        <>
            {notes.map((note) => (
                <div className="noteItem" key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.description}</p>
                </div>
            ))}



        </>

    )
}