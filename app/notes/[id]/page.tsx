import styles from "../Notes.module.css";
import { getNoteById } from "@/app/apis/notes";

export default async function NotePage({ params }: any) {
  const note = await getNoteById(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}
