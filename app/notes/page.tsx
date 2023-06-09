import Link from "next/link";
import { Note, getNotes } from "../apis/notes";
import CreateNote from "./CreateNote";

export default async function NotePage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

const Note = ({ note }: { note: Note }) => {
  const { id, title, content, created } = note;

  return (
    <Link href={`/notes/${id}`}>
      <div>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
};
